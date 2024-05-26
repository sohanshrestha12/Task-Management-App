import { LoginUser } from "@/Types/Auth";
import { getCurrentUser, login } from "@/api/Auth";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import CustomField from "@/components/CustomField";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {loginValidation} from '@/Validation/LoginValidation'
const initialValues = {
  email: "",
  password: "",
};

  const Login = () => {
    const auth= useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
      if(auth.user){
        navigate('/');
      }
    },[auth.user]);
    
    const handleSubmit = async (values: LoginUser) => {
      try {
        const response = await login(values);
        if(response){
           const userResponse = await getCurrentUser();
           auth.login(userResponse.data.data);
        }
        navigate("/",{replace:true});
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <>
      {/* old login */}
      {/* <div className="min-w-screen min-h-screen flex justify-center items-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center">Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  <div>
                    <CustomField
                      name="email"
                      label="Email"
                      placeholder="Email"
                      type="Text"
                    />
                  </div>
                  <div>
                    <CustomField
                      name="password"
                      label="Password"
                      placeholder="Password"
                      type="password"
                    />
                  </div>
                  <div className="self-end">
                    <Button type="submit" disabled={isSubmitting}>
                      Log in
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div> */}

      {/* new login */}
      <div className=" flex flex-col justify-center items-center min-h-screen">
        {/* {errorMessage && (
            <div className="w-[450px]">
              <ErrorAlert message={errorMessage} />
            </div>
          )} */}
        <div className="flex justify-center bg-white rounded-2xl w-2/3 max-w-4xl">
          <div className="w-3/5 p-8 flex flex-col">
            <div className="text-left font-bold">
              <span className="text-green-500">Task Management</span> App
            </div>
            <div className="py-16 text-center">
              <h2 className="text-3xl font-bold text-green-500">
                Log in to your Account{" "}
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="text-start">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={loginValidation}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">
                      <div>
                        <CustomField
                          name="email"
                          label="Email"
                          placeholder="Email"
                          type="Text"
                        />
                      </div>
                      <div>
                        <CustomField
                          name="password"
                          label="Password"
                          placeholder="Password"
                          type="password"
                        />
                      </div>
                      <div className="self-end">
                        <Button
                          variant={"green"}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Log In
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col justify-center items-center bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friends!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="text-center mb-10">
              Fill up your personal information and start journey with us.
            </p>
            <Link
              to="/register"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
