import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";

enum ROLE {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface InstructorDetails extends Document {
  experience: string;
  profession: string;
  fieldOfExpertise: string;
  phoneNumber: string;
  bio: string;
}

export interface StudentDetails extends Document {
  enrolledCourses: [ObjectId];
  completedCourses: [ObjectId];
}

export interface AdminDetails extends Document {
  permissions: [string];
}

export interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: ROLE;
  isVerified: boolean;
  profilePhoto: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;

  //NOTE: ROLE BASED for INSTRUCTOR
  instructorDetails?: InstructorDetails;

  //NOTE: ROLE BASED for ADMIN
  adminDetails?: AdminDetails;

  //NOTE: ROLE BASED for STUDENT
  studentDetails?: StudentDetails;
}

const userSchema: Schema<User> = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(ROLE),
      default: ROLE.USER
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    profilePhoto: String,
    verifyCode: String,
    verifyCodeExpiry: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,

    // References to role-specific details
    instructorDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InstructorDetails"
    },
    studentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentDetails"
    },
    adminDetails: { type: mongoose.Schema.Types.ObjectId, ref: "AdminDetails" }
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models?.User as Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;