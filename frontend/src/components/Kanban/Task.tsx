import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DefaultUser from "../DefaultUser";
import { Task as TaskInterface } from "../GridView/columns";
import UpdateTask from "../UpdateTask";
import { useState } from "react";
import { useColor } from "../context/colorContext";

interface TaskProps {
  task: TaskInterface;
}

const Task = ({ task }: TaskProps) => {
  const { colors } = useColor();
  const statusColor = colors[task.status];

  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({ id: task._id, data: { type: "task", task } });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleUpdateDialogOpen = () => {
    console.log("update dialog");
    setUpdateDialogOpen(true);
  };
  const handleUpdateDialogClose = () => setUpdateDialogOpen(false);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="z-0 opacity-50 min-h-[100px] border-2 border-green-300 bg-white rounded-xl"
      >
        {task.title} <br /> {task.status}
      </div>
    );
  }

  return (
    //   <div className="touch-none" ref={setNodeRef} style={style} {...listeners} {...attributes}>{task.title}</div>
    <>
      <div
        ref={setNodeRef}
        style={style}
        onClick={handleUpdateDialogOpen}
        {...attributes}
        {...listeners}
        className={`min-h-[100px] hover:border-green-400 py-3 ps-3 pe-5 break-words border-2 bg-white rounded-sm ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-medium leading-tight">{task.title}</h3>
        </div>

        <div className="flex items-center gap-5">
          <p style={{ color: statusColor }}>{task.status}</p>
          <div className="rounded-full border-none h-[30px] w-[30px] flex items-center gap-3">
            <DefaultUser />
            {task.assigner.username}
          </div>
        </div>
        <div className="flex mt-5 pb-1 gap-2 flex-wrap">
          {task.tags.map((tag) => (
            <div key={tag._id}>
              <span
                style={{ backgroundColor: tag.color ?? "lightGreen" }}
                className="px-2 py-1 text-white rounded-full"
              >
                {tag.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <UpdateTask
        isOpen={isUpdateDialogOpen}
        onClose={handleUpdateDialogClose}
        task={task}
      />
    </>
  );
};

export default Task;
