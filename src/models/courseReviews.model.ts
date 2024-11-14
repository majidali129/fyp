import mongoose, { Schema, ObjectId, Types, Document, Model } from "mongoose";

interface CourseReview extends Document {
  user: ObjectId;
  message: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const courseReviewSchema = new Schema<CourseReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: [true, "Please add a message for review."],
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const courseReviewModel =
  (mongoose.models?.CourseReview as Model<CourseReview>) ||
  mongoose.model<CourseReview>("CourseReview", courseReviewSchema);


  export default courseReviewModel;