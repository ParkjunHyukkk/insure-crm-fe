"use client";

import {
  User,
  Phone,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  Edit,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function CustomerDetailModal({ customer, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(customer.memo || "");
  const [consultationHistory] = useState([
    {
      id: 1,
      date: "2024-01-10",
      type: "전화상담",
      content: "보험료 납입 관련 문의",
      result: "완료",
    },
    {
      id: 2,
      date: "2024-01-05",
      type: "방문상담",
      content: "계약 갱신 상담",
      result: "진행중",
    },
  ]);

  const getDaysUntilRenewal = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysFromJoin = (joinDate) => {
    const today = new Date();
    const join = new Date(joinDate);
    const diffTime = today - join;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSaveMemo = () => {
    // 메모 저장 로직
    setIsEditing(false);
    alert("메모가 저장되었습니다.");
  };

  const daysUntilRenewal = getDaysUntilRenewal(customer.renewalDate);
  const daysFromJoin = getDaysFromJoin(customer.joinDate);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {customer.name}님 상세 정보
          </DialogTitle>
          <DialogDescription>
            고객의 상세 정보 및 상담 기록을 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {customer.age}세
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{customer.phone}</p>
                  <p className="text-sm text-muted-foreground">연락처</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{customer.birthDate}</p>
                  <p className="text-sm text-muted-foreground">생년월일</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 계약 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">계약 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{customer.product}</p>
                  <p className="text-sm text-muted-foreground">상품명</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {customer.premium.toLocaleString()}원
                  </p>
                  <p className="text-sm text-muted-foreground">월 보험료</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    customer.paymentMethod === "자동이체"
                      ? "default"
                      : "secondary"
                  }
                >
                  {customer.paymentMethod}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 중요 일정 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">중요 일정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">가입일</p>
                  <p className="text-sm text-muted-foreground">
                    {customer.joinDate}
                  </p>
                </div>
                <Badge variant="outline">가입 {daysFromJoin}일</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">상령일</p>
                  <p className="text-sm text-muted-foreground">
                    {customer.renewalDate}
                  </p>
                </div>
                <Badge
                  variant={daysUntilRenewal <= 30 ? "destructive" : "default"}
                >
                  D-{daysUntilRenewal}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 메모 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                메모
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    isEditing ? handleSaveMemo() : setIsEditing(true)
                  }
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      저장
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      편집
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  <Textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="고객 관련 메모를 입력하세요..."
                    rows={4}
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {memo || "등록된 메모가 없습니다."}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 상담 기록 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              상담 기록
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultationHistory.map((consultation) => (
                <div
                  key={consultation.id}
                  className="flex items-start gap-4 p-4 border rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{consultation.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {consultation.date}
                        </span>
                      </div>
                      <Badge
                        variant={
                          consultation.result === "완료"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {consultation.result}
                      </Badge>
                    </div>
                    <p className="text-sm">{consultation.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            닫기
          </Button>
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            전화걸기
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            상담 기록 추가
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            상담 예약
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
