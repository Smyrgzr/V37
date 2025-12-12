"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Users,
  Shield,
  Search,
  MoreVertical,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Mail,
  Calendar,
  Filter,
  Download,
  UserX,
  Key,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: "carwash_owner" | "carwash_admin";
  centerName: string;
  branchName?: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: Date;
  createdAt: Date;
  loginCount: number;
  ipAddress?: string;
}

// Mock data - In production, this would come from database
const generateMockUsers = (): PlatformUser[] => [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@cleanwash.com",
    role: "carwash_owner",
    centerName: "CleanWash Premium",
    status: "active",
    lastLogin: new Date(Date.now() - 2 * 60000),
    createdAt: new Date("2024-01-15"),
    loginCount: 342,
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "michael.r@sparkleauto.com",
    role: "carwash_admin",
    centerName: "Sparkle Auto Wash",
    branchName: "Downtown Branch",
    status: "active",
    lastLogin: new Date(Date.now() - 15 * 60000),
    createdAt: new Date("2024-02-01"),
    loginCount: 156,
    ipAddress: "192.168.1.105",
  },
  {
    id: "3",
    name: "Emily Thompson",
    email: "emily.t@cleanbrite.com",
    role: "carwash_owner",
    centerName: "CleanBrite Services",
    status: "active",
    lastLogin: new Date(Date.now() - 60 * 60000),
    createdAt: new Date("2024-01-20"),
    loginCount: 278,
    ipAddress: "192.168.1.102",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@quickwash.com",
    role: "carwash_admin",
    centerName: "QuickWash Express",
    branchName: "Westside Location",
    status: "inactive",
    lastLogin: new Date(Date.now() - 45 * 24 * 60 * 60000), // 45 days ago
    createdAt: new Date("2023-11-10"),
    loginCount: 89,
    ipAddress: "192.168.1.108",
  },
  {
    id: "5",
    name: "Jessica Martinez",
    email: "jessica.m@premiumdetail.com",
    role: "carwash_owner",
    centerName: "Premium Detail Co",
    status: "suspended",
    lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60000),
    createdAt: new Date("2024-03-05"),
    loginCount: 45,
    ipAddress: "192.168.1.115",
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.w@autoshine.com",
    role: "carwash_admin",
    centerName: "AutoShine Pro",
    branchName: "North Campus",
    status: "active",
    lastLogin: new Date(Date.now() - 3 * 60 * 60000),
    createdAt: new Date("2024-02-15"),
    loginCount: 234,
    ipAddress: "192.168.1.110",
  },
];

export function PlatformUsersManagement() {
  const [users, setUsers] = useState<PlatformUser[]>(generateMockUsers());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "suspended">("all");
  const [filterRole, setFilterRole] = useState<"all" | "carwash_owner" | "carwash_admin">("all");
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showReactivateDialog, setShowReactivateDialog] = useState(false);

  const formatLastLogin = (date: Date) => {
    const now = Date.now();
    const diff = now - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  const getStatusBadge = (status: PlatformUser['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600 text-white"><CheckCircle size={12} className="mr-1" /> Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-orange-600 border-orange-600"><Clock size={12} className="mr-1" /> Inactive</Badge>;
      case "suspended":
        return <Badge variant="destructive"><Ban size={12} className="mr-1" /> Suspended</Badge>;
    }
  };

  const getRoleBadge = (role: PlatformUser['role']) => {
    return role === "carwash_owner" 
      ? <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300"><Shield size={12} className="mr-1" /> Owner</Badge>
      : <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300"><Users size={12} className="mr-1" /> Admin</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.centerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleSuspendUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, status: "suspended" as const }
        : u
    ));
    
    toast.error(`${selectedUser.name} has been suspended`, {
      description: "User access has been revoked immediately",
    });
    
    setShowSuspendDialog(false);
    setSelectedUser(null);
  };

  const handleReactivateUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, status: "active" as const }
        : u
    ));
    
    toast.success(`${selectedUser.name} has been reactivated`, {
      description: "User can now access the platform",
    });
    
    setShowReactivateDialog(false);
    setSelectedUser(null);
  };

  const handleForcePasswordReset = (user: PlatformUser) => {
    toast.success(`Password reset email sent to ${user.email}`, {
      description: "User will be required to reset password on next login",
    });
  };

  const handleExportData = () => {
    toast.success("User audit log exported", {
      description: "CSV file will be downloaded shortly",
    });
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length,
    suspended: users.filter(u => u.status === "suspended").length,
    owners: users.filter(u => u.role === "carwash_owner").length,
    admins: users.filter(u => u.role === "carwash_admin").length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950 mb-1 flex items-center gap-2">
            <Shield className="text-purple-600" size={24} />
            Platform Users Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage all platform administrators and owners
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download size={16} className="mr-2" />
            Export Audit Log
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-neutral-950">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{stats.inactive}</div>
            <div className="text-xs text-muted-foreground">Inactive</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-red-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
            <div className="text-xs text-muted-foreground">Suspended</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{stats.owners}</div>
            <div className="text-xs text-muted-foreground">Owners</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.admins}</div>
            <div className="text-xs text-muted-foreground">Admins</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search by name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter size={16} className="mr-2" />
                    Status: {filterStatus === "all" ? "All" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Statuses</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active Only</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("inactive")}>Inactive Only</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("suspended")}>Suspended Only</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Shield size={16} className="mr-2" />
                    Role: {filterRole === "all" ? "All" : filterRole === "carwash_owner" ? "Owners" : "Admins"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterRole("all")}>All Roles</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("carwash_owner")}>Owners Only</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("carwash_admin")}>Admins Only</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Platform Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Company / Branch</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Login Count</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail size={10} /> {user.email}
                        </div>
                        {user.ipAddress && (
                          <div className="text-xs text-muted-foreground">IP: {user.ipAddress}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-1">
                          <Building2 size={12} className="text-muted-foreground" />
                          {user.centerName}
                        </div>
                        {user.branchName && (
                          <div className="text-xs text-muted-foreground">→ {user.branchName}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatLastLogin(user.lastLogin)}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={10} />
                        Joined {user.createdAt.toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-semibold">{user.loginCount}</div>
                      <div className="text-xs text-muted-foreground">sessions</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              toast.info("User Activity Log", {
                                description: `Viewing activity for ${user.name}`,
                              });
                            }}
                          >
                            <Clock size={14} className="mr-2" />
                            View Activity Log
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleForcePasswordReset(user)}>
                            <Key size={14} className="mr-2" />
                            Force Password Reset
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowSuspendDialog(true);
                              }}
                            >
                              <Ban size={14} className="mr-2" />
                              Suspend Account
                            </DropdownMenuItem>
                          ) : user.status === "suspended" ? (
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowReactivateDialog(true);
                              }}
                            >
                              <CheckCircle size={14} className="mr-2" />
                              Reactivate Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowReactivateDialog(true);
                              }}
                            >
                              <CheckCircle size={14} className="mr-2" />
                              Reactivate Account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Suspend Dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle size={20} />
              Suspend User Account
            </DialogTitle>
            <DialogDescription>
              This action will immediately revoke all access for this user. They will not be able to log in until reactivated.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="font-semibold">{selectedUser.name}</div>
              <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
              <div className="text-sm text-muted-foreground">{selectedUser.centerName}</div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSuspendUser}>
              <Ban size={16} className="mr-2" />
              Suspend Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reactivate Dialog */}
      <Dialog open={showReactivateDialog} onOpenChange={setShowReactivateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle size={20} />
              Reactivate User Account
            </DialogTitle>
            <DialogDescription>
              This user will regain full access to the platform immediately.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-semibold">{selectedUser.name}</div>
              <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
              <div className="text-sm text-muted-foreground">{selectedUser.centerName}</div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReactivateDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleReactivateUser}>
              <CheckCircle size={16} className="mr-2" />
              Reactivate Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
