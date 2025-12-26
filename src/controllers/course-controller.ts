import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { isOwner } from "@/helpers/is-owner";
import { slugify } from "@/helpers/slugify";
import { Course, Lecture, Section } from "@prisma/client";


type NewCourse = Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'isPublished' | 'instructorId' | 'isFeatured' | 'curriculum' | 'authorId'>; 
type CourseDetailsUpdate = Partial<Omit<NewCourse, 'slug'>>;


type SectionInput = Pick<Section, 'title' | 'order'>;
type LectureInput = Pick<Lecture, 'title' | 'order' | 'videoUrl' | 'caption' | 'description' | 'isPreview' | 'duration'>;

type Curriculum = (SectionInput & { lectures: LectureInput[] })[];

export const createNewCourse = asyncHandler(async (req, res) => {
    const courseData = req.body as NewCourse;
    const slug = slugify(courseData.title);
    const existingCourseBySlug = await prisma.course.findUnique({ where: { slug } });
    if (existingCourseBySlug) throw new ApiError(400, 'Course with this title or slug already exists');


    const course = await prisma.course.create({
        data: { ...courseData, slug, instructorId: req.user.id, authorId: req.user.id },
        select: {
            id: true,
            slug: true,
        }
    })

    if (!course) throw new ApiError(500, 'Failed to create course');

   return apiResponse(res, 201, 'Course created successfully', course);
})

export const saveCurriculum = asyncHandler(async (req, res) => {
    const courseId = req.params.id!;

    const { curriculum }: { curriculum: Curriculum } = req.body;

    console.log({courseId, curriculum})

    await prisma.$transaction(async (prisma) => {   
        // Delete existing sections and lectures
        await prisma.lecture.deleteMany({
            where: {
                section: {
                    courseId: courseId
                }
            }
        });

        await prisma.section.deleteMany({
            where: { courseId: courseId }
        });

        // Create new sections and lectures
        for (const section of curriculum) {
            const { lectures, ...sectionData } = section;


            await prisma.section.create({
                data: {
                    courseId,
                    ...sectionData ,
                    lectures: {
                        createMany: { data: lectures }
                    }
                }
            })
        }

        await prisma.course.update({
            where: { id: courseId },
            data: { updatedAt: new Date(), isPublished: true }
        })
    })

    return apiResponse(res, 200, 'Curriculum saved successfully', null);
})

export const updateCourseDetails = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const updateData = req.body as CourseDetailsUpdate;
    const slug = updateData.title ? slugify(updateData.title) : undefined;

    const course = await prisma.course.update({
        where: { id: courseId },
        data: { ...updateData, slug },
        include: {
            subCategory: true,
            author: {
                select: {
                    id: true,
                    username: true,
                    image: true
                }
            }
        }
    });

    if (!course) throw new ApiError(404, 'Course not found');

    return apiResponse(res, 200, 'Course updated successfully', course);
})

export const deleteCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await prisma.course.findUnique({ where: { id: courseId, authorId: req.user.id }, select: { authorId: true } });
    
    if (!course) throw new ApiError(404, 'Course no longer exists');


    if(!isOwner(course?.authorId, req.user.id)) throw new ApiError(403, 'You are not authorized to delete this course');

    await prisma.course.update({ where: { id: courseId }, data: { isDeleted: true } });

    return apiResponse(res, 200, 'Course deleted successfully', null);
})

export const getCourseDetails = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const course = await prisma.course.findUnique({
        where: { id: courseId, isPublished: true, isDeleted: false },
        include: {
             subCategory: {
                select: {
                    id: true,
                    name: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            },
            author: {
                select: {
                    id: true,
                    username: true,
                    image: true,
                    fullName: true
                }
            },
            curriculum: {
                orderBy: { order: 'asc' },
                include: {
                    lectures: {
                        orderBy: { order: 'asc' },
                        select: {
                            id: true,
                            title: true,
                            order: true,
                            videoUrl: true,
                            description: true,
                            isPreview: true,
                            duration: true,
                            updatedAt: true
                        }
                    }
                }
            }
        }
    })

    if (!course) throw new ApiError(404, 'Course not found');

    return apiResponse(res, 200, 'Course details fetched successfully', course);
 })

export const getAllCourses = asyncHandler(async (req, res) => { 
     // TODO: PAGINATION , SEARCH, FILTERING
    const courses = await prisma.course.findMany({
        where: { isPublished: true, isDeleted: false },
        select: {
            id: true,
            title: true,
            slug: true,
            topic: true,
            level: true,
            price: true,
            thumbnailUrl: true,
            subCategory: {
                select: {
                    id: true,
                    name: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            },
            author: {
                select: {
                    id: true,
                    username: true,
                    image: true,
                    fullName: true
                }
            },
            createdAt: true,
            updatedAt: true,
            isFeatured: true,
   
        }
        })

    return apiResponse(res, 200, 'Courses fetched successfully', courses);
})


export const getInstructorCourses = asyncHandler(async (req, res) => {

    // TODO: PAGINATION , SEARCH, FILTERING
    const courses = await prisma.course.findMany({
        where: { authorId: req.user.id, isDeleted: false },
        select: {
            id: true,
            title: true,
            slug: true,
            price: true,
            thumbnailUrl: true,
            isFeatured: true,
            avgRating: true,
            totalRatings: true,
        }
    })



    return apiResponse(res, 200, 'Instructor courses fetched successfully', courses);

 })

export const getInstructorCourseDetails = asyncHandler(async (req, res) => { 
    const courseId = req.params.courseId;

    const course = await prisma.course.findFirst({
        where: { id: courseId, authorId: req.user.id, isDeleted: false },
        include: {
            subCategory: {
                select: {
                    name: true,
                    slug: true,
                    id: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true
                        }
                    }
                }
            },
            curriculum: {
                orderBy: { order: 'asc' },
                include: {
                    lectures: {
                        orderBy: { order: 'asc' },
                        select: {
                            id: true,
                            title: true,
                            order: true,
                            videoUrl: true,
                            description: true,
                            isPreview: true,
                            duration: true,
                            updatedAt: true
                        }
                    }
                }
            },
            courseReviews: true,
            enrollments: {
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            fullName: true,
                            image: true
                        }
                    }
                }
            }
        }
    })

    if (!course) throw new ApiError(404, 'Course not found');

    return apiResponse(res, 200, 'Instructor course details fetched successfully', course);
})