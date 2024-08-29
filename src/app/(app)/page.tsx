import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import BestSellingCourses from "@/components/BestSellingCourses";
import React from "react";
import RecentCourses from "@/components/RecentCourses";
import BecomeInstructor from "@/components/BecomeInstructor";
import FeaturedCourses from "@/components/FeaturedCourses";
import TopCompanies from "@/components/TopCompanies";
import TopInstructors from "@/components/TopInstructors";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <BestSellingCourses />
      <FeaturedCourses />
      <RecentCourses />
      <BecomeInstructor />
      <TopInstructors />
      <TopCompanies />
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
