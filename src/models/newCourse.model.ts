import {
  CourseFormat,
  CourseStatus,
  Duration,
  ICourse,
  Level,
  PricingType,
} from "@/types/course";
import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";



const CourseSchema = new Schema<ICourse>(
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
    whatYouWillLearn: { type: [String], default: [], maxlength: 8 },
    targetAudience: { type: [String], default: [], maxlength: 8 },
    courseRequirements: { type: [String], default: [], maxlength: 8 },
    thumbnail: { type: String, required: true, trim: true },
    trailerUrl: { type: String, required: true, trim: true },
    // curriculum
    sections: {
      type: [Schema.Types.ObjectId],
      ref: "CourseSection",
      default: [],
      // required: [true, "Please add course sections."],
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
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "CourseReviews",
      default: [],
    },
    bookMarks: {
      type: [Schema.Types.ObjectId],
      ref: "BookMarks",
      default: [],
    },
  },
  { timestamps: true }
);

CourseSchema.index({
  title: 1,
  category: 1,
  price: 1,
  ratings: 1,
  enrolledStudents: 1,
});

const CourseModel =
  (mongoose.models?.Course as Model<ICourse>) ||
  mongoose.model<ICourse>("Course", CourseSchema);

export default CourseModel;
