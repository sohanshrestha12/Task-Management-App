import { User } from '@/Types/Auth';
import { tag } from '@/Types/Tag';
import { FieldProps } from 'formik';
import Select from 'react-select';

interface MultiSelectProps {
  assignee: User[];
  field: FieldProps["field"];
  setFieldValue: FieldProps["form"]["setFieldValue"];
  defaultValue?:{ value: string; label: string; key: string }[];
}
interface MultiSelectTagsProps {
  tags: tag[];
  field: FieldProps["field"];
  setFieldValue: FieldProps["form"]["setFieldValue"];
  defaultValue?: { value: string; label: string; key: string }[];
}
export const MultiSelectAssignee = ({ assignee,field,setFieldValue,defaultValue }: MultiSelectProps) => {
  return <Select isMulti options={assignee.map(user=>({
    value:user._id,
    label:user.username,
    key:user._id
  }))} 
  defaultValue={defaultValue?defaultValue:[]}
  onChange={(selectedOption)=>setFieldValue(field.name,selectedOption.map(option=>option.value))}
  />;
};
export const MultiSelectTags = ({
  tags,
  field,
  setFieldValue,
  defaultValue,
}: MultiSelectTagsProps) => {
  return (
    <Select
      isMulti
      options={tags.map((tag) => ({
        value: tag._id,
        label: tag.title,
        key: tag._id,
      }))}
      defaultValue={defaultValue ? defaultValue : []}
      onChange={(selectedOption) =>
        setFieldValue(
          field.name,
          selectedOption.map((option) => option.value)
        )
      }
    />
  );
};

