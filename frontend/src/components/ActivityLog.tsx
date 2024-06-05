import { getUserActivityLogs } from "@/api/ActivityLogs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import ActivityLogLists from "./ActivityLogLists";
import { useTasks } from "./context/taskContext";
interface ActivityLogsProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ActivityLogType {
  action: string;
  userId: { _id: string; username: string };
  _id: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function ActivityLog({ isOpen, onClose }: ActivityLogsProps) {
  const [activityLogs, setActivityLogs] = useState<ActivityLogType[]>([]);
  const { tasks } = useTasks();
  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const res = await getUserActivityLogs();
        // setActivityLogs(res.data.data.)
        setActivityLogs(res.data.data);
        console.log("this is activity logs details", res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserLogs();
  }, [tasks]);
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="bg-white overflow-scroll">
        <SheetHeader>
          <SheetTitle>Activity Logs</SheetTitle>
          <SheetDescription className="pb-3">
            View the previous activities from this account.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-1">
          {activityLogs.length <= 0
            ? "No activity recently"
            : activityLogs.map((activity) => (
                <ActivityLogLists key={activity._id} activityLogs={activity} />
              ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
