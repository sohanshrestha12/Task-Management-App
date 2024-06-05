import { useTasks } from "@/components/context/taskContext";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { useColor } from "@/components/context/colorContext";

const Assigned = () => {
  const {assigned,updateTasks} = useTasks();
  const {colors} = useColor();
  console.log(assigned);
  return (
    <div className="px-12 mt-[95px] py-14 ml-1 w-[82vw] col-span-12 col-start-3 rounded border border-white overflow-x-hidden bg-white">
      <h1 className="mb-5">Assigned Tasks</h1>
      <DataTable columns={columns(updateTasks,colors)} data={assigned} />
    </div>
  );
}

export default Assigned
