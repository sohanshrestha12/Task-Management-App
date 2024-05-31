import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import "../App.css";
import SideBar from "@/components/SideBar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12">
        <SideBar></SideBar>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
