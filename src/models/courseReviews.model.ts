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
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
    },
    rating: {
      type: Number,
      min: [1, "Rating can't be less than 1"],
      max: [5, "Rating can't be more than 5"],
      default: 0,
    },
  },
  { timestamps: true }
);

const CourseReview =
  (mongoose.models?.CourseReview as Model<CourseReview>) ||
  mongoose.model<CourseReview>("CourseReview", courseReviewSchema);

export default CourseReview;
