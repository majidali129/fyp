import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";

enum ROLE {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  USER = "USER",
  ADMIN = "ADMIN",
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
  refreshToken?: string;
  role: ROLE;
  permissions?: [string];
  profilePhoto: {
    public_id: string;
    url: string;
    secure_url: string;
  };
  isVerified?: boolean;
  //NOTE: ROLE BASED for INSTRUCTOR
  instructorDetails?: InstructorDetails;

  //NOTE: ROLE BASED for ADMIN
  adminDetails?: AdminDetails;

  //NOTE: ROLE BASED for STUDENT
  studentDetails?: StudentDetails;

  verifyCode?: string;
  verifyCodeExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;
}

const userSchema: Schema<User> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
      trim: true,
    },
    permissions: {
      type: [{ type: String }],
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePhoto: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
    },
    verifyCode: String,
    verifyCodeExpiry: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,

    // References to role-specific details
    instructorDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InstructorDetails",
    },
    studentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentDetails",
    },
    adminDetails: { type: mongoose.Schema.Types.ObjectId, ref: "AdminDetails" },
  },
  { timestamps: true }
);

const User =
  (mongoose.models?.User as Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default User;
