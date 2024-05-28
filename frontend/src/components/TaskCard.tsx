import { Task } from "@/Types/KanbanBoard";
import { useSortable } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
}

const TaskCard = ({ task, deleteTask, updateTask }: TaskCardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(()=>{
    console.log('task',task);
  },[task])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if(isDragging){
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white opacity-50 border-green-500 border-2 relative p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-green-500 cursor-grab"
      />
    );
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white relative p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-green-500 cursor-grab"
      >
        <textarea
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
          value={task.description}
          className=" transparent h-[90%] w-full resize-none border-none rounded focus:outline-none"
          name=""
          id=""
        ></textarea>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="bg-white relative p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-green-500 cursor-grab"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto  whitespace-pre-wrap pe-10 break-words">
        {task.description}
      </p>

      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="absolute right-4 p-2 hover:text-red-500"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
