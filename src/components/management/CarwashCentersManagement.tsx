"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Search, Plus, Eye, Edit, Ban, MapPin, Phone, Mail } from "lucide-react";

interface CarwashCenter {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  branches: number;
  status: "active" | "pending" | "disabled";
  registrationDate: string;
}

interface CarwashCentersManagementProps {
  centers: CarwashCenter[];
  onAddCenter: () => void;
  onViewCenter: (id: string) => void;
  onEditCenter: (id: string) => void;
  onDisableCenter: (id: string) => void;
}

export function CarwashCentersManagement({ 
  centers, 
  onAddCenter, 
  onViewCenter, 
  onEditCenter, 
  onDisableCenter 
}: CarwashCentersManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCenter, setSelectedCenter] = useState<CarwashCenter | null>(null);

  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || center.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "disabled":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Disabled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Carwash Centers Management</h2>
          <p className="text-muted-foreground">Manage all carwash centers in the Letwash network</p>
        </div>
        <Button onClick={onAddCenter}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Center
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search centers, contacts, or cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Centers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Carwash Centers ({filteredCenters.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Center Name</TableHead>
                <TableHead>Primary Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Branches</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCenters.map((center) => (
                <TableRow key={center.id}>
                  <TableCell className="font-medium">{center.name}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{center.contactPerson}</div>
                      <div className="text-sm text-muted-foreground">{center.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{center.city}, {center.district}</div>
                      <div className="text-muted-foreground">{center.address}</div>
                    </div>
                  </TableCell>
                  <TableCell>{center.branches}</TableCell>
                  <TableCell>{getStatusBadge(center.status)}</TableCell>
                  <TableCell>{center.registrationDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedCenter(center)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{selectedCenter?.name}</DialogTitle>
                          </DialogHeader>
                          {selectedCenter && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{selectedCenter.address}, {selectedCenter.city}, {selectedCenter.district}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{selectedCenter.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{selectedCenter.email}</span>
                                </div>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Contact Person:</span>
                                <span className="font-medium">{selectedCenter.contactPerson}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Total Branches:</span>
                                <span className="font-medium">{selectedCenter.branches}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Status:</span>
                                {getStatusBadge(selectedCenter.status)}
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Registration Date:</span>
                                <span className="font-medium">{selectedCenter.registrationDate}</span>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onEditCenter(center.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      {center.status !== "disabled" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onDisableCenter(center.id)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}