import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";

enum Level {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
  All = "All Levels",
}
enum CourseFormat {
  "self-paced" = "self-paced",
  "live" = "live",
}

enum CourseStatus {
  "Draft" = "Draft",
  "Pending-Approval" = "Pending-Approval",
  "Published" = "Published",
  "Archived" = "Archived",
}

enum Duration {
  "6-12 Months" = "6-12 Months",
  "3-6 Months" = "3-6 Months",
  "1-3 Months" = "1-3 Months",
  "1-4 Weeks" = "1-4 Weeks",
  "1-7 Days" = "1-7 Days",
}

enum PricingType {
  "Free" = "Free",
  "Paid" = "Paid",
}

interface S3File {
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

interface Lecture extends Document {
  videoUrl: string;
  lectureMetada: S3File;
  attachments: Array<S3File>;
  caption: string;
  description: string;
  notes: Array<S3File>;
  title: string;
  duration: string;
  quizzes: [ObjectId];
  comments: [ObjectId];
  isCompleted: boolean;
  order: number;
}

interface Section extends Document {
  sectionTitle: string;
  lectures: Array<Lecture>;
  order: number;
}

interface NewCourse extends Document {
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
  sections: Array<Section>;
  // publish course
  welcomeMessage: string;
  congratulationMessage: string;
  courseInstructors: [ObjectId];
  createdBy: ObjectId;
  isPublished: boolean;
  enrolledStudents: number;
  ratings: number;
  reviews: [ObjectId];
  bookMarks: [ObjectId];
}

const FileAttachmentSchema: Schema<S3File> = new Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const LectureSchema: Schema<Lecture> = new Schema({
  title: { type: String, required: true, trim: true },
  caption: { type: String, trim: true },
  description: { type: String, trim: true },
  duration: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  videoUrl: { type: String, required: true },
  lectureMetada: { type: FileAttachmentSchema },
  attachments: { type: [FileAttachmentSchema], default: [] },
  notes: { type: [FileAttachmentSchema], default: [] },
  quizzes: { type: [Schema.Types.ObjectId], ref: "Quizzes" },
  comments: { type: [Schema.Types.ObjectId], ref: "LectureComments" },
  order: { type: Number, required: true },
});

const SectionSchema: Schema<Section> = new Schema({
  sectionTitle: {
    type: String,
    required: [true, "Course title is mendatory"],
    trim: true,
  },
  lectures: {
    type: [LectureSchema],
    default: [],
  },
  order: { type: Number, required: true },
});

const CourseSchema = new Schema<NewCourse>(
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
    price: { type: Number, required: true, default: 0 },
    oldPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    enrollmentLimit: {
      type: Number,
      required: true,
      max: [100, "Students more than 100 can not be enrolled."],
    },
    courseFormat: {
      type: String,
      enum: Object.values(CourseFormat),
      default: CourseFormat["self-paced"],
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
      type: [SectionSchema],
      default: [],
      required: [true, "Please add course sections."],
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

const Course =
  (mongoose.models?.NewCourse as Model<NewCourse>) ||
  mongoose.model<NewCourse>("Course", CourseSchema);

export default Course;
