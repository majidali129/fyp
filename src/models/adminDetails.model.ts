import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface AdminDetails extends Document {
  permissions: string[];
  userId: ObjectId; // Reference back to the user
}

const adminDetailsSchema: Schema<AdminDetails> = new Schema(
  {
    permissions: { type: [String], required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const AdminDetailsModel =
  (mongoose.models?.AdminDetails as mongoose.Model<AdminDetails>) ||
  mongoose.model("AdminDetails", adminDetailsSchema);

// const AdminDetailsModel: Model<AdminDetails> = mongoose.models?.AdminDetails ||
// mongoose.model<AdminDetails>("AdminDetails", adminDetailsSchema);

export default AdminDetailsModel;
