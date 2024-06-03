import { getAllTasks, getAssignedTask, getAssignedTodo } from "@/api/Task";
import moment from "moment";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Task } from "../GridView/columns";
import { useAuth } from "../Auth/ProtectedRoutes";

interface TaskContextValue {
  tasks: Task[];
  assigned: Task[];
  todoTask: Task[];
  testingTask: Task[];
  inProgressTask: Task[];
  CompletedTask: Task[];
  updateTasks: (newTasks: Task) => void;
  deleteTasks: (remainingTasks: Task[]) => void;
  createTask: (newTasks: Task[]) => void;
  KanbanTask:(newTasks:Task[])=>void;
  // createAssignedTask:(newTasks:Task)=>void
}
const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  assigned: [],
  todoTask: [],
  inProgressTask: [],
  testingTask: [],
  CompletedTask: [],
  updateTasks: () => {},
  deleteTasks: () => {},
  createTask: () => {},
  KanbanTask:()=>{}
  // createAssignedTask:()=>{}
});

interface TaskProviderProps {
  children: ReactNode;
}

// Create context provider
export const TaskProvider = ({ children }: TaskProviderProps) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assigned, setAssignedTask] = useState<Task[]>([]);
  const [todoTask, setTodoTask] = useState<Task[]>([]);
  const [inProgressTask, setInProgressTask] = useState<Task[]>([]);
  const [testingTask, setTestingTask] = useState<Task[]>([]);
  const [CompletedTask, setCompletedTask] = useState<Task[]>([]);

  // Fetch tasks on component mount
  useEffect(() => {
    if (user) {
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
    }
  }, [user]);

  const updateTasks = (updatedTask: Task) => {
    console.log("the recived task in updateTask context is:", updatedTask);
    updatedTask.dueDate = moment(updatedTask.dueDate).calendar();
    const updatedTasks = tasks.map((task) => {
      if (task._id === updatedTask._id) {
        return updatedTask;
      }
      return task;
    });
    console.log("updatedTask is:",updatedTasks)
    setTasks(updatedTasks);
  };

  const deleteTasks = (remainingTask: Task[]) => {
    setTasks(remainingTask);
  };

  const createTask = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const KanbanTask = (newArragedTask:Task[])=>{
    setTasks(newArragedTask);
  }

  // const createAssignedTask = (newTasks:Task)=>{
  //   console.log(user?._id);
  //   if(newTasks.assignee?.some(assignee=>assignee._id === user?._id)){
  //     setAssignedTask([...assigned,newTasks]);
  //   }
  //   return;
  // }

  useEffect(() => {
    if (user) {
      const fetchAssignedTasks = async () => {
        try {
          const assignedTasks = await getAssignedTask();
          const formattedTasks = assignedTasks.data.data.map((task: Task) => ({
            ...task,
            dueDate: moment(task.dueDate).calendar(),
          }));
          setAssignedTask(formattedTasks);
          console.log("Assigned task is", assignedTasks);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAssignedTasks();
    }
  }, [user,tasks]);

  useEffect(() => {
    if (user) {
      const fetchAssignedTodo = async () => {
        try {
          const assignedTodo = await getAssignedTodo("TODO");
          const formattedTasks = assignedTodo.data.data.map((task: Task) => ({
            ...task,
            dueDate: moment(task.dueDate).calendar(),
          }));
          setTodoTask(formattedTasks);
          console.log("Assigned Todo task is", assignedTodo);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAssignedTodo();
    }
  }, [user,tasks]);
  useEffect(() => {
    if (user) {
      const fetchAssignedInProgress = async () => {
        try {
          const assignedInProgress = await getAssignedTodo("INPROGRESS");
          const formattedTasks = assignedInProgress.data.data.map((task: Task) => ({
            ...task,
            dueDate: moment(task.dueDate).calendar(),
          }));
          setInProgressTask(formattedTasks);
          console.log("Assigned in progress task is", assignedInProgress);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAssignedInProgress();
    }
  }, [user,tasks]);

  useEffect(() => {
    if (user) {
      const fetchAssignedInProgress = async () => {
        try {
          const assignedTesting = await getAssignedTodo("TESTING");
          const formattedTasks = assignedTesting.data.data.map((task: Task) => ({
            ...task,
            dueDate: moment(task.dueDate).calendar(),
          }));
          setTestingTask(formattedTasks);
          console.log("Assigned in progress task is", assignedTesting);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAssignedInProgress();
    }
  }, [user,tasks]);

  useEffect(() => {
    if (user) {
      const fetchAssignedCompleted = async () => {
        try {
          const assignedCompleted = await getAssignedTodo("COMPLETED");
          const formattedTasks = assignedCompleted.data.data.map((task: Task) => ({
            ...task,
            dueDate: moment(task.dueDate).calendar(),
          }));
          setCompletedTask(formattedTasks);
          console.log("Assigned in progress task is", assignedCompleted);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAssignedCompleted();
    }
  }, [user,tasks]);

  return (
    <TaskContext.Provider
      value={{
        assigned,
        tasks,
        todoTask,
        inProgressTask,
        testingTask,
        CompletedTask,
        updateTasks,
        deleteTasks,
        createTask,
        KanbanTask,
        // createAssignedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to consume context
// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => useContext(TaskContext);
