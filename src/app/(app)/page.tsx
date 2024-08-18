import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import BestSellingCourses from "@/components/BestSellingCourses";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <BestSellingCourses />
    </>
  );
};

export default HomePage;
