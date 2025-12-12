"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  Users, UserPlus, UserCheck, Clock, MapPin, Phone, Mail,
  TrendingUp, Calendar, Award, Search, Filter, MoreVertical, Star
} from "lucide-react";
import { cn } from "../ui/utils";
import { BusinessModule, ModuleSpecialization } from "../../types/business-modules";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  branchName: string;
  status: "active" | "on-leave" | "inactive";
  joinDate: string;
  hoursWorked: number;
  performance: number;
  completedTasks: number;
  customerRating: number;
  attendance: number;
  // Business Module Support
  moduleSpecializations?: ModuleSpecialization[];
  primaryModule?: BusinessModule;
}

interface EmployeesManagementProps {
  employeesData?: Employee[];
  userRole?: string;
  branches?: any[];
}

export function EmployeesManagement({ employeesData, userRole, branches }: EmployeesManagementProps) {
  const [employees] = useState<Employee[]>([
    {
      id: "emp1",
      name: "Mike Thompson",
      email: "mike.thompson@autowashpro.com",
      phone: "+1-555-0987",
      role: "Branch Manager",
      branchName: "Downtown Branch",
      status: "active",
      joinDate: "2024-01-15",
      hoursWorked: 168,
      performance: 95,
      completedTasks: 245,
      customerRating: 4.8,
      attendance: 98,
    },
    {
      id: "emp2",
      name: "Sarah Johnson",
      email: "sarah.johnson@autowashpro.com",
      phone: "+1-555-0234",
      role: "Service Technician",
      branchName: "Downtown Branch",
      status: "active",
      joinDate: "2024-02-10",
      hoursWorked: 152,
      performance: 88,
      completedTasks: 189,
      customerRating: 4.6,
      attendance: 94,
    },
    {
      id: "emp3",
      name: "Alex Rodriguez",
      email: "alex.rodriguez@autowashpro.com",
      phone: "+1-555-0345",
      role: "Customer Service",
      branchName: "Uptown Branch",
      status: "active",
      joinDate: "2024-01-20",
      hoursWorked: 140,
      performance: 92,
      completedTasks: 312,
      customerRating: 4.9,
      attendance: 96,
    },
    {
      id: "emp4",
      name: "Emily Davis",
      email: "emily.davis@autowashpro.com",
      phone: "+1-555-0456",
      role: "Service Technician",
      branchName: "Uptown Branch",
      status: "active",
      joinDate: "2024-03-05",
      hoursWorked: 98,
      performance: 85,
      completedTasks: 145,
      customerRating: 4.5,
      attendance: 92,
    },
    {
      id: "emp5",
      name: "David Wilson",
      email: "david.wilson@autowashpro.com",
      phone: "+1-555-0567",
      role: "Service Technician",
      branchName: "Downtown Branch",
      status: "active",
      joinDate: "2023-11-12",
      hoursWorked: 176,
      performance: 90,
      completedTasks: 278,
      customerRating: 4.7,
      attendance: 95,
    },
    {
      id: "emp6",
      name: "Jennifer Lee",
      email: "jennifer.lee@autowashpro.com",
      phone: "+1-555-0678",
      role: "Detailing Specialist",
      branchName: "Uptown Branch",
      status: "active",
      joinDate: "2024-01-08",
      hoursWorked: 164,
      performance: 93,
      completedTasks: 156,
      customerRating: 4.9,
      attendance: 97,
    },
    {
      id: "emp7",
      name: "Robert Martinez",
      email: "robert.martinez@autowashpro.com",
      phone: "+1-555-0789",
      role: "Service Technician",
      branchName: "Brooklyn Branch",
      status: "on-leave",
      joinDate: "2023-09-20",
      hoursWorked: 0,
      performance: 87,
      completedTasks: 234,
      customerRating: 4.6,
      attendance: 91,
    },
    {
      id: "emp8",
      name: "Lisa Anderson",
      email: "lisa.anderson@autowashpro.com",
      phone: "+1-555-0890",
      role: "Customer Service",
      branchName: "Downtown Branch",
      status: "active",
      joinDate: "2024-02-18",
      hoursWorked: 144,
      performance: 89,
      completedTasks: 267,
      customerRating: 4.8,
      attendance: 93,
    },
  ]);

  const activeEmployees = employees.filter(emp => emp.status === "active");
  const totalHours = employees.reduce((sum, emp) => sum + emp.hoursWorked, 0);
  const avgPerformance = Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length);
  const avgRating = (employees.reduce((sum, emp) => sum + emp.customerRating, 0) / employees.length).toFixed(1);

  // Performance trends data
  const performanceTrendData = [
    { month: "Sep", avgPerformance: 85, avgRating: 4.5 },
    { month: "Oct", avgPerformance: 87, avgRating: 4.6 },
    { month: "Nov", avgPerformance: 88, avgRating: 4.6 },
    { month: "Dec", avgPerformance: 89, avgRating: 4.7 },
    { month: "Jan", avgPerformance: 90, avgRating: 4.7 },
    { month: "Feb", avgPerformance: 91, avgRating: 4.8 },
  ];

  // Role distribution data
  const roleDistributionData = [
    { role: "Service Tech", count: 4, color: "#155DFC" },
    { role: "Customer Service", count: 2, color: "#00A63E" },
    { role: "Detailing", count: 1, color: "#F54900" },
    { role: "Manager", count: 1, color: "#9810FA" },
  ];

  // Hours worked by employee
  const hoursWorkedData = employees
    .filter(e => e.status === "active")
    .sort((a, b) => b.hoursWorked - a.hoursWorked)
    .map(e => ({ name: e.name.split(' ')[0], hours: e.hoursWorked }));

  // Top performers
  const topPerformers = [...employees]
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Team Management</h1>
          <p className="text-muted-foreground">Manage your staff and track performance</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#ececf0] p-1 h-9">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
          <TabsTrigger value="employees" className="data-[state=active]:bg-white">All Employees</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white">Performance</TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-white">Schedule</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Employees</p>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{employees.length}</p>
                <p className="text-xs text-muted-foreground mt-1">{activeEmployees.length} active</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Hours This Month</p>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{totalHours}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+8% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Performance</p>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{avgPerformance}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+3% improvement</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Customer Rating</p>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{avgRating}/5</p>
                <p className="text-xs text-muted-foreground mt-1">Based on customer feedback</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Team performance and customer ratings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="left" stroke="#155DFC" style={{ fontSize: '12px' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#00A63E" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="avgPerformance" stroke="#155DFC" strokeWidth={2} name="Performance %" />
                    <Line yAxisId="right" type="monotone" dataKey="avgRating" stroke="#00A63E" strokeWidth={2} name="Rating" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hours Worked This Month</CardTitle>
                <CardDescription>Total hours by employee</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hoursWorkedData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis dataKey="name" type="category" width={80} stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#155DFC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Role Distribution & Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Distribution</CardTitle>
                <CardDescription>Team composition by role</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roleDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.role} (${entry.count})`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {roleDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest performing team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((emp, index) => (
                    <div key={emp.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-8 rounded-full bg-[#ececf0] shrink-0">
                        <span className="text-sm font-medium">#{index + 1}</span>
                      </div>
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-[#155DFC] text-white">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">{emp.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-[#fbbf24]" />
                          <span className="font-semibold">{emp.performance}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
                          <span>{emp.customerRating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* All Employees Tab */}
        <TabsContent value="employees" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Team Members</CardTitle>
                  <CardDescription>Complete list of employees</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      className="pl-10 w-64 bg-[#f3f3f5] border-0"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((emp) => (
                  <div key={emp.id} className="border border-border rounded-lg p-4 hover:bg-[#f3f3f5] transition-colors">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-12 shrink-0">
                        <AvatarFallback className="bg-[#155DFC] text-white">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{emp.name}</h3>
                          <Badge className={cn(
                            "border-0",
                            emp.status === "active" ? "bg-[#00a63e] text-white" :
                            emp.status === "on-leave" ? "bg-[#fbbf24] text-[#030213]" :
                            "bg-[#d4183d] text-white"
                          )}>
                            {emp.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{emp.role}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{emp.branchName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{emp.hoursWorked}h this month</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span>{emp.performance}% performance</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
                            <span>{emp.customerRating} rating</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Performance Metrics</CardTitle>
              <CardDescription>Detailed performance analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead className="text-right">Tasks</TableHead>
                    <TableHead className="text-right">Performance</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                    <TableHead className="text-right">Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.filter(e => e.status === "active").map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-[#155DFC] text-white text-xs">
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{emp.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{emp.role}</TableCell>
                      <TableCell>{emp.branchName}</TableCell>
                      <TableCell className="text-right">{emp.completedTasks}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-2 bg-[#ececf0] rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                emp.performance >= 90 ? "bg-[#00a63e]" :
                                emp.performance >= 80 ? "bg-[#155DFC]" :
                                "bg-[#fbbf24]"
                              )} 
                              style={{ width: `${emp.performance}%` }} 
                            />
                          </div>
                          <span className="font-semibold w-10">{emp.performance}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
                          <span>{emp.customerRating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{emp.attendance}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Schedule</CardTitle>
              <CardDescription>Employee schedules and shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Schedule management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
