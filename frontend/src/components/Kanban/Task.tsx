import { useSortable } from "@dnd-kit/sortable";
import { Task as TaskInterface } from "../GridView/columns";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: TaskInterface;
}
const Task = ({ task }: TaskProps) => {
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
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="z-0 opacity-50 h-[100px] border-2 border-green-300 bg-white rounded-xl"
      >
        {task.title} <br /> {task.status}
      </div>
    );
  }
  return (
    //   <div className="touch-none" ref={setNodeRef} style={style} {...listeners} {...attributes}>{task.title}</div>
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`h-[100px] hover:border-green-400 border-2 bg-white rounded-xl ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {task.title} <br /> {task.status}
    </div>
  );
};

export default Task;



