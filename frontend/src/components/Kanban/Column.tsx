import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Task as TaskInterface } from "../GridView/columns";
import Task from "./Task";

interface ColumnProps {
  column: { status: string; tasks: TaskInterface[] };
  colors:{[key:string]:string}

}
interface DroppableParameterType {
  taskIndex: number;
  columnStatus: string;
}


const Column = ({ column,colors }: ColumnProps) => {
  const statusColor = colors[column.status] || 'black';
  const itemIds = column.tasks.map((task) => task._id);
  const { isOver, setNodeRef } = useDroppable({
    id: `${column.status}-col`,
    data: { type: "column" },
  });
  const backgroundColor = isOver ? "lightblue" : "transparent";

  return (
    <div className="col-span-1 h-fit bg-gray-200 px-1">
      <div className="flex justify-between items-center bg-white mb-3 px-2 py-3">
        <h2 style={{ color: statusColor }} className="font-medium text-center">
          {column.status}
        </h2>
        <p className="font-semibold" style={{ color: statusColor }}>
          {column.tasks.length}
        </p>
      </div>
      <div ref={setNodeRef} style={{ backgroundColor }}>
        <SortableContext items={itemIds}>
          {column.tasks.map((item, index) => (
            <React.Fragment key={item._id}>
              <DroppableAbove taskIndex={index} columnStatus={column.status} />

              <Task task={item} />

              <DroppableBelow taskIndex={index} columnStatus={column.status} />
            </React.Fragment>
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

// Droppable area above the task
const DroppableAbove = ({
  taskIndex,
  columnStatus,
}: DroppableParameterType) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `${columnStatus}-below-${taskIndex}`,
    data: { type: "column", position: "above", index: taskIndex },
  });
  const backgroundColor = isOver ? "lightblue" : "transparent";
  // console.log(`DroppableAbove ${taskIndex}: isOver = ${isOver}`);

  return (
    <div
      ref={setNodeRef}
      style={{ backgroundColor }}
      className="py-3 gap-2"
    ></div>
  );
};

// Droppable area below the task
const DroppableBelow = ({
  taskIndex,
  columnStatus,
}: DroppableParameterType) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `${columnStatus}`,
    data: { type: "column", position: "below", index: taskIndex },
  });
  const backgroundColor = isOver ? "lightblue" : "transparent";
  // console.log(`DroppableBelow ${taskIndex}: isOver = ${isOver}`);

  return (
    <div
      ref={setNodeRef}
      style={{ backgroundColor }}
      className="py-3 gap-2"
    ></div>
  );
};

export default Column;
