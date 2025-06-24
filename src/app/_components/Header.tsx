import React from "react";
import { todayTasks } from "../data";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">보험 설계사 CRM</h1>
          <p className="text-gray-600">고객 관리 대시보드</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            알림 {todayTasks.length}
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {/* {currentUser.charAt(0).toUpperCase()} */}
            </div>
            {/* <span className="text-sm font-medium">{currentUser}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              로그아웃
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
