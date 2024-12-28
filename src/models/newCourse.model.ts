import mongoose, { Schema, Model } from "mongoose";

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

export interface IFileMetadata {
  filename: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface IUserGuide {
  value: string;
  placeholder?: string;
}

export interface ILecture extends Document {
  courseId: ObjectId;
  publicId: string; // Unique identifier for the lecture from client
  title: string;
  caption: string;
  description: string;
  isCompleted: boolean;
  // duration: string;
  // videoUrl: string;
  // lectureMetada: IFileMetadata;
  // quizzes: [ObjectId];
  video: {
    public_id: string;
    playback_url: string;
    resolutions: Array<{
      resolution: string;
      url: string;
      secure_url: string;
      status: string;
    }>;
  };
  tags: Array<string>;
  notes: Array<IFileMetadata>;
  comments: [ObjectId];
  order: number;
}

export interface ISection extends Document {
  couseId: ObjectId;
  title: string;
  order: number;
  publicId: string;
  lectures: Array<ObjectId>;
}

export interface ICourse extends Document {
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
  oldPrice: number;
  discount: number;
  enrollmentLimit: number;
  courseFormat: string;
  status: CourseStatus;
  // Advance Info
  thumbnail: {
    public_id: string;
    url: string;
    bytes: number
  };
  trailer: {
    public_id: string;
    url: string;
    duration: number;
    bytes: number
  };
  courseBriefSummary: string;
  courseDescription: string;
  whatYouWillTeach: Array<IUserGuide>;
  targetAudience: Array<IUserGuide>;
  courseRequirements: Array<IUserGuide>;
  //   curriculum
  sections: Array<ObjectId>;
  // publish course
  welcomeMessage: string;
  congratulationMessage: string;
  courseInstructors: Array<ObjectId>;
  createdBy: ObjectId;
  isPublished: boolean;
  enrolledStudents: Array<ObjectId>;
  ratings: number;
  avgRatings: number;
  reviews: Array<ObjectId>;
  bookMarks: Array<ObjectId>;
}

const UserGuideSchema: Schema<IUserGuide> = new Schema({
  value: { type: String, required: true, trim: true },
  placeholder: { type: String, required: true, trim: true },
});

const CourseSchema: Schema<ICourse> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subTitle: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    courseTopic: { type: String, required: true, trim: true },
    language: { type: String, required: true, trim: true },
    subtitleLanguage: { type: String, required: true, trim: true },
    courseLevel: {
      type: String,
      required: [true, "Please add course level"],
      enum: Object.values(Level),
    },
    courseDuration: {
      type: String,
      required: [true, "Please add course duration"],
      enum: Object.values(Duration),
    },
    pricingType: {
      type: String,
      enum: Object.values(PricingType),
      default: PricingType.Paid,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    oldPrice: {
      type: Number,
      default: 0,
      min: [0, "Old price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
    },
    enrollmentLimit: {
      type: Number,
      required: true,
      max: [100, "Enrollment limit exceeds maximum allowed (100)"],
    },
    courseFormat: {
      type: String,
      enum: Object.values(CourseFormat),
      default: CourseFormat["self-paced"],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(CourseStatus),
      default: CourseStatus.Draft,
    },
    courseBriefSummary: { type: String, required: true, trim: true },
    courseDescription: { type: String, required: true, trim: true },
    whatYouWillTeach: {
      type: [UserGuideSchema],
      required: true,
    },
    targetAudience: { type: [UserGuideSchema], required: true, maxlength: 8 },
    courseRequirements: {
      type: [UserGuideSchema],
      required: true,
      maxlength: 8,
    },
    // curriculum
    sections: {
      type: [Schema.Types.ObjectId],
      ref: "Section",
      default: [],
    },
    welcomeMessage: { type: String, required: true, trim: true },
    congratulationMessage: { type: String, required: true, trim: true },
    courseInstructors: {
      type: [Schema.Types.ObjectId],
      ref: "Instructors",
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: { type: Boolean, default: false },
    enrolledStudents: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    avgRatings: {
      type: Number,
      default: 0
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "CourseReview",
      default: [],
    },
    bookMarks: {
      type: [Schema.Types.ObjectId],
      ref: "BookMark",
      default: [],
    },
  },
  { timestamps: true }
);

CourseSchema.index({
  _id: 1,
  title: 1,
  category: 1,
  price: 1,
  ratings: 1,
  courseLevel: 1,
  courseDuration: 1,
  pricingType: 1,
  enrolledStudents: 1,
});

const Course =
  (mongoose.models?.Course as Model<ICourse>) ||
  mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
