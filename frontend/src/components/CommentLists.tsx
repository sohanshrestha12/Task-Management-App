import { Comment } from "@/Types/Comment";
import DefaultUser from "./DefaultUser";
import { useAuth } from "./Auth/ProtectedRoutes";

const CommentLists = ({ comment }: { comment: Comment }) => {
  const {user} = useAuth();
  return (
    <div className={`${comment.user?._id === user?._id?'self-end':""} mb-6`}>
      <div className={`flex ${comment.user?._id === user?._id?  'flex-row-reverse':""} py-2 items-center gap-2`}>
        <div className="h-[30px] w-[30px]">
          <DefaultUser />
        </div>
        <p>{comment.user?.username}</p>
      </div>
      <div className="ml-7 bg-sky-100 px-3 py-1 w-fit rounded-full">
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentLists;
