import {
    Card,
    CardContent
} from "@/components/ui/card";
import moment from "moment";
import { ActivityLogType } from "./ActivityLog";

const ActivityLogLists = ({ activityLogs }: {activityLogs: ActivityLogType}) => {
  return (
    <Card>
      <CardContent className="p-2">
        <div className="flex flex-col w-full p-4">
          <span className="text-sm inline">
            {activityLogs.action} by {activityLogs.userId.username}
          </span>
          <p className="font-medium capitalize py-1">{activityLogs.title}</p>
          <p className="text-sm">{moment(activityLogs.createdAt).fromNow()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLogLists
