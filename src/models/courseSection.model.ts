import { ISection } from "@/types/course";
import mongoose, { Model, Schema } from "mongoose";

const SectionSchema = new Schema<ISection>({
  sectionTitle: {
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
