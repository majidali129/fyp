import { CourseStatus, Duration, Level, PricingType } from "@/types/course";
import type { ReactNode } from "react";

interface NewCourseContextProviderProp {
  children: ReactNode;
}
interface Instructor {
  image: string,
  name: string,
  profession: string
}

interface Lecture {
  notes: File | any,
  caption: string,
  description: string,
  video: File,
  id: string
}
interface Sections {
  title: string,
  order: number,
  id: string,
  lectures: Array<Lecture>
}

// Only for text data & without state updators

interface NewCourseMetadataState {
  title: string;
  subTitle: string;
  category: string;
  subCategory: string;
  courseTopic: string;
  language: string;
  subtitleLanguage?: string;
  courseLevel: Level;
  courseDuration: Duration;
  pricingType: PricingType;
  price: number;
  discount: number;
  enrollmentLimit: number;
  courseFormat: string;
  status: CourseStatus;
  // Advance Info
  thumbnail: File | null;
  trailer: File | null;
  briefSummary: string;
  description: string;
  whatYouWillLearn: Array<string>;
  targetAudience: Array<string>;
  courseRequirements: Array<string>;
  //   curriculum
  sections:Array<Sections> | [];
  // publish course
  welcomeMessage: string;
  congratulationMessage: string;
  courseInstructors: Array<Instructor> | [];
}

// Actions to update state metadata
interface NewCourseMetadataActions {
  setMetadata: (newData: any) => void;
}



type NewCourseValue = NewCourseMetadataState & NewCourseMetadataActions


export type {
  NewCourseContextProviderProp,
  NewCourseValue,
  Lecture, Sections, NewCourseMetadataState, Instructor,
};