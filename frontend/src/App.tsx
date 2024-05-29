import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import { AuthProvider } from "./components/Auth/ProtectedRoutes";
import RequireAuth from "./components/Auth/RequireAuth";
import View from "./components/View";
import Login from "./pages/Login";
import OtpVerification from "./pages/OtpVerification";
import Register from "./pages/Register";
const App = () => {
  console.log('hello world from app');
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
        >
          <Route index element={<View/>}/>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="otpVerification/:id" element={<OtpVerification />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
