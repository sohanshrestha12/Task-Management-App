import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "./GridView/columns";
import { useEffect, useState } from "react";
import { getUserById } from "@/api/User";
import { User } from "@/Types/Auth";

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
  const [assignee, setAssignee] = useState<User>();
  const [assigner, setAssigner] = useState<User>();
  const fetchName = async (
    id: string,
    setter: React.Dispatch<React.SetStateAction<User | undefined>>
  ) => {
    try {
      const response = await getUserById(id);
      setter(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchName(task.assigner,setAssigner);
    if(task.assignee){
        task.assignee.forEach((assignee) => {
            if(assignee._id){
                fetchName(assignee._id, setAssignee);
            }
        });
    }
  }, [task]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Task Details</DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              <p>
                <span className="text-lg font-semibold text-black">
                  Title :
                </span>
                <span className="pl-2">{task.title}</span>
              </p>
            </div>
            <div className="mt-3">
              <p>
                <span className="text-lg font-semibold text-black">
                  Description :
                </span>
                <span className="pl-2">{task.description}</span>
              </p>
            </div>
            <div className="mt-3">
              <p>
                <span className="text-xl font-semibold text-black">
                  Assigner:
                </span>
                <span className="pl-2">{assigner?.username}</span>
              </p>
            </div>
            <div className="mt-3">
              <p>
                <span className="text-xl font-semibold text-black">
                  Assignee :
                </span>
                <span className="pl-2">{assignee?.username}</span>
              </p>
            </div>
            <div className="mt-3">
              <p>
                <span className="text-xl font-semibold text-black">
                  Priority :
                </span>
                <span className="pl-2">{task.priority}</span>
              </p>
            </div>
            <div className="mt-3">
              <p>
                <span className="text-xl font-semibold text-black">
                  Status :
                </span>
                <span className="pl-2">{task.status}</span>
              </p>
            </div>
            <div className="mt-3">
              <p>
                <span className="text-xl font-semibold text-black">
                  Due Date :
                </span>
                <span className="pl-2">{task.dueDate}</span>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTaskDetails;
