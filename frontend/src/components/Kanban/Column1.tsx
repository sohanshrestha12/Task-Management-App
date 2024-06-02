import { SortableContext } from "@dnd-kit/sortable";
import { Task as TaskInterface } from "../GridView/columns";
import Task from "./Task";

interface ColumnProps {
  column: { status: string; tasks: TaskInterface[] };
}
const Column = ({ column }: ColumnProps) => {
  // const tasksIds: UniqueIdentifier[] = [];

  // columns.forEach((column) => {
  //   column.tasks.forEach((task) => {
  //     tasksIds.push(task._id);
  //   });
  // });
  return (
    <div className="col-span-1">
      <div className=" min-h-[300px] h-fit bg-gray-200 p-2">
        <h2 className="bg-white mb-3">{column.status}</h2>
        <SortableContext items={column.tasks.map((task) => task._id)}>
          <div className="flex flex-col gap-2">
            {column.tasks.map((item) => (
              <Task key={item._id} task={item} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
