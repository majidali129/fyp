// import mongoose, {Schema, ObjectId, Types, Document} from "mongoose";

import mongoose, { Model, ObjectId, Schema, Types } from "mongoose";

export interface ICommentReply extends Document {
  repliedBy: ObjectId;
  reply: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILectureComment extends Document {
  commentedBy: ObjectId;
  lectureId: ObjectId;
  comment: string;
  replies: [ICommentReply];
  createdAt: Date;
  updatedAt: Date;
}

export const ICommentReplySchema = new Schema<ICommentReply>({
  repliedBy: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Reply must belong to a user"],
  },
  reply: {
    type: String,
    required: [true, "Can't post an empty reply"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const lectureCommentSchema: Schema<ILectureComment> = new Schema({
  commentedBy: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Comment must belong to a user"],
  },
  lectureId: {
    type: Types.ObjectId,
    ref: "Lecture",
    required: [true, "Comment must belong to a course lecture"],
  },
  comment: {
    type: String,
    required: [true, "Can't post an empty comment"],
  },
  replies: {
    type: [ICommentReplySchema],
    default: [],
  },
});

const LectureComments =
  (mongoose.models?.LectureComments as Model<ILectureComment>) ||
  mongoose.model<ILectureComment>("LectureComments", lectureCommentSchema);

export default LectureComments;
