import mongoose, { Schema, ObjectId, Document, Model } from "mongoose";

interface CourseReview extends Document {
  userId: ObjectId;
  courseId: ObjectId;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const courseReviewSchema: Schema<CourseReview> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Review must belong to a user']
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, 'Review must belong to a course'],
    },
    review: {
      type: String,
      required: [true, "Can't post an empty review"],
    },
    rating: {
      type: Number,
      min:1,
      max:5,
      default: 0,
    },
  },
  { timestamps: true }
);

const CourseReview =
  (mongoose.models?.CourseReview as Model<CourseReview>) ||
  mongoose.model<CourseReview>("CourseReview", courseReviewSchema);

export default CourseReview;
