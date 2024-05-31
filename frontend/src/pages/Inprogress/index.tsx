import { useTasks } from "@/components/context/taskContext";
import { DataTable } from "./data-table";
import { columns } from "./column";

const InProgress = () => {
  const { inProgressTask } = useTasks();
  return (
    <div className="px-12 mt-[95px] py-14 ml-1 w-[82vw] col-span-12 col-start-3 rounded border border-white overflow-x-hidden bg-white">
      <h1 className="mb-5">In Progress Tasks</h1>
      <DataTable columns={columns} data={inProgressTask} />
    </div>
  );
  
}

export default InProgress
