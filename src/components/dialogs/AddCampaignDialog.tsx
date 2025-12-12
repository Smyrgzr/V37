"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Calendar, Target, DollarSign, Users, Percent, Zap } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AddCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branches: any[];
  onAddCampaign: (campaign: any) => void;
}

export function AddCampaignDialog({
  open,
  onOpenChange,
  branches,
  onAddCampaign,
}: AddCampaignDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "percentage",
    discountValue: "",
    startDate: "",
    endDate: "",
    targetAudience: "all",
    branches: [] as string[],
    maxUses: "",
    code: "",
    status: "active",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.discountValue || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newCampaign = {
      id: `campaign-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      type: formData.type,
      discountValue: parseFloat(formData.discountValue),
      startDate: formData.startDate,
      endDate: formData.endDate,
      targetAudience: formData.targetAudience,
      branches: formData.branches.length > 0 ? formData.branches : branches.map(b => b.id),
      maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
      currentUses: 0,
      code: formData.code || generateCampaignCode(formData.name),
      status: formData.status,
      createdAt: new Date().toISOString(),
      redemptions: 0,
      revenue: 0,
    };

    onAddCampaign(newCampaign);
    toast.success("Campaign created successfully!");
    resetForm();
    onOpenChange(false);
  };

  const generateCampaignCode = (name: string) => {
    const words = name.toUpperCase().split(' ');
    const initials = words.map(w => w[0]).join('');
    const random = Math.floor(Math.random() * 1000);
    return `${initials}${random}`;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "percentage",
      discountValue: "",
      startDate: "",
      endDate: "",
      targetAudience: "all",
      branches: [],
      maxUses: "",
      code: "",
      status: "active",
    });
  };

  const toggleBranch = (branchId: string) => {
    setFormData(prev => ({
      ...prev,
      branches: prev.branches.includes(branchId)
        ? prev.branches.filter(id => id !== branchId)
        : [...prev.branches, branchId]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Set up a new promotional campaign or discount offer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Basic Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Zap size={16} />
              Campaign Information
            </h3>
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                placeholder="Summer Special Offer"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the campaign..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Discount Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Percent size={16} />
              Discount Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Discount Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountValue">
                  {formData.type === "percentage" ? "Discount Percentage *" : "Discount Amount *"}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  placeholder={formData.type === "percentage" ? "20" : "50"}
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Campaign Code</Label>
                <Input
                  id="code"
                  placeholder="AUTO-GENERATED"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                />
                <p className="text-xs text-muted-foreground">Leave empty to auto-generate</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxUses">Max Uses (optional)</Label>
                <Input
                  id="maxUses"
                  type="number"
                  placeholder="Unlimited"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Calendar size={16} />
              Campaign Period
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Users size={16} />
              Target Audience
            </h3>
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Customer Type</Label>
              <Select
                value={formData.targetAudience}
                onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="new">New Customers</SelectItem>
                  <SelectItem value="returning">Returning Customers</SelectItem>
                  <SelectItem value="vip">VIP Members</SelectItem>
                  <SelectItem value="b2b">B2B Clients</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Branch Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Target size={16} />
              Applicable Branches
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={formData.branches.length === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => setFormData({ ...formData, branches: [] })}
              >
                All Branches
              </Button>
              {branches.map((branch) => (
                <Button
                  key={branch.id}
                  type="button"
                  variant={formData.branches.includes(branch.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleBranch(branch.id)}
                >
                  {branch.name}
                </Button>
              ))}
            </div>
            {formData.branches.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Selected {formData.branches.length} of {branches.length} branches
              </p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Campaign Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          {formData.name && formData.discountValue && (
            <div className="p-4 border border-dashed rounded-lg bg-blue-50/50">
              <p className="text-xs text-muted-foreground mb-2">Preview</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">
                  {formData.type === "percentage" ? `${formData.discountValue}% OFF` : `$${formData.discountValue} OFF`}
                </Badge>
                <span className="font-semibold">{formData.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Code: <span className="font-mono font-semibold">{formData.code || generateCampaignCode(formData.name)}</span>
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Campaign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
