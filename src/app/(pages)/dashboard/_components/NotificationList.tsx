import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";
import React from "react";

// 타입 정의 추가
interface NotificationListProps {
  notifications: Array<{
    id: number;
    message: string;
    time: string;
    type: string;
  }>;
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          실시간 알림
        </CardTitle>
        <CardDescription>최근 발생한 알림 이벤트</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            새로운 알림이 없습니다.
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-3 p-2 border-l-2 border-blue-500 bg-blue-50 rounded"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationList;
