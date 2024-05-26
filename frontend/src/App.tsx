import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthProvider } from "./components/Auth/ProtectedRoutes";
import Login from "./pages/Login";
import OtpVerification from "./pages/OtpVerification";
import Register from "./pages/Register";
import RequireAuth from "./components/Auth/RequireAuth";
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        ></Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="otpVerification/:id" element={<OtpVerification />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
