import mongoose, { Document } from "mongoose";

export interface Comment {
  content: string;
}

export interface CommentDocument extends Document, Comment {
  _id: mongoose.Types.ObjectId;
  user?: string;
}

const commentSchema = new mongoose.Schema<CommentDocument>(
  {
    content: {
      type: String,
      required: [true, "Content is Required"],
      unique: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is Required"],
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = mongoose.model<CommentDocument>(
  "comment",
  commentSchema
);
