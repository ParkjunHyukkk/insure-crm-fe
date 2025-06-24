import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const DashboardTabs = () => {
  return (
    <>
      <TabsList className="grid w-full grid-cols-3 max-w-md">
        <TabsTrigger value="dashboard">대시보드</TabsTrigger>
        <TabsTrigger value="customers">고객 관리</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
    </>
  );
};

export default DashboardTabs;
