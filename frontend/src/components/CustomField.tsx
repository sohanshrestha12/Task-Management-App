import { Field, FieldProps } from "formik"
import { Input } from "./ui/input"

interface CustomFieldProps{
    label:string,
    name:string,
    type:string,
    placeholder:string
}
const CustomField = ({label,name,type,placeholder}:CustomFieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name}>{label}</label>
      <Field name={name}> 
        {({field}:FieldProps)=>(
            <Input type={type} placeholder={placeholder} {...field}></Input>
        )}
      </Field>
    </div>
  )
}

export default CustomField
