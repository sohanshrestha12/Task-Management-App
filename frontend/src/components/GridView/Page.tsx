import moment from "moment";
import CreateTask from "../CreateTask";
import { useTasks } from "../context/taskContext";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";

interface PageProps {
  colors:{[key:string]:string}
}

const Page = ({colors}:PageProps) => {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const { tasks, deleteTasks, createTask } = useTasks();
  const deleteTasksAndUpdateList = async (selectedRows: Task[]) => {
    try {
      // Perform deletion of selected tasks from the list
      const remainingTasks = tasks.filter(
        (task) => !selectedRows.includes(task)
      );
      deleteTasks(remainingTasks);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const fetchTask = async () => {
  //     try {
  //       const res = await getAllTasks();
  //       const formattedDateTask = res.data.data.map((task:Task)=>({
  //         ...task,
  //         dueDate:moment(task.dueDate).calendar()
  //       }))
  //       setTasks(formattedDateTask);
  //       console.log("dataTable", res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchTask();

  // }, []);

  const setNewTask = (newTask: Task) => {
    console.log("new task from create Task", newTask);
    const formattedDueDate = moment(newTask.dueDate).calendar();
    const formattedNewTask: Task = { ...newTask, dueDate: formattedDueDate };
    createTask([formattedNewTask, ...tasks]);
  };
  return (
    <div className="px-12 mt-[10px] py-5 ml-1 w-[82vw] col-span-12 col-start-3 rounded border border-white overflow-x-hidden bg-white">
      <h1 className="py-2 font-bold text-xl mb-5">
        Grid View
      </h1>
      <div className="flex justify-between">
        <h1>All Tasks</h1>
        <CreateTask setNewTask={setNewTask} />
      </div>
      <DataTable
        columns={columns(colors)}
        data={tasks}
        onDelete={deleteTasksAndUpdateList}
      />
    </div>
  );
};

export default Page;
