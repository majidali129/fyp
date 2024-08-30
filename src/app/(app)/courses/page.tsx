import Courses from "@/components/Courses";
import { Suspense } from "react";

const CoursesPage = () => {

  return <Suspense >
    <Courses />
  </Suspense>
};

export default CoursesPage;
