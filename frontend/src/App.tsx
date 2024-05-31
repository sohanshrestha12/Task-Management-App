import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthProvider } from "./components/Auth/ProtectedRoutes";
import RequireAuth from "./components/Auth/RequireAuth";
import View from "./components/View";
import Login from "./pages/Login";
import OtpVerification from "./pages/OtpVerification";
import Register from "./pages/Register";
import Assigned from "./pages/Assigned";
import { TaskProvider } from "./components/context/taskContext";
const App = () => {
  console.log("hello world from app");
  return (
    <AuthProvider>
      <TaskProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<View />} />
            <Route path="assigned" element={<Assigned />}></Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="otpVerification/:id" element={<OtpVerification />} />
        </Routes>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
