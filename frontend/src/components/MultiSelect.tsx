import { User } from '@/Types/Auth';
import { tag } from '@/Types/Tag';
import { FieldProps } from 'formik';
import Select from 'react-select';

interface MultiSelectProps {
  assignee: User[];
  field:FieldProps['field'];
  setFieldValue:FieldProps['form']['setFieldValue'];
}
interface MultiSelectTagsProps {
  tags: tag[];
  field:FieldProps['field'];
  setFieldValue:FieldProps['form']['setFieldValue'];
}
export const MultiSelectAssignee = ({ assignee,field,setFieldValue }: MultiSelectProps) => {
  return <Select isMulti options={assignee.map(user=>({
    value:user._id,
    label:user.username,
    key:user._id
  }))} 
  onChange={(selectedOption)=>setFieldValue(field.name,selectedOption.map(option=>option.value))}
  />;
};
export const MultiSelectTags = ({
  tags,
  field,
  setFieldValue,
}: MultiSelectTagsProps) => {
  return (
    <Select
      isMulti
      options={tags.map((tag) => ({
        value: tag._id,
        label: tag.title,
        key: tag._id,
      }))}
      onChange={(selectedOption) =>
        setFieldValue(
          field.name,
          selectedOption.map((option) => option.value)
        )
      }
    />
  );
};

