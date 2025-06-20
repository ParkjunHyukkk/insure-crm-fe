"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Bell, Calendar, MessageSquare, User, Save } from "lucide-react";

export function SettingsPage() {
  const [settings, setSettings] = useState({
    // 가입일 기준 알림 설정
    joinAlerts: {
      day90: true,
      day180: true,
      day270: false,
      day365: true,
      customDays: "",
      customEnabled: false,
    },
    // 상령일 알림 설정
    renewalAlerts: {
      day60: true,
      day30: true,
      day7: true,
    },
    // 알림 채널 설정
    notificationChannels: {
      kakao: true,
      sms: true,
      phone: false,
      email: true,
      priority: "kakao", // kakao, sms, phone, email
    },
    // 사용자 정보
    userInfo: {
      name: "김설계사",
      phone: "010-1234-5678",
      email: "agent@insurance.com",
      company: "○○보험",
      senderName: "김설계사",
    },
  });

  const handleSave = () => {
    // 설정 저장 로직
    console.log("Settings saved:", settings);
    alert("설정이 저장되었습니다.");
  };

  const updateJoinAlerts = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      joinAlerts: { ...prev.joinAlerts, [key]: value },
    }));
  };

  const updateRenewalAlerts = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      renewalAlerts: { ...prev.renewalAlerts, [key]: value },
    }));
  };

  const updateNotificationChannels = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      notificationChannels: { ...prev.notificationChannels, [key]: value },
    }));
  };

  const updateUserInfo = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, [key]: value },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">설정</h2>
          <p className="text-muted-foreground">
            알림 및 사용자 설정을 관리합니다
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          설정 저장
        </Button>
      </div>

      {/* 가입일 기준 알림 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            가입일 기준 알림 설정
          </CardTitle>
          <CardDescription>
            고객 가입일을 기준으로 케어 알림을 설정합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="day90">가입 후 90일</Label>
              <Switch
                id="day90"
                checked={settings.joinAlerts.day90}
                onCheckedChange={(checked) =>
                  updateJoinAlerts("day90", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="day180">가입 후 180일</Label>
              <Switch
                id="day180"
                checked={settings.joinAlerts.day180}
                onCheckedChange={(checked) =>
                  updateJoinAlerts("day180", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="day270">가입 후 270일</Label>
              <Switch
                id="day270"
                checked={settings.joinAlerts.day270}
                onCheckedChange={(checked) =>
                  updateJoinAlerts("day270", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="day365">가입 후 365일</Label>
              <Switch
                id="day365"
                checked={settings.joinAlerts.day365}
                onCheckedChange={(checked) =>
                  updateJoinAlerts("day365", checked)
                }
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="customEnabled">커스텀 일수 알림</Label>
              <Switch
                id="customEnabled"
                checked={settings.joinAlerts.customEnabled}
                onCheckedChange={(checked) =>
                  updateJoinAlerts("customEnabled", checked)
                }
              />
            </div>
            {settings.joinAlerts.customEnabled && (
              <Input
                placeholder="예: 30,60,120 (쉼표로 구분)"
                value={settings.joinAlerts.customDays}
                onChange={(e) => updateJoinAlerts("customDays", e.target.value)}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* 상령일 알림 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            상령일 알림 조건 설정
          </CardTitle>
          <CardDescription>
            계약 상령일을 기준으로 갱신 알림을 설정합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="renewal60">상령일 60일 전</Label>
              <Switch
                id="renewal60"
                checked={settings.renewalAlerts.day60}
                onCheckedChange={(checked) =>
                  updateRenewalAlerts("day60", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="renewal30">상령일 30일 전</Label>
              <Switch
                id="renewal30"
                checked={settings.renewalAlerts.day30}
                onCheckedChange={(checked) =>
                  updateRenewalAlerts("day30", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="renewal7">상령일 7일 전</Label>
              <Switch
                id="renewal7"
                checked={settings.renewalAlerts.day7}
                onCheckedChange={(checked) =>
                  updateRenewalAlerts("day7", checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 알림 채널 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            알림 채널 설정
          </CardTitle>
          <CardDescription>
            알림 발송 채널의 우선순위와 fallback 조건을 설정합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>우선 발송 채널</Label>
            <Select
              value={settings.notificationChannels.priority}
              onValueChange={(value) =>
                updateNotificationChannels("priority", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kakao">카카오 알림톡</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="phone">전화</SelectItem>
                <SelectItem value="email">이메일</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="kakaoEnabled">카카오 알림톡</Label>
              <Switch
                id="kakaoEnabled"
                checked={settings.notificationChannels.kakao}
                onCheckedChange={(checked) =>
                  updateNotificationChannels("kakao", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsEnabled">SMS</Label>
              <Switch
                id="smsEnabled"
                checked={settings.notificationChannels.sms}
                onCheckedChange={(checked) =>
                  updateNotificationChannels("sms", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="phoneEnabled">전화</Label>
              <Switch
                id="phoneEnabled"
                checked={settings.notificationChannels.phone}
                onCheckedChange={(checked) =>
                  updateNotificationChannels("phone", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailEnabled">이메일</Label>
              <Switch
                id="emailEnabled"
                checked={settings.notificationChannels.email}
                onCheckedChange={(checked) =>
                  updateNotificationChannels("email", checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사용자 정보 관리 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            사용자 정보 관리
          </CardTitle>
          <CardDescription>
            설계사 정보 및 알림 발신자명을 설정합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName">이름</Label>
              <Input
                id="userName"
                value={settings.userInfo.name}
                onChange={(e) => updateUserInfo("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userPhone">연락처</Label>
              <Input
                id="userPhone"
                value={settings.userInfo.phone}
                onChange={(e) => updateUserInfo("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">이메일</Label>
              <Input
                id="userEmail"
                type="email"
                value={settings.userInfo.email}
                onChange={(e) => updateUserInfo("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userCompany">소속</Label>
              <Input
                id="userCompany"
                value={settings.userInfo.company}
                onChange={(e) => updateUserInfo("company", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="senderName">알림 발신자명</Label>
            <Input
              id="senderName"
              value={settings.userInfo.senderName}
              onChange={(e) => updateUserInfo("senderName", e.target.value)}
              placeholder="고객에게 표시될 발신자명"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
