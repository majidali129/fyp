import mongoose, { Model, ObjectId, Schema } from "mongoose";

export interface InstructorDetails extends Document {
  experience: string;
  profession: string;
  fieldOfExpertise: string;
  phoneNumber: string;
  bio: string;
  userId: ObjectId; // Reference back to the user
}

const instructorDetailsSchema: Schema<InstructorDetails> = new Schema(
  {
    experience: { type: String, required: true },
    profession: { type: String, required: true },
    fieldOfExpertise: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bio: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const InstructorDetailsModel: Model<InstructorDetails> =
  mongoose.models?.InstructorDetails ||
  mongoose.model<InstructorDetails>(
    "InstructorDetails",
    instructorDetailsSchema
  );

export default InstructorDetailsModel;
