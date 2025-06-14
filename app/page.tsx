"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, Bell, TrendingUp, Phone, MessageSquare, AlertCircle, Clock, Gift } from "lucide-react"
import { CustomerManagement } from "@/components/customer-management"
import { SettingsPage } from "@/components/settings-page"
import { CustomerDetailModal } from "@/components/customer-detail-modal"
import { LoginPage } from "@/components/login-page"

// 샘플 데이터
const sampleCustomers = [
  {
    id: 1,
    name: "김철수",
    phone: "010-1234-5678",
    birthDate: "1985-03-15",
    joinDate: "2023-01-15",
    renewalDate: "2024-03-15",
    product: "종신보험",
    paymentMethod: "자동이체",
    premium: 150000,
    age: 39,
    memo: "정기 상담 필요",
  },
  {
    id: 2,
    name: "이영희",
    phone: "010-9876-5432",
    birthDate: "1990-07-22",
    joinDate: "2023-06-10",
    renewalDate: "2024-07-22",
    product: "건강보험",
    paymentMethod: "카드결제",
    premium: 80000,
    age: 34,
    memo: "건강검진 결과 확인 필요",
  },
  {
    id: 3,
    name: "박민수",
    phone: "010-5555-1234",
    birthDate: "1978-11-08",
    joinDate: "2022-11-08",
    renewalDate: "2024-11-08",
    product: "연금보험",
    paymentMethod: "자동이체",
    premium: 200000,
    age: 46,
    memo: "연금 수령 상담 예정",
  },
]

const todayTasks = [
  {
    id: 1,
    type: "renewal",
    title: "김철수님 상령일 D-30",
    description: "종신보험 갱신 상담 필요",
    priority: "high",
    dueDate: "2024-02-15",
  },
  {
    id: 2,
    type: "birthday",
    title: "이영희님 생일",
    description: "생일 축하 연락",
    priority: "medium",
    dueDate: "2024-01-15",
  },
  {
    id: 3,
    type: "care",
    title: "박민수님 가입 90일 케어",
    description: "가입 후 첫 상담",
    priority: "medium",
    dueDate: "2024-01-15",
  },
  {
    id: 4,
    type: "followup",
    title: "최지은님 미응답",
    description: "3일 전 연락 후 미응답",
    priority: "low",
    dueDate: "2024-01-12",
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customers, setCustomers] = useState(sampleCustomers)
  const [notifications, setNotifications] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState("")

  // 실시간 알림 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `새로운 알림: ${Math.random() > 0.5 ? "상령일" : "생일"} 알림이 추가되었습니다.`,
        time: new Date().toLocaleTimeString(),
        type: Math.random() > 0.5 ? "renewal" : "birthday",
      }
      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
    }, 30000) // 30초마다 새 알림

    return () => clearInterval(interval)
  }, [])

  const kpiData = {
    totalCustomers: customers.length,
    retentionRate: 94.2,
    upcomingRenewals: 12,
    pendingAlerts: todayTasks.length,
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getTaskIcon = (type) => {
    switch (type) {
      case "renewal":
        return <Calendar className="h-4 w-4" />
      case "birthday":
        return <Gift className="h-4 w-4" />
      case "care":
        return <MessageSquare className="h-4 w-4" />
      case "followup":
        return <Phone className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const handleLogin = (username: string) => {
    setIsAuthenticated(true)
    setCurrentUser(username)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser("")
    setActiveTab("dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          {/* 헤더 */}
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
                    {currentUser.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{currentUser}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    로그아웃
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* 메인 컨텐츠 */}
          <main className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="dashboard">대시보드</TabsTrigger>
                <TabsTrigger value="customers">고객 관리</TabsTrigger>
                <TabsTrigger value="settings">설정</TabsTrigger>
              </TabsList>

              {/* 대시보드 탭 */}
              <TabsContent value="dashboard" className="space-y-6">
                {/* KPI 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">전체 고객 수</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.totalCustomers}</div>
                      <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">유지율</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.retentionRate}%</div>
                      <Progress value={kpiData.retentionRate} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">계약 만기 예정</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.upcomingRenewals}</div>
                      <p className="text-xs text-muted-foreground">다음 30일 내</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">알림 대기</CardTitle>
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.pendingAlerts}</div>
                      <p className="text-xs text-muted-foreground">처리 필요</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 오늘 할 일 리스트 */}
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
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {getTaskIcon(task.type)}
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getPriorityColor(task.priority)}>
                              {task.priority === "high" ? "높음" : task.priority === "medium" ? "보통" : "낮음"}
                            </Badge>
                            <Button size="sm" variant="outline">
                              처리
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* 실시간 알림 스트림 */}
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
                        <p className="text-muted-foreground text-center py-4">새로운 알림이 없습니다.</p>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-center gap-3 p-2 border-l-2 border-blue-500 bg-blue-50 rounded"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm">{notification.message}</p>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
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
            <CustomerDetailModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
          )}
        </>
      )}
    </div>
  )
}
