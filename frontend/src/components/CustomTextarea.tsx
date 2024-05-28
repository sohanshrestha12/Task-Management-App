import { ErrorMessage, Field, FieldProps } from "formik";
import { Textarea } from "./ui/textarea";

interface CustomTextareaProps {
  label: string;
  name: string;
  placeholder: string;
}
const CustomTextarea = ({ label, name, placeholder }:CustomTextareaProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field }: FieldProps) => (
        //   <Input type={type} placeholder={placeholder} {...field}></Input>
          <Textarea placeholder={placeholder} {...field} style={{resize:"none"}} />
        )}
      </Field>
      <div className="text-red-500 -mt-2">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default CustomTextarea;
