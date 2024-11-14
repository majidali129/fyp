import { ILecture, IS3File } from "@/types/course";
import mongoose, { Schema, Model } from "mongoose";

const FileAttachmentSchema: Schema<IS3File> = new Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const LectureSchema = new Schema<ILecture>({
  videoUrl: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  caption: { type: String, trim: true },
  description: { type: String, trim: true },
  duration: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  lectureMetada: FileAttachmentSchema,
  attachments: { type: [FileAttachmentSchema], default: [] },
  notes: { type: [FileAttachmentSchema], default: [] },
  quizzes: { type: [Schema.Types.ObjectId], ref: "Quizzes" },
  comments: { type: [Schema.Types.ObjectId], ref: "LectureComments" },
  order: { type: Number, required: true },
});

const LectureModel =
  (mongoose.models?.Lecture as Model<ILecture>) ||
  mongoose.model<ILecture>("Lecture", LectureSchema);

export default LectureModel;
