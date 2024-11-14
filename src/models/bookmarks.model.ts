import { IBookmark } from "@/types/bookmarks";
import mongoose, { Schema, Model } from "mongoose";



const bookmarkSchema = new Schema<IBookmark>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ user: 1, course: 1 }, { unique: true });

const bookmarks =
  (mongoose.models?.bookmarks as Model<IBookmark>) ||
  mongoose.model<IBookmark>("Bookmarks", bookmarkSchema);

export default bookmarks;
