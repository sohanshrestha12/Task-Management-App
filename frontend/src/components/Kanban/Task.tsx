import { useSortable } from "@dnd-kit/sortable";
import { Task as TaskInterface } from "../GridView/columns";
import { CSS } from "@dnd-kit/utilities";
import DefaultUser from "../DefaultUser";

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
      className={`min-h-[100px] hover:border-green-400 py-3 ps-3 pe-10 break-words border-2 bg-white rounded-sm ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="font-medium leading-tight mb-5">{task.title}</h3>
      <div className="flex items-center gap-5">
        <p>{task.status}</p>
        <div className="rounded-full border-none h-[30px] w-[30px] flex items-center gap-3">
          <DefaultUser/>
          {task.assigner.username}
        </div>
      </div>
    </div>
  );
};

export default Task;
