import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./ProtectedRoutes";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({children}:RequireAuthProps) => {
    const auth = useAuth();
    if(!auth.user){
        return <Navigate to='login'/>
    }
  return (
    children
  )
}

export default RequireAuth
