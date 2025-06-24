"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Bell,
  TrendingUp,
  Phone,
  MessageSquare,
  AlertCircle,
  Clock,
  Gift,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CustomerManagement } from "@/components/customer-management";
import { SettingsPage } from "@/components/settings-page";
import { CustomerDetailModal } from "@/components/customer-detail-modal";
import { Button } from "@/components/ui/button";
import { sampleCustomers, todayTasks } from "@/app/data";
import SigninPage from "../(auth)/signin/page";
import DashboardTabs from "./_components/DashboardTabs";
import KPICards from "./_components/KPICards";
import TodoList from "./_components/TodoList";
import NotificationList from "./_components/NotificationList";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [notifications, setNotifications] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  // 실시간 알림 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `새로운 알림: ${
          Math.random() > 0.5 ? "상령일" : "생일"
        } 알림이 추가되었습니다.`,
        time: new Date().toLocaleTimeString(),
        type: Math.random() > 0.5 ? "renewal" : "birthday",
      };
      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]);
    }, 30000); // 30초마다 새 알림

    return () => clearInterval(interval);
  }, []);

  const kpiData = {
    totalCustomers: customers.length,
    retentionRate: 94.2,
    upcomingRenewals: 12,
    pendingAlerts: todayTasks.length,
  };

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser("");
    setActiveTab("dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <SigninPage onLogin={handleLogin} />
      ) : (
        <>
          {/* 메인 컨텐츠 */}
          <main className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <DashboardTabs />

              {/* 대시보드 탭 */}
              <TabsContent value="dashboard" className="space-y-6">
                {/* KPI 카드 */}
                <KPICards kpiData={kpiData} />

                {/* 오늘 할 일 리스트 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TodoList />

                  {/* 실시간 알림 스트림 */}
                  <NotificationList notifications={notifications ?? []} />
                </div>

                {/* 고객 통계 시각화 */}
                <Card>
                  <CardHeader>
                    <CardTitle>고객 통계</CardTitle>
                    <CardDescription>상품별 분포 및 주요 지표</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-medium">상품별 분포</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">종신보험</span>
                            <span className="text-sm font-medium">40%</span>
                          </div>
                          <Progress value={40} />
                          <div className="flex justify-between">
                            <span className="text-sm">건강보험</span>
                            <span className="text-sm font-medium">35%</span>
                          </div>
                          <Progress value={35} />
                          <div className="flex justify-between">
                            <span className="text-sm">연금보험</span>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                          <Progress value={25} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">연령대 분포</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">20-30대</span>
                            <span className="text-sm font-medium">30%</span>
                          </div>
                          <Progress value={30} />
                          <div className="flex justify-between">
                            <span className="text-sm">40-50대</span>
                            <span className="text-sm font-medium">50%</span>
                          </div>
                          <Progress value={50} />
                          <div className="flex justify-between">
                            <span className="text-sm">60대 이상</span>
                            <span className="text-sm font-medium">20%</span>
                          </div>
                          <Progress value={20} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">납입 방식</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">자동이체</span>
                            <span className="text-sm font-medium">70%</span>
                          </div>
                          <Progress value={70} />
                          <div className="flex justify-between">
                            <span className="text-sm">카드결제</span>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                          <Progress value={25} />
                          <div className="flex justify-between">
                            <span className="text-sm">기타</span>
                            <span className="text-sm font-medium">5%</span>
                          </div>
                          <Progress value={5} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 고객 관리 탭 */}
              <TabsContent value="customers">
                <CustomerManagement
                  customers={customers}
                  setCustomers={setCustomers}
                  onCustomerSelect={setSelectedCustomer}
                />
              </TabsContent>

              {/* 설정 탭 */}
              <TabsContent value="settings">
                <SettingsPage />
              </TabsContent>
            </Tabs>
          </main>

          {/* 고객 상세 모달 */}
          {selectedCustomer && (
            <CustomerDetailModal
              customer={selectedCustomer}
              onClose={() => setSelectedCustomer(null)}
            />
          )}
        </>
      )}
    </div>
  );
}
