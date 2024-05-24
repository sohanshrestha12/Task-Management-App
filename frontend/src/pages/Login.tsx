import { LoginUser } from "@/Types/Auth";
import { login } from "@/api/Auth";
import CustomField from "@/components/CustomField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async(values: LoginUser) => {
    try {
      const response = await login(values);
      navigate('/');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
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
    </div>
  );
};

export default Login;
