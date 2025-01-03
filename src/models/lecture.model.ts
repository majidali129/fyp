import mongoose, { Schema, Model } from "mongoose";
import { ILecture } from "./newCourse.model";
import { string } from "zod";

export const LectureSchema = new Schema<ILecture>({
  publicId: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  caption: { type: String, trim: true },
  description: { type: String, trim: true },
  isCompleted: { type: Boolean, default: false },
  order: { type: Number, required: true },
  video: {
    public_id: {
      type: String,
      required: true,
    },
    original: { type: String, require: true },
    playback_url: { type: String, required: true },
    resolutions: {
      type: [
        {
          resolution: { type: String, required: true },
          url: { type: String, required: true },
          secure_url: { type: String, required: true },
          status: { type: String, default: "Draft" },
        },
      ],
    },
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "LectureComments",
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
});

const Lecture =
  (mongoose.models?.Lecture as Model<ILecture>) ||
  mongoose.model<ILecture>("Lecture", LectureSchema);

export default Lecture;
