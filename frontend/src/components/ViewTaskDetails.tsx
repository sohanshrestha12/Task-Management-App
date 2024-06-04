import { User } from "@/Types/Auth";
import { getUserById } from "@/api/User";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Task } from "./GridView/columns";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
  const fetchName = async (
    id: string,
    setter: React.Dispatch<React.SetStateAction< User[] >>
  ) => {
    try {
      const response = await getUserById(id);
      setter(prevData => {
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

  const fetchAssigner = async(id:string) =>{
    try {
      const response = await getUserById(id);
      setAssigner(response.data.data);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    fetchAssigner(task.assigner._id);
    if(task.assignee){
        task.assignee.forEach((assignee) => {
            if(assignee._id){
                fetchName(assignee._id, setAssignee);
            }
        });
    }
  }, [task]);
  useEffect(()=>{
    console.log("this is view details assignee",assignee);
    console.log("this is view details assigner",assigner);
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Task Details</DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              <label className="text-black">Title</label>
              <Input
                className="border-2 border-black text-black"
                type="text"
                disabled
                value={task.title}
              ></Input>
            </div>
            <div className="mt-3">
              <label className="text-black">Description</label>
              <Textarea
                className="border-2 border-black text-black"
                disabled
              >
                {task.description}
              </Textarea>
            </div>
            <div className="mt-3">
              <label className="text-black">Assigner</label>
              <Input
                className="border-2 border-black text-black"
                type="text"
                disabled
                value={assigner?.username}
              ></Input>
            </div>
            <div className="mt-3">
              <label className="text-black">Assignee</label>
              <Input
                className="border-2 border-black text-black"
                type="text"
                disabled
                value={[
                  ...new Set(assignee?.map((assignee) => assignee.username)),
                ]}
              ></Input>
            </div>
            <div className="mt-3">
              <label className="text-black">Priority</label>
              <Input
                className="border-2 border-black text-black"
                type="text"
                disabled
                value={task.priority}
              ></Input>
            </div>
            <div className="mt-3">
              <label className="text-black">Status</label>
              <Input
                className="border-2 border-black text-black"
                type="text"
                disabled
                value={task.status}
              ></Input>
            </div>
            <div className="mt-3">
              <label className="text-black">Due Date</label>
              <Input
                className="border-2 border-black text-black"
                type="text"
                disabled
                value={task.dueDate}
              ></Input>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTaskDetails;
