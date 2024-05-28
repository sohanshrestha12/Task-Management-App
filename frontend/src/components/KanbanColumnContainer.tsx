import { Column, Task } from "@/Types/KanbanBoard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import TaskCard from "./TaskCard";

interface KanbanColumnContainerProps {
  column: Column;
//   deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;
//   createTask: (columnId: string) => void;
  updateTask: (id: string, content: string) => void;
  deleteTask: (id: string) => void;
  tasks: Task[];
}
const KanbanColumnContainer = (props: KanbanColumnContainerProps) => {
  const {
    column,
    // deleteColumn,
    updateColumn,
    // createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const taskIds = useMemo(()=>{
    return tasks.map(task => task.id);
  },[tasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-200 w-[300px] h-[500px] max-h-[500px] rounded-md flex flex-col p-1 opacity-30 border-2 border-rose-500"
      ></div>
    );
  }

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="bg-gray-200 w-[300px] h-[500px] max-h-[500px] rounded-md flex flex-col p-1"
    >
      <div
        onClick={() => setEditMode(true)}
        className="bg-white rounded-md text-md h-[60px] cursor-grab p-3 font-bold border-4 flex justify-between"
      >
        {!editMode && column.title}
        {editMode && (
          <input
            value={column.title}
            onChange={(e) => updateColumn(column.id, e.target.value)}
            autoFocus
            onBlur={() => {
              setEditMode(false);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              setEditMode(false);
            }}
          />
        )}
        {/* <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="text-gray-500 hover:text-red-500 px-1 py-2"
        >
          <FaTrash />
        </button> */}
      </div>

      {/* colunm task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        // onClick={() => {
        //   createTask(column.id);
        // }}
        className="flex gap-2 items-center justify-center bg-white border-white border-2 rounded-md p-2 hover:bg-gray-200"
      >
        <IoMdAddCircleOutline />
        Add Task
      </button>
    </div>
  );
};

export default KanbanColumnContainer;
