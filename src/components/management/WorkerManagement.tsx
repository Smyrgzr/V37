"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  Users, UserPlus, UserCheck, Clock, MapPin, Phone, Mail,
  TrendingUp, Calendar, Award, Search, Filter, MoreVertical, Star,
  Car, Wrench, Navigation, Shield, AlertCircle, CheckCircle
} from "lucide-react";
import { cn } from "../ui/utils";
import { BusinessModule } from "../../types/business-modules";
import { Worker, WorkerRole, WorkerStatus, getWorkerRoleLabel, getWorkerStatusColor } from "../../types/worker";
import { generateMockWorkers, generateWorkerPerformance } from "../../data/mockWorkers";
import { CapacityDashboardWidget } from "./CapacityDashboardWidget";

interface WorkerManagementProps {
  branchId?: string;
  branchName?: string;
}

export function WorkerManagement({ branchId = "branch-1", branchName = "Downtown Branch" }: WorkerManagementProps) {
  const [workers, setWorkers] = useState<Worker[]>(generateMockWorkers(branchId, branchName));
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<WorkerRole | "all">("all");
  const [filterStatus, setFilterStatus] = useState<WorkerStatus | "all">("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter workers
  const filteredWorkers = useMemo(() => {
    return workers.filter(worker => {
      const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           worker.phone.includes(searchTerm);
      const matchesRole = filterRole === "all" || worker.role === filterRole;
      const matchesStatus = filterStatus === "all" || worker.currentStatus === filterStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [workers, searchTerm, filterRole, filterStatus]);

  // Statistics
  const stats = useMemo(() => {
    const available = workers.filter(w => w.currentStatus === "available").length;
    const busy = workers.filter(w => w.currentStatus === "busy").length;
    const onBreak = workers.filter(w => w.currentStatus === "on-break").length;
    const totalHours = workers.reduce((sum, w) => {
      const perf = generateWorkerPerformance(w.id, "monthly");
      return sum + perf.hoursWorked;
    }, 0);
    const avgRating = workers.reduce((sum, w) => sum + w.overallRating, 0) / workers.length;
    
    return {
      total: workers.length,
      available,
      busy,
      onBreak,
      totalHours,
      avgRating: avgRating.toFixed(1)
    };
  }, [workers]);

  // Role distribution
  const roleDistribution = useMemo(() => {
    const distribution: Record<string, number> = {};
    workers.forEach(w => {
      const label = getWorkerRoleLabel(w.role);
      distribution[label] = (distribution[label] || 0) + 1;
    });
    
    return Object.entries(distribution).map(([role, count], index) => ({
      role,
      count,
      color: ["#155DFC", "#00A63E", "#F54900", "#9810FA", "#fbbf24", "#ec4899"][index % 6]
    }));
  }, [workers]);

  // Module specialization stats
  const moduleStats = useMemo(() => {
    const stats: Record<string, number> = {};
    workers.forEach(w => {
      w.specializations.forEach(spec => {
        stats[spec.module] = (stats[spec.module] || 0) + 1;
      });
    });
    
    return Object.entries(stats).map(([module, count]) => ({
      module: module.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count
    }));
  }, [workers]);

  // Top performers
  const topPerformers = useMemo(() => {
    return [...workers]
      .sort((a, b) => b.overallRating - a.overallRating)
      .slice(0, 5);
  }, [workers]);

  // Capacity overview
  const capacityByModule = useMemo(() => {
    const modules: BusinessModule[] = ["manual_detailing", "mobile_detailing", "in_bay", "tunnel"];
    return modules.map(module => {
      const available = workers.filter(w => 
        w.specializations.some(s => s.module === module) &&
        w.currentStatus === "available"
      ).length;
      const busy = workers.filter(w =>
        w.specializations.some(s => s.module === module) &&
        w.currentStatus === "busy"
      ).length;
      
      return {
        module: module.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        available,
        busy,
        total: available + busy
      };
    });
  }, [workers]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Worker & Capacity Management</h1>
          <p className="text-muted-foreground">Manage staff, schedules, and capacity planning</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Worker
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Worker</DialogTitle>
              <DialogDescription>Create a new worker profile and assign capabilities</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Enter worker name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="worker@letwash.com" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input placeholder="+1-555-0000" />
              </div>
              <div>
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detailer">Detailer</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="both">Driver & Detailer</SelectItem>
                    <SelectItem value="mobile_detailer">Mobile Detailer</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Create Worker</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#ececf0] p-1 h-9">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
          <TabsTrigger value="workers" className="data-[state=active]:bg-white">All Workers</TabsTrigger>
          <TabsTrigger value="capacity" className="data-[state=active]:bg-white">Capacity</TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-white">Schedule</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Workers</p>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{stats.total}</p>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <Badge className="bg-[#00a63e] text-white border-0">{stats.available} available</Badge>
                  <Badge className="bg-[#fbbf24] text-[#030213] border-0">{stats.busy} busy</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Hours This Month</p>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{stats.totalHours}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">+8% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{stats.avgRating}/5</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
                  <p className="text-xs text-muted-foreground">Customer feedback</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Capacity Usage</p>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">78%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[#00a63e]" />
                  <p className="text-xs text-[#00a63e]">Optimal range</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
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
                      data={roleDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.role} (${entry.count})`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {roleDistribution.map((entry, index) => (
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
                <CardTitle>Module Specializations</CardTitle>
                <CardDescription>Workers trained per business module</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={moduleStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="module" stroke="#666" style={{ fontSize: '11px' }} angle={-20} textAnchor="end" height={80} />
                    <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#155DFC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Capacity by Module & Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Capacity by Module</CardTitle>
                <CardDescription>Available vs busy workers per module</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={capacityByModule}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="module" stroke="#666" style={{ fontSize: '11px' }} angle={-20} textAnchor="end" height={80} />
                    <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="available" fill="#00A63E" name="Available" />
                    <Bar dataKey="busy" fill="#fbbf24" name="Busy" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest rated workers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((worker, index) => (
                    <div key={worker.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-8 rounded-full bg-[#ececf0] shrink-0">
                        <span className="text-sm font-medium">#{index + 1}</span>
                      </div>
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-[#155DFC] text-white">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{worker.name}</p>
                        <p className="text-sm text-muted-foreground">{getWorkerRoleLabel(worker.role)}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
                          <span className="font-semibold">{worker.overallRating.toFixed(1)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{worker.totalJobsCompleted} jobs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* All Workers Tab */}
        <TabsContent value="workers" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Workers</CardTitle>
                  <CardDescription>{filteredWorkers.length} workers found</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search workers..."
                      className="pl-10 w-64 bg-[#f3f3f5] border-0"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterRole} onValueChange={(v) => setFilterRole(v as WorkerRole | "all")}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="detailer">Detailer</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                      <SelectItem value="mobile_detailer">Mobile</SelectItem>
                      <SelectItem value="technician">Technician</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as WorkerStatus | "all")}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="on-break">On Break</SelectItem>
                      <SelectItem value="off-duty">Off Duty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredWorkers.map((worker) => (
                  <div key={worker.id} className="border border-border rounded-lg p-4 hover:bg-[#f3f3f5] transition-colors">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-12 shrink-0">
                        <AvatarFallback className="bg-[#155DFC] text-white">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{worker.name}</h3>
                          <Badge className={cn("border-0", getWorkerStatusColor(worker.currentStatus))}>
                            {worker.currentStatus}
                          </Badge>
                          {worker.canDrive && <Car className="h-4 w-4 text-muted-foreground" />}
                          {worker.canDetail && <Wrench className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{getWorkerRoleLabel(worker.role)}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{worker.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{worker.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
                            <span>{worker.overallRating.toFixed(1)} rating</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span>{worker.specializations.length} specializations</span>
                          </div>
                        </div>
                        {worker.currentAssignments.length > 0 && (
                          <div className="mt-3 p-2 bg-[#fef3c7] rounded border border-[#fbbf24]/20">
                            <div className="flex items-center gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-[#f59e0b]" />
                              <span className="text-[#92400e]">
                                Currently {worker.currentAssignments[0].status}: {worker.currentAssignments[0].location?.address || 'On job'}
                              </span>
                            </div>
                          </div>
                        )}
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

        {/* Capacity Tab */}
        <TabsContent value="capacity" className="space-y-6 mt-6">
          <CapacityDashboardWidget 
            workers={workers}
            branchId={branchId}
            branchName={branchName}
          />
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Schedule</CardTitle>
              <CardDescription>Weekly schedules and shift management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Advanced schedule management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Worker Performance Metrics</CardTitle>
              <CardDescription>Detailed performance analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Worker</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Jobs</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                    <TableHead className="text-right">Specializations</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workers.filter(w => w.status === "available").map((worker) => (
                    <TableRow key={worker.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-[#155DFC] text-white text-xs">
                              {worker.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{worker.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getWorkerRoleLabel(worker.role)}</TableCell>
                      <TableCell className="text-right">{worker.totalJobsCompleted}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
                          <span>{worker.overallRating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>{worker.specializations.length}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={cn("border-0", getWorkerStatusColor(worker.currentStatus))}>
                          {worker.currentStatus}
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
  );
}
