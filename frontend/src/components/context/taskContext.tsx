import { getAllTasks } from "@/api/Task";
import moment from "moment";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Task } from "../GridView/columns";

interface TaskContextValue {
  tasks: Task[];
  updateTasks: (newTasks: Task) => void;
  deleteTasks: (remainingTasks: Task[]) => void;
  createTask: (newTasks: Task[]) => void;
}
const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  updateTasks: () => {},
  deleteTasks: () => {},
  createTask: () => {},
});

interface TaskProviderProps {
  children: ReactNode;
}

// Create context provider
export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getAllTasks();
        const formattedTasks = res.data.data.map((task: Task) => ({
          ...task,
          dueDate: moment(task.dueDate).calendar(),
        }));
        setTasks(formattedTasks);
        console.log("context", res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const updateTasks = (updatedTask: Task) => {
    console.log('the recived task is:',updatedTask);
    updatedTask.dueDate = moment(updatedTask.dueDate).calendar();
    const updatedTasks = tasks.map((task) => {
      if (task._id === updatedTask._id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTasks = (remainingTask: Task[]) => {
    setTasks(remainingTask);
  };

  const createTask = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  

  return (
    <TaskContext.Provider
      value={{ tasks, updateTasks, deleteTasks, createTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to consume context
// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => useContext(TaskContext);
