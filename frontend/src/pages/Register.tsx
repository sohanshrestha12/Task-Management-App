import { RegisterUser } from "@/Types/Auth";
import { registerUser } from "@/api/Auth";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import CustomField from "@/components/CustomField";
import ErrorAlert from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setErrorMessage("");
  }, []);
  const onSubmit = async (
    values: RegisterUser,
    { setSubmitting }: FormikHelpers<RegisterUser>
  ) => {
    try {
      const response = await registerUser(values);
      navigate(`/otpVerification/${response?.data?.data?.user?._id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.data?.email) {
          setErrorMessage(error.response?.data?.data?.email);
        } else {
          setErrorMessage(error.response?.data?.message);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      {/* old register */}
      {/* <div className="min-w-screen min-h-screen flex flex-col gap-2 justify-center items-center">
        {errorMessage && (
          <div className="w-[450px]">
            <ErrorAlert message={errorMessage} />
          </div>
        )}
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  <div>
                    <CustomField
                      name="username"
                      label="Username"
                      placeholder="Username"
                      type="text"
                    />
                  </div>
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
                      Register
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div> */}

      {/* New Register */}
      <div className=" flex flex-col justify-center items-center min-h-screen">
        {errorMessage && (
          <div className="w-[450px]">
            <ErrorAlert message={errorMessage} />
          </div>
        )}
        <div className="flex justify-center bg-white rounded-2xl w-2/3 max-w-4xl">
          <div className="w-3/5 p-8 flex flex-col">
            <div className="text-left font-bold">
              <span className="text-green-500">Task Management</span> App
            </div>
            <div className="py-16 text-center">
              <h2 className="text-3xl font-bold text-green-500">
                Sign in to Account{" "}
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="text-start">
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">
                      <div>
                        <CustomField
                          name="username"
                          label="Username"
                          placeholder="Username"
                          type="text"
                        />
                      </div>
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
                          Register
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col justify-center items-center bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="text-center mb-10">
              Enter your credentials to access your account.
            </p>
            <Link
              to="/login"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
