import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Task as TaskInterface } from "../GridView/columns";
import Task from "./Task";

interface ColumnProps {
  column: { status: string; tasks: TaskInterface[] };
}
interface DroppableParameterType {
  taskIndex: number;
  columnStatus:string;
}

const Column = ({ column }: ColumnProps) => {
  const itemIds = column.tasks.map((task) => task._id);
   const { isOver, setNodeRef } = useDroppable({
     id: `${column.status}-col`,
     data: { type: "column"},
   });
  const backgroundColor = isOver ? "lightblue" : "transparent";


  return (
    <div className="col-span-1 h-fit bg-gray-200 p-2">
      <h2 className="bg-white mb-3">{column.status}</h2>
      <div ref={setNodeRef} style={{backgroundColor}}>
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

  return (
    <div ref={setNodeRef} style={{ backgroundColor }} className="py-1 gap-2">
      
    </div>
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

  return (
    <div ref={setNodeRef} style={{ backgroundColor }} className="py-1 gap-2">
      
    </div>
  );
};

export default Column;
