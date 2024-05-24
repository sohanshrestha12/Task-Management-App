import { RegisterUser } from "@/Types/Auth";
import { registerUser } from "@/api/Auth";
import CustomField from "@/components/CustomField";
import ErrorAlert from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
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
      <div className="min-w-screen min-h-screen flex flex-col gap-2 justify-center items-center">
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
      </div>
    </>
  );
};

export default Register;
