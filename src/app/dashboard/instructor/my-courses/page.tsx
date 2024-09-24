'use client'
import SelectFilter from "@/components/SelectFilter";
import React, { Suspense } from "react";
import { courseCategories, courseRatingOptions, courseSortOptions } from "../../_lib/filters-data";
import SearchInCourse from "../_components/SearchInCourse";
import { useSearchParams } from "next/navigation";
import CourseCard from "../_components/CourseCard";

const MyCoursesPage = () => {
  const params = useSearchParams()
  // console.log(params.get('search'));
  // console.log(params.get('sort'));
  // console.log(params.get('category'));
  // console.log(params.get('rating'));



  return (
    <section className="py-5">
      <div className="space-y-8 lg:space-y-5">
        {/* INSTRUCTOR ACTIONS & FILTERS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-[4fr_3fr_3fr_2fr] gap-4 *:space-y-1">
          <div>
            <span className="text-gray-500">Search:</span>
            <SearchInCourse />
          </div>
          <div >
            <span className="text-gray-500">sort by:</span>
            <Suspense>
              <SelectFilter selectItems={courseSortOptions} filterKey="sort" className="ring-0 w-full"/>
            </Suspense>
          </div>
          <div >
            <span className="text-gray-500">Category:</span>
            <Suspense>
              <SelectFilter selectItems={courseCategories} filterKey="category" className="ring-0 w-full"/>
            </Suspense>
          </div>
          <div >
          <span className="text-gray-500">Rating:</span>
            <Suspense>
              <SelectFilter selectItems={courseRatingOptions} filterKey="rating" className="ring-0 w-full"/>
            </Suspense>
          </div>
        </div>

        {/* COURSES LIST */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-4">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </ul>

        {/* //TODO; RENDER PAGENATION HERE */}
      </div>
    </section>
  );
};

export default MyCoursesPage;
