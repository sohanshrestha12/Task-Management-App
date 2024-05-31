import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[220px] rounded h-[98vh] col-span-1 fixed top-[95px] left-0 px-4 py-5 bg-white">
      <h1 className="py-2 p-6 font-bold text-xl text-green-500 mb-5">
        Grid View
      </h1>
      <ul className="flex gap-4 flex-col">
        <li className="w-full">
          <NavLink
            className="px-6 block w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/"
          >
            All Tasks
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            className="px-6 block w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/assigned"
          >
            Assigned
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            className="px-6 block w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/todo"
          >
            Todo
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            className="px-6 block w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/inProgress"
          >
            Inprogress
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            className="px-6 block w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/testing"
          >
            Testing
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            className="px-6 block w-full py-2 rounded-full text-gray-500 font-semibold hover:text-black hover:bg-gray-300"
            to="/completed"
          >
            Completed
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar
