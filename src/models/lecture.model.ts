// import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";

// interface S3File {
//   url: string;
//   filename: string;
//   mimeType: string;
//   size: number;
//   uploadedAt: Date;
// }

// interface Lecture extends Document {
//     course: [ObjectId];
//     courseSection: [ObjectId];
//   videoUrl: string;
//   lectureMetada: S3File;
//   attachments: Array<S3File>;
//   caption: string;
//   description: string;
//   notes: Array<S3File>;
//   title: string;
//   duration: string;
//   quizzes: [ObjectId];
//   comments: [ObjectId];
//   isCompleted: boolean;
//   order: number;
// }

// const FileAttachmentSchema: Schema<S3File> = new Schema({
//   url: { type: String, required: true },
//   filename: { type: String, required: true },
//   mimeType: { type: String, required: true },
//   size: { type: Number, required: true },
//   uploadedAt: { type: Date, default: Date.now },
// });

// const LectureSchema: Schema<Lecture> = new Schema({
//     course: {type: Schema.Types.ObjectId, ref: 'Course'},
//     courseSection: {type: Schema.Types.ObjectId, ref: 'Course'},
//   title: { type: String, required: true, trim: true },
//   caption: { type: String, trim: true },
//   description: { type: String, trim: true },
//   duration: { type: String, required: true },
//   isCompleted: { type: Boolean, default: false },
//   videoUrl: { type: String, required: true },
//   lectureMetada: FileAttachmentSchema,
//   attachments: { type: [FileAttachmentSchema], default: [] },
//   notes: { type: [FileAttachmentSchema], default: [] },
//   quizzes: { type: [Schema.Types.ObjectId], ref: "Quizzes" },
//   comments: { type: [Schema.Types.ObjectId], ref: "LectureComments" },
//   order: { type: Number, required: true },
// });

// const Lecture =
//   (mongoose.models?.Lecture as Model<Lecture>) ||
//   mongoose.model<Lecture>("Lecture", LectureSchema);

// export default Lecture;
