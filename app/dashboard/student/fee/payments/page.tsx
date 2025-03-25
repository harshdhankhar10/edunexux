"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, CreditCard, DollarSign, History, Plus, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const FeeManagementPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  // Sample data for fee overview
  const feeOverview = {
    totalFees: 5000,
    paidFees: 3000,
    dueFees: 2000,
    dueDate: "2023-12-15",
    progress: (3000 / 5000) * 100,
  };

  // Sample data for payment history
  const paymentHistory = [
    {
      id: 1,
      date: "2023-10-01",
      amount: 1000,
      method: "Credit Card",
      status: "Paid",
    },
    {
      id: 2,
      date: "2023-09-15",
      amount: 1000,
      method: "Bank Transfer",
      status: "Paid",
    },
    {
      id: 3,
      date: "2023-08-01",
      amount: 1000,
      method: "Credit Card",
      status: "Paid",
    },
  ];

  // Sample data for upcoming dues
  const upcomingDues = [
    {
      id: 1,
      description: "Tuition Fee",
      amount: 2000,
      dueDate: "2023-12-15",
      status: "Pending",
    },
    {
      id: 2,
      description: "Library Fine",
      amount: 50,
      dueDate: "2023-11-30",
      status: "Pending",
    },
  ];

  const handlePayment = () => {
    if (!paymentAmount || isNaN(Number(paymentAmount))) {
      alert("Please enter a valid amount.");
      return;
    }
    alert(`Payment of $${paymentAmount} submitted successfully!`);
    setPaymentAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Fee Management</h1>
            <p className="text-muted-foreground">Manage your fees, payments, and dues in one place.</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Make Payment
          </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 h-10 bg-gray-200 rounded-t-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="dues">Upcoming Dues</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                    Total Fees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${feeOverview.totalFees}</p>
                  <p className="text-sm text-muted-foreground">Total amount to be paid</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Paid Fees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${feeOverview.paidFees}</p>
                  <p className="text-sm text-muted-foreground">Amount paid so far</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    Due Fees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${feeOverview.dueFees}</p>
                  <p className="text-sm text-muted-foreground">Amount due by {feeOverview.dueDate}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Payment Progress</CardTitle>
                <CardDescription>Track your fee payment progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Paid: ${feeOverview.paidFees}</span>
                    <span className="text-sm">Total: ${feeOverview.totalFees}</span>
                  </div>
                  <Progress value={feeOverview.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Make Payment</CardTitle>
                <CardDescription>Pay your fees securely online.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex-1">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit Card
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Bank Transfer
                    </Button>
                  </div>
                  <Button className="w-full" onClick={handlePayment}>
                    Pay Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment History</CardTitle>
                <CardDescription>View your past payments.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-600">
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dues" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Dues</CardTitle>
                <CardDescription>View your upcoming fee dues.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingDues.map((due) => (
                      <TableRow key={due.id}>
                        <TableCell>{due.description}</TableCell>
                        <TableCell>${due.amount}</TableCell>
                        <TableCell>{due.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-100 text-red-600">
                            {due.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FeeManagementPage;