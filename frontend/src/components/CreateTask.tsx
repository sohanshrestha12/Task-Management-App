import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { User } from "@/Types/Auth";
import { tag } from "@/Types/Tag";
import { TaskValidation } from "@/Validation/TaskValidation";
import { getAllTags } from "@/api/Tag";
import { createTask, getAllAssignee } from "@/api/Task";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import CustomField from "./CustomField";
import CustomTextarea from "./CustomTextarea";
import { DatePickerDemo } from "./DatePicker";
import { Task } from "./GridView/columns";
import { MultiSelectAssignee, MultiSelectTags } from "./MultiSelect";
import { Button } from "./ui/button";

interface CreateTask {
  assignee: User[];
  description: string;
  priority: string;
  status: string;
  title: string;
  dueDate: string;
  tags: tag[];
}

const initialValue = {
  assignee: [],
  description: "",
  priority: "",
  status: "",
  title: "",
  tags: [],
  dueDate: "",
};

interface CreateTaskProps {
  setNewTask: (newTask: Task) => void;
}

const CreateTask = ({ setNewTask }: CreateTaskProps) => {
  const [assignee, setAssignee] = useState([]);
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const [tag, setTags] = useState([]);

  const handleSubmit = async (values: CreateTask) => {
    try {
      console.log("Create Form value:", values);
      const newTask = await createTask(values);
      console.log("Created Task", newTask.data.data);
      setNewTask(newTask.data.data);
      toast.success("Task created Successfully");
      if (sheetCloseRef.current) {
        sheetCloseRef.current.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAllAssignee = async () => {
      try {
        const response = await getAllAssignee();
        setAssignee(response.data.data);
        console.log("AllAssignee", response);
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
        console.log("All tags", response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTags();
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="p-2 flex gap-2 flex-row-reverse justify-center items-center text-[20px] bg-green-500 text-white rounded-md">
        <IoMdAddCircleOutline />
        <p className="text-[16px]">Create Task</p>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetClose ref={sheetCloseRef} className="hidden">
          close
        </SheetClose>
        <SheetHeader>
          <SheetTitle>Create Task</SheetTitle>
          <SheetDescription>
            You can create a new task and assign to assignee.
          </SheetDescription>
        </SheetHeader>
        <div>
          <Formik
            initialValues={initialValue}
            onSubmit={handleSubmit}
            validationSchema={TaskValidation}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="mt-6">
                  <CustomField
                    name="title"
                    label="Title"
                    placeholder="Title"
                    type="Text"
                  />
                  <div className="mt-4">
                    <CustomTextarea
                      name="description"
                      label="Description"
                      placeholder="Description"
                    />
                  </div>
                  <div className="mt-4 flex gap-5">
                    <div className="flex flex-col">
                      <label className="mb-2">Priority</label>
                      <Field name="priority">
                        {({ field }: FieldProps) => (
                          <Select
                            onValueChange={(value) =>
                              setFieldValue(field.name, value)
                            }
                          >
                            <SelectTrigger className="w-[150px]">
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
                    <div className="flex flex-col">
                      <label className="mb-2">Status</label>
                      <Field name="status">
                        {({ field }: FieldProps) => (
                          <Select
                            onValueChange={(value) =>
                              setFieldValue(field.name, value)
                            }
                          >
                            <SelectTrigger className="w-[150px]">
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
                          field={field}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    </Field>
                    <div className="text-red-500 text-sm mt-2">
                      <ErrorMessage name="tags" />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col">
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
                  <div className="flex justify-end mt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant={"green"}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTask;
