import moment from 'moment';
import CreateTask from "../CreateTask";
import { useTasks } from "../context/taskContext";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";

const Page = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const {tasks,deleteTasks,createTask}=useTasks();
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

  const setNewTask = (newTask:Task) =>{
    const formattedDueDate = moment(newTask.dueDate).calendar();
    const formattedNewTask:Task = {...newTask,dueDate:formattedDueDate};
    createTask([formattedNewTask,...tasks]);
  }
  return (
    <div className="px-12 py-14 w-[98vw] overflow-x-hidden">
      <div className="flex justify-between">
        <h1>All Tasks</h1>
        <CreateTask setNewTask={setNewTask} />
      </div>
      <DataTable
        columns={columns}
        data={tasks}
        onDelete={deleteTasksAndUpdateList}
      />
    </div>
  );
};

export default Page;
