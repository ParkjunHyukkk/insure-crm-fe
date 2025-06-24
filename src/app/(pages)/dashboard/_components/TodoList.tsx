import { todayTasks } from "@/app/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  Calendar,
  Clock,
  Gift,
  MessageSquare,
  Phone,
} from "lucide-react";
import React from "react";

const TodoList = () => {
  const getTaskIcon = (type) => {
    switch (type) {
      case "renewal":
        return <Calendar className="h-4 w-4" />;
      case "birthday":
        return <Gift className="h-4 w-4" />;
      case "care":
        return <MessageSquare className="h-4 w-4" />;
      case "followup":
        return <Phone className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          오늘 할 일
        </CardTitle>
        <CardDescription>우선 처리가 필요한 고객 관리 업무</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {todayTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getTaskIcon(task.type)}
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getPriorityColor(task.priority)}>
                {task.priority === "high"
                  ? "높음"
                  : task.priority === "medium"
                  ? "보통"
                  : "낮음"}
              </Badge>
              <Button size="sm" variant="outline">
                처리
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TodoList;
