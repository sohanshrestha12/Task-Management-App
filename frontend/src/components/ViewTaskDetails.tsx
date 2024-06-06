import { User } from "@/Types/Auth";
import { getUserById } from "@/api/User";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, Formik, FormikHelpers } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import CustomField from "./CustomField";
import { Task } from "./GridView/columns";
import { useColor } from "./context/colorContext";
import { Button } from "./ui/button";
import { createComment } from "@/api/Task";
import { useTasks } from "./context/taskContext";
import { Comment } from "@/Types/Comment";
import CommentLists from "./CommentLists";
import { CommentValidation } from "@/Validation/CommentValidation";

interface ViewTaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

const ViewTaskDetails: React.FC<ViewTaskDetailsProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const [assignee, setAssignee] = useState<User[]>([]);
  const [assigner, setAssigner] = useState<User>();
  const [comments, setComments] = useState<Comment[]>([]);
  console.log(assignee, assigner);
  const { colors } = useColor();
  const color = colors[task.status];

  const initialValues = {
    content: "",
  };
  interface commentValue {
    content: string;
  }
  const { updateTasks } = useTasks();
  const handleSubmit = async (values: commentValue,{resetForm}:FormikHelpers<commentValue>) => {
    console.log(values);
    try {
      const res = await createComment(task._id, values);
      resetForm({values:initialValues});
      setComments((prevComments) => [res.data.data.comment, ...prevComments]);
      updateTasks(res.data.data.updatedComment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (task.comments) {
      setComments(task.comments.reverse());
    }
  }, [task]);

  const fetchName = async (
    id: string,
    setter: React.Dispatch<React.SetStateAction<User[]>>
  ) => {
    try {
      const response = await getUserById(id);
      setter((prevData) => {
        if (Array.isArray(prevData)) {
          return [...prevData, response.data.data];
        } else if (prevData) {
          return [prevData, response.data.data];
        } else {
          return response.data.data;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssigner = async (id: string) => {
    try {
      const response = await getUserById(id);
      setAssigner(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAssigner(task.assigner._id);
    if (task.assignee) {
      task.assignee.forEach((assignee) => {
        if (assignee._id) {
          fetchName(assignee._id, setAssignee);
        }
      });
    }
  }, [task]);
  type ColorKey = "red" | "blue" | "green" | "yellow";
  const getColorClass = (color: string): string => {
    const colorClasses: Record<ColorKey, string> = {
      red: "bg-red-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",

      // Add more colors as needed
    };

    if (color in colorClasses) {
      return colorClasses[color as ColorKey];
    }

    return "bg-green-500";
  };
  console.log("this is comment length", task.comments?.length);

   const deleteStateComment = (deletedComment: Comment) => {
     const newComments = comments.filter(
       (comment) => comment._id !== deletedComment._id
     );

    
     setComments(newComments);
   };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="w-[50vw] max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Task Details
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <Card>
              <CardHeader className="p-4">
                <div className="flex justify-between">
                  <div className="basis-2/3">
                    <CardTitle className="capitalize font-medium">
                      {task.title}
                    </CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                  <div className="flex flex-wrap flex-col gap-2 basis-1/3">
                    <p style={{ color: color }}>{task.status}</p>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag) => (
                        <span
                          className={`px-2 py-1 ${getColorClass(
                            tag.color!
                          )} h-fit rounded-full text-white`}
                        >
                          {tag.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 py-1">
                <p className="capitalize">
                  Created By: {task.assigner.username}
                </p>
              </CardContent>
              <CardFooter className="px-4 py-2 flex flex-col items-start">
                <p>
                  Assigned To:{" "}
                  {task.assignee?.map((user) => user.username).join(", ")}
                </p>
                <p>Due Date: {moment(task.dueDate).calendar()}</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Comment</CardTitle>
                <CardDescription>
                  Feel free to reach out with any questions or thoughts!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={CommentValidation}
                >
                  {({ isSubmitting }: { isSubmitting: boolean }) => (
                    <Form
                      className="flex items-center gap-2 w-full"
                      autoFocus={false}
                    >
                      <div className="flex-grow">
                        <CustomField
                          name="content"
                          placeholder="Write your comment here."
                          type="text"
                          disabled={false}
                        />
                      </div>
                      <Button
                        className="py-1 px-3 mt-1"
                        variant={"green"}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <IoMdSend className="text-xl" />
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
              <div className="max-h-[300px] overflow-y-auto mt-auto">
                {(comments.length ?? 0) <= 0 ? (
                  <p className="flex justify-center w-full">No comments yet!</p>
                ) : (
                  <div className="flex py-2 w-full flex-col px-2">
                    {comments.map((comment) => (
                      <>
                        <CommentLists
                          key={comment._id}
                          comment={comment}
                          taskId={task._id}
                          deleteStateComment={deleteStateComment}
                        />
                      </>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTaskDetails;
