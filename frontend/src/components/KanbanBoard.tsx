import { Column, Task } from "@/Types/KanbanBoard";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import KanbanColumnContainer from "./KanbanColumnContainer";
import TaskCard from "./TaskCard";
import { getAllTasks } from "@/api/Task";

const KanbanBoard = () => {
  const [column, setColumn] = useState<Column[]>([
    { id: "TODO", title: "To Do" },
    { id: "INPROGRESS", title: "In Progress" },
    { id: "TESTING", title: "Testing" },
    { id: "COMPLETED", title: "Completed" },
  ]);
  const columnId = useMemo(() => column.map((col) => col.id), [column]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(()=>{
    try {
      const fetchUsers=async()=>{
        const response =await getAllTasks();
        setTasks(response.data.data);
        console.log('All tasks',response.data.data);
      }
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  },[]);

  const generateId = () => {
    return Math.floor(Math.random() * 10001).toString();
  };
  // const createNewColumn = () => {
  //   const columnToAdd: Column = {
  //     id: generateId(),
  //     title: `Column ${column.length + 1}`,
  //   };

  //   setColumn([...column, columnToAdd]);
  // };
  // const deleteColumn = (id: string): void => {
  //   const filterColumn = column.filter((col) => col.id !== id);
  //   setColumn(filterColumn);
  // };
  const onDragStart = (event: DragStartEvent) => {
    if (event?.active?.data?.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event?.active?.data?.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumn((column) => {
      const activeColumnIndex = column.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = column.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(column, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    if (!isActiveATask) return;

    // dropping a task over a task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // dropping task in another column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId.toString();

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const updateColumn = (id: string, title: string) => {
    const newColumn = column.map((col: Column) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumn(newColumn);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const updateTask = (id: string, content: string) => {
    const newTask = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTask);
  };

  const deleteTask = (id: string) => {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  };

  const createTask = (columnId: string) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-3">
          <div className="flex gap-3">
            <SortableContext items={columnId}>
              {column.map((col) => (
                <KanbanColumnContainer
                  column={col}
                  // deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  key={col.id}
                />
              ))}
            </SortableContext>
          </div>
          {/* <button
            onClick={createNewColumn}
            className="h-[50px] flex items-center gap-2 w-[320px] min-w-[320px] cursor-pointer rounded-lg bg-green-500 border-2 border-green-200 text-white p-4 ring-green-500 hover:ring-2"
          >
            <IoMdAddCircleOutline />
            Add Column
          </button> */}
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumnContainer
                updateColumn={updateColumn}
                column={activeColumn}
                createTask={createTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
                updateTask={updateTask}
                deleteTask={deleteTask}
                // deleteColumn={deleteColumn}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
