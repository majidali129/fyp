import mongoose, { Model, Schema } from "mongoose";
import { ISection } from "./newCourse.model";

const SectionSchema = new Schema<ISection>({
  publicId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: [true, "Course title is mendatory"],
    trim: true,
  },
  lectures: [
    { type: Schema.Types.ObjectId, ref: "Lecture", default: [] },
  ],
  order: { type: Number, required: true },
});

const CourseSectionModel =
  (mongoose.models?.CourseSection as Model<ISection>) ||
  mongoose.model<ISection>("CourseSection", SectionSchema);

export default CourseSectionModel;
