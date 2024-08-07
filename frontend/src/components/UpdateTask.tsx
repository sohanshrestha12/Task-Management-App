import { UpdateValidation } from "@/Validation/TaskValidation";
import { getAllTags } from "@/api/Tag";
import { getAllAssignee, updateTask } from "@/api/Task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CustomField from "./CustomField";
import CustomTextarea from "./CustomTextarea";
import { DatePickerDemo } from "./DatePicker";
import { Task } from "./GridView/columns";
import { MultiSelectAssignee, MultiSelectTags } from "./MultiSelect";
import { useTasks } from "./context/taskContext";
import { Button } from "./ui/button";

interface ViewTaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}
export interface FormValues {
  _id: string;
  title: string;
  assignee: [{_id?:string,username:string}];
  description: string;
  priority: string;
  status: string;
  tags: { _id: string; title: string }[];
  dueDate: string;
}

const convertRelativeDate = (dateString: string) => {
  const currentDate = moment();

  if (dateString.toLowerCase().includes("yesterday")) {
    return currentDate.subtract(1, "day").startOf("day").toDate();
  } else if (dateString.toLowerCase().includes("tomorrow")) {
    return currentDate.add(1, "day").startOf("day").toDate();
  } else if (dateString.toLowerCase().includes("friday")) {
    const daysToAdd =
      currentDate.day() === 5 ? 7 : (5 - currentDate.day() + 7) % 7;
    return currentDate.add(daysToAdd, "days").startOf("day").toDate();
  } else if (dateString.toLowerCase().includes("last thursday")) {
    const formattedDate = currentDate
      .subtract(1, "weeks")
      .startOf("week")
      .day("Thursday")
      .toDate();
    return moment(formattedDate).startOf("day").toDate();
  } else if (dateString.toLowerCase().includes("last")) {
    const dayOfWeek = dateString.toLowerCase().split(" ")[1];
    const daysToAdd =
      currentDate.day() === moment().day(dayOfWeek).day()
        ? 7
        : (currentDate.day() - moment().day(dayOfWeek).day() + 7) % 7;
    return currentDate.subtract(daysToAdd, "days").startOf("day").toDate();
  } else {
    return dateString;
  }
};

const UpdateTask: React.FC<ViewTaskDetailsProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  // const dueDate = moment(task.dueDate, "YYYY-MM-DD").toDate();

  const formatDate = convertRelativeDate(task.dueDate);
  const dueDateISO = moment(formatDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const initialValues: FormValues = {
    _id: task._id,
    title: task.title,
    assignee:task.assignee ? task.assignee : [{ _id: '', username: '' }],
    description: task.description,
    priority: task.priority,
    status: task.status,
    tags: task.tags?task.tags:[{_id:"",title:''}],
    dueDate: dueDateISO,
  };
  const [assignee, setAssignee] = useState([]);
  const [tag, setTags] = useState([]);
  const { updateTasks } = useTasks();

  useEffect(() => {
    const fetchAllAssignee = async () => {
      try {
        const response = await getAllAssignee();
        setAssignee(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAssignee();
  }, []);
  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const response = await getAllTags();
        setTags(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTags();
  }, []);

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await updateTask(values, task._id);
      updateTasks(res.data.data);
      if (dialogCloseRef.current) {
        dialogCloseRef.current.click();
      }
      toast.success("Updated Successfully");
      console.log('Update data is: ',res);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="bg-white pb-0 h-[80vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>

          <DialogDescription>
            <div className="mt-4">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={UpdateValidation}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form className="text-black">
                    <CustomField name="_id" type="hidden" />
                    <div>
                      <CustomField
                        name={"title"}
                        label="Title"
                        placeholder="Title"
                        type="text"
                      />
                    </div>
                    <div>
                      <CustomTextarea
                        name={"description"}
                        label="Description"
                        placeholder="Description"
                      />
                    </div>
                    <div className="mt-4 flex gap-5">
                      <div className="flex flex-col flex-1">
                        <label className="mb-2">Priority</label>
                        <Field name="priority">
                          {({ field }: FieldProps) => (
                            <Select
                              onValueChange={(value) =>
                                setFieldValue(field.name, value)
                              }
                              defaultValue={initialValues.priority}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select-Priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="LOW">Low</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HIGH">High</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </Field>
                        <div className="text-red-500 text-sm mt-2">
                          <ErrorMessage name="priority" />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <label className="mb-2">Status</label>
                        <Field name="status">
                          {({ field }: FieldProps) => (
                            <Select
                              onValueChange={(value) =>
                                setFieldValue(field.name, value)
                              }
                              defaultValue={initialValues.status}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select-Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="TODO">Todo</SelectItem>
                                <SelectItem value="INPROGRESS">
                                  In progress
                                </SelectItem>
                                <SelectItem value="TESTING">Testing</SelectItem>
                                <SelectItem value="COMPLETED">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </Field>
                        <div className="text-red-500 text-sm mt-2">
                          <ErrorMessage name="status" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="mb-2">Assignee</label>
                      {/* <Field name="assignee">
                        {({ field }: FieldProps) => (
                          <Select
                            onValueChange={(value) =>
                              setFieldValue(field.name, value)
                            }
                            defaultValue={initialValues.assignee[0]._id}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select-Assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              {assignee &&
                                assignee.map((data: User) => (
                                  <SelectItem value={data._id}>
                                    {data.username}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        )}
                      </Field> */}
                      <Field name="assignee">
                        {({ field }: FieldProps) => (
                          <MultiSelectAssignee
                            assignee={assignee}
                            defaultValue={initialValues.assignee.map(
                              (assignee) => ({
                                value: assignee?._id || "",
                                label: assignee.username || "",
                                key: assignee._id || "",
                              })
                            )}
                            field={field}
                            setFieldValue={setFieldValue}
                          />
                        )}
                      </Field>
                      <div className="text-red-500 text-sm mt-2">
                        <ErrorMessage name="assignee" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="mb-2">Tag</label>
                      {/* <Field name="tags">
                        {({ field }: FieldProps) => (
                          <Select
                            defaultValue={initialValues.tags[0]._id}
                            onValueChange={(value) =>
                              setFieldValue(field.name, value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select-Tags" />
                            </SelectTrigger>
                            <SelectContent>
                              {tag &&
                                tag.map((data: tag) => (
                                  <SelectItem value={data._id}>
                                    {data.title}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        )}
                      </Field> */}
                      <Field name="tags">
                        {({ field }: FieldProps) => (
                          <MultiSelectTags
                            tags={tag}
                            defaultValue={initialValues.tags.map(
                              (tag) => ({
                                value: tag?._id || "",
                                label: tag.title || "",
                                key: tag._id || "",
                              })
                            )}
                            field={field}
                            setFieldValue={setFieldValue}
                          />
                        )}
                      </Field>
                      <div className="text-red-500 text-sm mt-2">
                        <ErrorMessage name="tags" />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col ">
                      <label className="mb-2">Due Date</label>
                      <Field name="dueDate">
                        {({ field }: FieldProps) => (
                          <DatePickerDemo
                            selectedDate={field.value}
                            onChange={(date) =>
                              setFieldValue(field.name, date?.toISOString())
                            }
                          />
                        )}
                      </Field>
                      <div className="text-red-500 text-sm mt-2">
                        <ErrorMessage name="dueDate" />
                      </div>
                    </div>
                    <div className="flex justify-end sticky bottom-0 py-4 bg-white mt-4 gap-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant={"green"}
                      >
                        Update
                      </Button>
                      <DialogClose asChild>
                        <Button
                          ref={dialogCloseRef}
                          type="button"
                          variant="secondary"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTask;
