import * as Yup from 'yup';

export const TaskValidation = Yup.object().shape({
  assignee: Yup.array().min(1, "Assignee is required"),
  description: Yup.string().required("Please write task description"),
  priority: Yup.string().required("Please select priority"),
  status: Yup.string().required("Please select status"),
  title: Yup.string().min(3).required("Title is required"),
  tags: Yup.array().min(1, "Tag is required"),
  dueDate: Yup.string().required("Due Date is required"),
});
export const UpdateValidation = Yup.object().shape({
  assignee: Yup.array().min(1,"Assignee is required"),
  description: Yup.string().required("Please write task description"),
  priority: Yup.string().required("Please select priority"),
  status: Yup.string().required("Please select status"),
  title: Yup.string().min(3).required("Title is required"),
  tags: Yup.array().min(1,"Tag is required"),
  dueDate: Yup.string().required("Due Date is required"),
});