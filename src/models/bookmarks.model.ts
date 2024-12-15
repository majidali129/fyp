import mongoose, { Schema, Model, ObjectId } from "mongoose";

interface IUserBookmarks extends Document {
  courseId: ObjectId;
  bookmarkedBy: ObjectId;
}

const bookmarkSchema: Schema<IUserBookmarks> = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    bookmarkedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ courseId: 1, bookmarkedBy: 1 }, { unique: true });

const UserBookmarks =
  (mongoose.models?.UserBookmarks as Model<IUserBookmarks>) ||
  mongoose.model<IUserBookmarks>("UserBookmarks", bookmarkSchema);

export default UserBookmarks;
