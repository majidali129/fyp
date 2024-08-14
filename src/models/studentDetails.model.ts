import mongoose, { Model, ObjectId, Schema } from "mongoose";

export interface StudentDetails extends Document {
  enrolledCourses: ObjectId[];
  completedCourses: ObjectId[];
  userId: ObjectId; // Reference back to the user
}

const studentDetailsSchema: Schema<StudentDetails> = new Schema(
  {
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    completedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const StudentDetailsModel: Model<StudentDetails> =
  mongoose.models?.StudentDetails ||
  mongoose.model<StudentDetails>("StudentDetails", studentDetailsSchema);

export default StudentDetailsModel;
