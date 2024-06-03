import { useTasks } from "@/components/context/taskContext";
import { columns } from "./column";
import { DataTable } from "./data-table";

const CreatedTasks = () => {
  const {assigner,updateTasks} = useTasks();
  console.log('created tasks',assigner);
  return (
    <div className="px-12 mt-[95px] py-14 ml-1 w-[82vw] col-span-12 col-start-3 rounded border border-white overflow-x-hidden bg-white">
      <h1 className="mb-5">Assigned Tasks</h1>
      <DataTable columns={columns(updateTasks)} data={assigner} />
    </div>
  );
}

export default CreatedTasks
