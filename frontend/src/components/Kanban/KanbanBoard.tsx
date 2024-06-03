import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Task as TaskInterface } from "../GridView/columns";
import { useTasks } from "../context/taskContext";
import Column from "./Column";
import Task from "./Task";
import { getUpdatedTaskStatus } from "@/api/Task";

const KanbanBoard = () => {
  const { tasks, KanbanTask,setKanbanTasks } = useTasks();
  const [activeTask, setActiveTask] = useState<TaskInterface | null>(null);

  useEffect(() => {
    console.log("acivetask", activeTask);
    console.log("array of tasks", tasks);
  }, [activeTask, tasks]);

  const [columns, setColumns] = useState([
    { status: "TODO", tasks: tasks.filter((task) => task.status === "TODO") },
    {
      status: "INPROGRESS",
      tasks: tasks.filter((task) => task.status === "INPROGRESS"),
    },
    {
      status: "TESTING",
      tasks: tasks.filter((task) => task.status === "TESTING"),
    },
    {
      status: "COMPLETED",
      tasks: tasks.filter((task) => task.status === "COMPLETED"),
    },
  ]);

  useEffect(() => {
    setColumns([
      { status: "TODO", tasks: tasks.filter((task) => task.status === "TODO") },
      {
        status: "INPROGRESS",
        tasks: tasks.filter((task) => task.status === "INPROGRESS"),
      },
      {
        status: "TESTING",
        tasks: tasks.filter((task) => task.status === "TESTING"),
      },
      {
        status: "COMPLETED",
        tasks: tasks.filter((task) => task.status === "COMPLETED"),
      },
    ]);
  }, [tasks]);

  const handleUpdateStatus = async (activeId: string, status: string) => {
    try {
      const response = await getUpdatedTaskStatus(activeId, status);
      console.log("swappedColumn", response);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedKanbanTask = (updatedTasks: TaskInterface[]) => {
    const timer = setTimeout(() => {
      KanbanTask(updatedTasks);
    }, 100); // Adjust debounce delay as needed
    return () => clearTimeout(timer);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id: UniqueIdentifier) =>
    tasks.findIndex((task) => task._id === id);

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log("over event", event);
    if (!over) return;

    const isActiveTask = active.data.current?.type === "task";
    const isOverTask = over.data.current?.type === "task";
    console.log("over ko", isActiveTask, isOverTask);

    if (isActiveTask && isOverTask) {
      const activeIndex = getTaskPos(active.id);
      const overIndex = getTaskPos(over.id);
      if (activeIndex !== overIndex) {
        const updatedTasks = arrayMove(tasks, activeIndex, overIndex);
        debouncedKanbanTask(updatedTasks);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("end event", event);

    if (!over) return;
    const isOverColumnTask = over.data.current?.type === "column";
    const activeIndex = getTaskPos(active.id);
    const overIndex = getTaskPos(over.id);
    console.log("end ko active ra over index", activeIndex, overIndex);
    if (activeIndex !== overIndex && isOverColumnTask) {
      console.log("1st one gayo");
      const updatedTask = tasks.map((task) => {
        if (task._id === activeTask?._id) {
          if (
            over.id.toString().split("-")?.shift() === "TODO" ||
            over.id.toString().split("-")?.shift() === "INPROGRESS" ||
            over.id.toString().split("-")?.shift() === "TESTING" ||
            over.id.toString().split("-")?.shift() === "COMPLETED"
          ) {
            console.log(
              "task bhitra gayo",
              over.id.toString().split("-")?.shift()
            );
            const status = over?.id.toString().split("-")?.shift() ?? "";
            task.status = status as
              | "TODO"
              | "INPROGRESS"
              | "TESTING"
              | "COMPLETED";
          }
        }
        return task;
      });
      setKanbanTasks(updatedTask);
      setColumns([
        {
          status: "TODO",
          tasks: updatedTask.filter((task) => task.status === "TODO"),
        },
        {
          status: "INPROGRESS",
          tasks: updatedTask.filter((task) => task.status === "INPROGRESS"),
        },
        {
          status: "TESTING",
          tasks: updatedTask.filter((task) => task.status === "TESTING"),
        },
        {
          status: "COMPLETED",
          tasks: updatedTask.filter((task) => task.status === "COMPLETED"),
        },
      ]);
    }
    if (!activeTask) return;

    if (isOverColumnTask) {
      handleUpdateStatus(activeTask?._id, over?.id.toString().split('-')?.shift() ?? "");
    }

    setActiveTask(null);
  };

  return (
    <div>
      <h1>Kanban view</h1>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={closestCorners}
      >
        <div className="grid grid-cols-4 bg-white gap-2 w-[82vw]">
          {columns.map((column) => (
            <Column key={column.status} column={column} />
          ))}
        </div>
        {createPortal(
          <DragOverlay>{activeTask && <Task task={activeTask} />}</DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
