"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Calendar,
  Filter,
} from "lucide-react";
import { Input } from "./ui/input";

export function CustomerManagement({
  customers,
  setCustomers,
  onCustomerSelect,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProduct, setFilterProduct] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    birthDate: "",
    joinDate: "",
    renewalDate: "",
    product: "",
    paymentMethod: "",
    premium: "",
    memo: "",
  });

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesFilter =
      filterProduct === "all" || customer.product === filterProduct;
    return matchesSearch && matchesFilter;
  });

  const handleAddCustomer = () => {
    const customer = {
      ...newCustomer,
      id: Date.now(),
      age:
        new Date().getFullYear() -
        new Date(newCustomer.birthDate).getFullYear(),
      premium: Number.parseInt(newCustomer.premium),
    };
    setCustomers((prev) => [...prev, customer]);
    setNewCustomer({
      name: "",
      phone: "",
      birthDate: "",
      joinDate: "",
      renewalDate: "",
      product: "",
      paymentMethod: "",
      premium: "",
      memo: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  };

  const getPaymentMethodBadge = (method) => {
    return method === "자동이체" ? "default" : "secondary";
  };

  const getDaysUntilRenewal = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>고객 관리</CardTitle>
              <CardDescription>등록된 고객 정보를 관리합니다</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  고객 추가
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>새 고객 추가</DialogTitle>
                  <DialogDescription>
                    새로운 고객의 정보를 입력해주세요.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={newCustomer.name}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="고객 이름"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처</Label>
                    <Input
                      id="phone"
                      value={newCustomer.phone}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="010-0000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">생년월일</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={newCustomer.birthDate}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({
                          ...prev,
                          birthDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">가입일</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={newCustomer.joinDate}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({
                          ...prev,
                          joinDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="renewalDate">상령일</Label>
                    <Input
                      id="renewalDate"
                      type="date"
                      value={newCustomer.renewalDate}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({
                          ...prev,
                          renewalDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product">상품명</Label>
                    <Select
                      value={newCustomer.product}
                      onValueChange={(value) =>
                        setNewCustomer((prev) => ({ ...prev, product: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="상품 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="종신보험">종신보험</SelectItem>
                        <SelectItem value="건강보험">건강보험</SelectItem>
                        <SelectItem value="연금보험">연금보험</SelectItem>
                        <SelectItem value="자동차보험">자동차보험</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">납입 방식</Label>
                    <Select
                      value={newCustomer.paymentMethod}
                      onValueChange={(value) =>
                        setNewCustomer((prev) => ({
                          ...prev,
                          paymentMethod: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="납입 방식 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="자동이체">자동이체</SelectItem>
                        <SelectItem value="카드결제">카드결제</SelectItem>
                        <SelectItem value="계좌이체">계좌이체</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premium">보험료 (월)</Label>
                    <Input
                      id="premium"
                      type="number"
                      value={newCustomer.premium}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({
                          ...prev,
                          premium: e.target.value,
                        }))
                      }
                      placeholder="150000"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="memo">메모</Label>
                    <Textarea
                      id="memo"
                      value={newCustomer.memo}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({
                          ...prev,
                          memo: e.target.value,
                        }))
                      }
                      placeholder="고객 관련 메모사항"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    취소
                  </Button>
                  <Button onClick={handleAddCustomer}>추가</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* 검색 및 필터 */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="고객명 또는 연락처로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterProduct} onValueChange={setFilterProduct}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상품</SelectItem>
                <SelectItem value="종신보험">종신보험</SelectItem>
                <SelectItem value="건강보험">건강보험</SelectItem>
                <SelectItem value="연금보험">연금보험</SelectItem>
                <SelectItem value="자동차보험">자동차보험</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 고객 테이블 */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>나이</TableHead>
                  <TableHead>상품</TableHead>
                  <TableHead>납입방식</TableHead>
                  <TableHead>보험료</TableHead>
                  <TableHead>상령일</TableHead>
                  <TableHead>액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => {
                  const daysUntilRenewal = getDaysUntilRenewal(
                    customer.renewalDate
                  );
                  return (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.name}
                      </TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.age}세</TableCell>
                      <TableCell>{customer.product}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getPaymentMethodBadge(
                            customer.paymentMethod
                          )}
                        >
                          {customer.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {customer.premium.toLocaleString()}원
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span
                            className={
                              daysUntilRenewal <= 30
                                ? "text-red-600 font-medium"
                                : ""
                            }
                          >
                            D-{daysUntilRenewal}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCustomerSelect(customer)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              검색 조건에 맞는 고객이 없습니다.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
