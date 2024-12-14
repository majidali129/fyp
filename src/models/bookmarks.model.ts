import mongoose, { Schema, Model, ObjectId } from "mongoose";

interface IBookmarkItem {
  courseId: ObjectId;
  quantity: Number;
}

interface IBookmarks {
  owner: ObjectId;
  items: Array<IBookmarkItem>;
}

const bookmarkSchema: Schema<IBookmarks> = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: {
      type: [
        {
          courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
          },
          quantity: {
            type: Number,
            default: 1,
            min: [1, "Quantity can not be less then 1."],
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ owner: 1, "user.course": 1 }, { unique: true });

const Bookmarks =
  (mongoose.models?.bookmarks as Model<IBookmarks>) ||
  mongoose.model<IBookmarks>("Bookmarks", bookmarkSchema);

export default Bookmarks;
