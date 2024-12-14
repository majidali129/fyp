import mongoose, { Model, Schema } from "mongoose";
import { ISection } from "./newCourse.model";

const SectionSchema = new Schema<ISection>({
  couseId: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Course title is mendatory"],
    trim: true,
  },
  lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture", default: [] }],
  order: { type: Number, required: true },
});

const Section =
  (mongoose.models?.CourseSection as Model<ISection>) ||
  mongoose.model<ISection>("Section", SectionSchema);

export default Section;
