import { Comment } from "@/Types/Comment";
import DefaultUser from "./DefaultUser";
import { useAuth } from "./Auth/ProtectedRoutes";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { deleteComment } from "@/api/Task";
import axios from "axios";
import { toast } from "sonner";

const CommentLists = ({
  comment,
  taskId,
  deleteStateComment,
}: {
  comment: Comment;
  taskId: string;
  deleteStateComment: (deletedComment: Comment) => void;
}) => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setShowDeleteIcon(true);
    } else {
      const timer = setTimeout(() => {
        setShowDeleteIcon(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteComment(taskId, id);
      deleteStateComment(res.data.data.res);

      toast.success("comment deleted successfully");
      console.log(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
      console.log(error);
    }
  };

  return (
    <div
      className={`${comment.user?._id === user?._id ? "self-end" : ""} mb-6`}
    >
      <div
        className={`flex ${
          comment.user?._id === user?._id ? "flex-row-reverse" : ""
        } py-2 items-center gap-2`}
      >
        <div className="h-[30px] w-[30px]">
          <DefaultUser />
        </div>
        <p>{comment.user?.username}</p>
      </div>
      <div
        className="ml-7 w-fit relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showDeleteIcon && comment.user?._id === user?._id && (
          <RiDeleteBin5Fill
            onClick={() => handleDelete(comment._id!)}
            className={`absolute top-[30%] text-lg ${
              comment.user?._id === user?._id ? "-left-5" : "-right-5"
            } cursor-pointer w-fit text-red-500`}
          />
        )}
        <p className="bg-sky-100 break-all px-3 py-2 cursor-pointer w-fit rounded-full">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentLists;
