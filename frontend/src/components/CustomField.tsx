import { ErrorMessage, Field, FieldProps } from "formik"
import { Input } from "./ui/input"

interface CustomFieldProps{
    label?:string,
    name:string,
    type:string,
    placeholder?:string,
    disabled?:boolean
}
const CustomField = ({label,name,type,placeholder,disabled}:CustomFieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <Input type={type} placeholder={placeholder} {...field} disabled={disabled}></Input>
        )}
      </Field>
      <div className="text-red-500 -mt-2 text-sm">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}

export default CustomField
