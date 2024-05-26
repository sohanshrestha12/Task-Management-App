/* eslint-disable react-hooks/exhaustive-deps */
import { resendOtp, verifyUser } from "@/api/Auth";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import ErrorAlert from "@/components/ErrorAlert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user]);
  const [errorMessage, setErrorMessage] = useState();
  const { id } = useParams();
  const [value, setValue] = useState("");

  const handleResendOtp = async () => {
    try {
      if (!id) console.log("No id");
      else {
        const response = await resendOtp(id);
        console.log(response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!id) console.log("No id");
      else {
        const response = await verifyUser(id, value);
        console.log(response);
        navigate("/login");
      }
    } catch (error) {
      setValue("");
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen min-width-screen flex flex-col gap-2 justify-center items-center">
        {errorMessage && (
          <div className="w-[450px]">
            <ErrorAlert message={errorMessage} />
          </div>
        )}
        <Card className="w-[450px]">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="mb-5">
              <span className="text-green-500 font-bold text-3xl"> Verify your otp</span>
            </CardTitle>
            <CardDescription className="text-center">
              We have sent you an otp code to verify its you. Please check your
              inbox and paste the code here.
            </CardDescription>
          </CardHeader>
          <CardContent className="my-20 flex justify-center">
            <Formik initialValues={{}} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-10">
                  <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot className="h-[45px]" index={0} />
                      <InputOTPSlot className="h-[45px]" index={1} />
                      <InputOTPSlot className="h-[45px]" index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot className="h-[45px]" index={3} />
                      <InputOTPSlot className="h-[45px]" index={4} />
                      <InputOTPSlot className="h-[45px]" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <Button variant={'green'}
                    type="submit"
                    disabled={value.length < 6 || isSubmitting}
                  >
                    Verify
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
          <CardFooter className="flex justify-end">
            <p
              className="hover:cursor-pointer text-blue-600 hover:font-[500]"
              onClick={handleResendOtp}
            >
              Resend otp code
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default OtpVerification;
