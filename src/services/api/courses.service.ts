import { Sections } from "@/context/new-course/defs";
import { apiClient } from "@/lib/axios-client";

const createCourse = async (data: FormData) => {
  const response = await apiClient.post(`/courses/create-new-course`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

const saveCourseMetadata = async (metadata: any, courseId: string) => {
  const response = await apiClient.patch(`/courses/create-new-course`, {
    ...metadata,
    courseId,
  });
  return response;
};

const saveCurriculumSection = async (section: Sections) => {
  const response = await apiClient.patch(
    `/courses/create-new-course/add-curriculum`,
    section
  );
  return response;
};

const getCourses = async () => {
    const response = await apiClient.get(`/courses`);
    return response.data;
  };
const getCourseDetails = async (courseId: string) => {
    const response = await apiClient.get(`/courses/course/${courseId}`);
    return response.data;
  };

const deleteCourse = async (courseId: string) => {
    const response = await apiClient.delete(`/courses/course/${courseId}`);
    return response.data;
  };

export { createCourse, saveCourseMetadata, saveCurriculumSection, getCourses, getCourseDetails, deleteCourse };
