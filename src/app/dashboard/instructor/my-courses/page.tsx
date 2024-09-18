import Link from "next/link";
import React from "react";

const MyCoursesPage = () => {
  return (
    <div>
      Instructor my Courses Page{" "}
      <Link href={'href="/dashboard/instructor/my-courses/course/lskdlsd'} className="!text-secondary-500">
        Course Details
      </Link>
    </div>
  );
};

export default MyCoursesPage;
