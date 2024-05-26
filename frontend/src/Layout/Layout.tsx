import { useAuth } from "@/components/Auth/ProtectedRoutes";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { user } = useAuth();
  useEffect(()=>{
    console.log(user);
  },[user]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
