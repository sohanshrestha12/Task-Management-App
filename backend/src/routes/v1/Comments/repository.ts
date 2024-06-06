import { Comment, CommentDocument, CommentModel } from "./model";

export const createComment = async(
  data: Comment,
  userId: string
): Promise<CommentDocument> => {
  const comment = new CommentModel({ ...data, user: userId });
  await comment.populate('user');
  return comment.save();
};

export const getComment = (id: string): Promise<CommentDocument | null> => {
  return CommentModel.findById(id);
};
export const editComment = (
  data: Partial<CommentDocument>,
  id: string,
  userId: string
): Promise<CommentDocument | null> => {
    const {_id,user,...updateData}=data;
  return CommentModel.findOneAndUpdate({ _id: id, user: userId }, updateData, {
    new: true,
  });
};

export const removeComment = (
  id: string,
  user: string
): Promise<CommentDocument | null> => {
  return CommentModel.findOneAndDelete({ _id: id, user: user });
};
