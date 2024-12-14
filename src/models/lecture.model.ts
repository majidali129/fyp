import mongoose, { Schema, Model } from "mongoose";
import { IFileMetadata, ILecture } from "./newCourse.model";

const FileAttachmentSchema: Schema<IFileMetadata> = new Schema({
  filename: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export const LectureSchema = new Schema<ILecture>({
  courseId: {
    type: String,
    required: true,
  },
  publicId: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  caption: { type: String, trim: true },
  description: { type: String, trim: true },
  isCompleted: { type: Boolean, default: false },
  video: {
    playback_url: { type: String, required: true },
    resolutions: [
      {
        resolution: String,
        url: String,
        secure_url: String,
        status: String,
      },
    ],
  },
  notes: { type: [FileAttachmentSchema], default: [] },
  comments: { type: [Schema.Types.ObjectId], ref: "LectureComments" },
  order: { type: Number, required: true },
  // duration: { type: String, required: true },
  // quizzes: { type: [Schema.Types.ObjectId], ref: "Quizzes" },
});

const Lecture =
  (mongoose.models?.Lecture as Model<ILecture>) ||
  mongoose.model<ILecture>("Lecture", LectureSchema);

export default Lecture;
