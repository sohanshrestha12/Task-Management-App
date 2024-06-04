/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { NavLink } from "react-router-dom";
import { useTasks } from "./context/taskContext";
import { useAuth } from "./Auth/ProtectedRoutes";

const SideBar = () => {
  const { tasks,assigned,assigner } =
    useTasks();
  const {user} = useAuth();
   if (!user?._id) {
     return <div>Loading...</div>; 
   }
const todoTask = tasks.filter(
  (task) =>
    task.status === "TODO" &&
    task.assignee &&
    task.assignee.some((taskAssignee) => taskAssignee._id === user._id)
);

const inProgressTask = tasks.filter(
  (task) =>
    task.status === "INPROGRESS" &&
    task.assignee &&
    task.assignee.some((taskAssignee) => taskAssignee._id === user._id)
);

const testingTask = tasks.filter(
  (task) =>
    task.status === "TESTING" &&
    task.assignee &&
    task.assignee.some((taskAssignee) => taskAssignee._id === user._id)
);

const completedTask = tasks.filter(
  (task) =>
    task.status === "COMPLETED" &&
    task.assignee &&
    task.assignee.some((taskAssignee) => taskAssignee._id === user._id)
);
  return (
    <div className="w-[220px] rounded h-[98vh] col-span-1 fixed top-[95px] left-0 px-4 py-5 bg-white">
      <ul className="flex gap-4 flex-col py-12">
        <li className="w-full">
          <NavLink
            className="px-6 block w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/"
          >
            All Tasks
          </NavLink>
        </li>
        <li className="w-full flex">
          <NavLink
            className="flex px-6 justify-between w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/assigned"
          >
            Assigned
          <p>{assigned.length}</p>
          </NavLink>
        </li>
        <li className="w-full flex">
          <NavLink
            className="flex px-6 justify-between w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/todo"
          >
            Todo
          <p>{todoTask.length}</p>
          </NavLink>
        </li>
        <li className="w-full flex">
          <NavLink
            className="flex px-6 justify-between w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/inProgress"
          >
            Inprogress
          <p>{inProgressTask.length}</p>
          </NavLink>
        </li>
        <li className="w-full flex">
          <NavLink
            className="flex px-6 justify-between w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/testing"
          >
            Testing
          <p>{testingTask.length}</p>
          </NavLink>
        </li>
        <li className="w-full flex">
          <NavLink
            className="flex px-6 justify-between w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/completed"
          >
            Completed
          <p>{completedTask.length}</p>
          </NavLink>
        </li>
        <li className="w-full flex">
          <NavLink
            className="flex px-6 justify-between w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/createdTasks"
          >
            Created Tasks
          <p>{assigner.length}</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar
