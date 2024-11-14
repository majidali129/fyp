import { Document } from "mongoose";
import { ObjectId } from "mongoose";

export enum Level {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
  All = "All Levels",
}
export enum CourseFormat {
  "self-paced" = "self-paced",
  "live" = "live",
}

export enum CourseStatus {
  "Draft" = "Draft",
  "Pending-Approval" = "Pending-Approval",
  "Published" = "Published",
  "Archived" = "Archived",
}

export enum Duration {
  "6-12 Months" = "6-12 Months",
  "3-6 Months" = "3-6 Months",
  "1-3 Months" = "1-3 Months",
  "1-4 Weeks" = "1-4 Weeks",
  "1-7 Days" = "1-7 Days",
}

export enum PricingType {
  "Free" = "Free",
  "Paid" = "Paid",
}

export interface IS3File {
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface ILecture extends Document {
  title: string;
  caption: string;
  description: string;
  duration: string;
  isCompleted: boolean;
  videoUrl: string;
  lectureMetada: IS3File;
  attachments: Array<IS3File>;
  notes: Array<IS3File>;
  quizzes: [ObjectId];
  comments: [ObjectId];
  order: number;
}

export interface ISection extends Document {
  sectionTitle: string;
  lectures: Array<ObjectId> | Array<ILecture>;
  order: number;
}


export interface ICourse extends Document {
  title: string;
  subTitle: string;
  category: string;
  subCategory: string;
  courseTopic: string;
  language: string;
  subtitleLanguage: string;
  courseLevel: Level;
  courseDuration: Duration;
  pricingType: PricingType;
  price: number;
  oldPrice: number;
  discount: number;
  enrollmentLimit: number;
  courseFormat: string;
  status: CourseStatus;
  courseBriefSummary: string;
  courseDescription: string;
  whatYouWillLearn: Array<string>;
  targetAudience: Array<string>;
  courseRequirements: Array<string>;
  thumbnail: string;
  trailerUrl: string;
  //   curriculum
  sections: Array<ObjectId>;
  // publish course
  welcomeMessage: string;
  congratulationMessage: string;
  courseInstructors: Array<ObjectId>;
  createdBy: ObjectId;
  isPublished: boolean;
  enrolledStudents: number;
  ratings: number;
  reviews: Array<ObjectId>;
  bookMarks: Array<ObjectId>;
}