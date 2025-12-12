"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Award, AlertCircle, FileText, Zap, Mail, Target, Send, Copy, Edit, Trash2, Plus, Star, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Template {
  id: string;
  title: string;
  text: string;
  category: "positive" | "negative" | "neutral" | "photo";
  useCount: number;
  lastUsed?: string;
}

interface ReviewTemplatesProps {
  onUseTemplate: (text: string) => void;
}

export function ReviewTemplates({ onUseTemplate }: ReviewTemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>([
    // Positive Templates
    {
      id: "p1",
      title: "Thank You - Standard",
      text: "Thank you so much for your wonderful review! We're thrilled to hear you had a great experience with our service. We look forward to serving you again soon!",
      category: "positive",
      useCount: 156,
      lastUsed: "2 hours ago"
    },
    {
      id: "p2",
      title: "Appreciation - Enthusiastic",
      text: "We truly appreciate your kind words and are delighted that you chose us. Your satisfaction is our top priority, and we can't wait to welcome you back!",
      category: "positive",
      useCount: 142,
      lastUsed: "1 day ago"
    },
    {
      id: "p3",
      title: "Team Recognition",
      text: "Thank you for recognizing our team's hard work! We're so glad we could exceed your expectations. Your feedback motivates us to keep delivering excellence!",
      category: "positive",
      useCount: 98,
      lastUsed: "3 days ago"
    },
    {
      id: "p4",
      title: "5-Star Thank You",
      text: "Wow, 5 stars! 🌟 Thank you for this amazing review! We're honored to have earned your trust and look forward to maintaining this high standard of service.",
      category: "positive",
      useCount: 201,
      lastUsed: "5 hours ago"
    },
    // Negative Templates
    {
      id: "n1",
      title: "Apology & Follow-up",
      text: "We sincerely apologize for not meeting your expectations. We'd love to make this right. Please contact us directly at [phone/email] so we can address your concerns personally.",
      category: "negative",
      useCount: 34,
      lastUsed: "1 week ago"
    },
    {
      id: "n2",
      title: "Acknowledgment - Professional",
      text: "Thank you for your honest feedback. We take all reviews seriously and are working to improve. We hope to have another chance to serve you better in the future.",
      category: "negative",
      useCount: 28,
      lastUsed: "4 days ago"
    },
    {
      id: "n3",
      title: "Solution Oriented",
      text: "We're sorry to hear about your experience. Your feedback helps us improve our service. Please reach out to our manager directly so we can resolve this issue immediately.",
      category: "negative",
      useCount: 41,
      lastUsed: "2 days ago"
    },
    {
      id: "n4",
      title: "Recovery & Compensation",
      text: "We sincerely apologize for this experience. This is not the level of service we strive for. We'd like to make it right - please contact us to discuss how we can resolve this.",
      category: "negative",
      useCount: 19,
      lastUsed: "1 week ago"
    },
    // Photo Templates
    {
      id: "ph1",
      title: "Photo Appreciation",
      text: "Thank you for sharing these amazing photos! We're so happy to see the results. Your car looks fantastic! 📸✨",
      category: "photo",
      useCount: 76,
      lastUsed: "6 hours ago"
    },
    {
      id: "ph2",
      title: "Before/After Transformation",
      text: "Wow! What a transformation! Thank you for capturing the before and after. We're proud of the work our team did on your vehicle.",
      category: "photo",
      useCount: 52,
      lastUsed: "1 day ago"
    },
    // Neutral Templates
    {
      id: "ne1",
      title: "General Thank You",
      text: "Thank you for taking the time to leave us a review. We appreciate your feedback and hope to serve you again in the future.",
      category: "neutral",
      useCount: 67,
      lastUsed: "2 days ago"
    }
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    text: "",
    category: "positive" as Template["category"]
  });

  const getCategoryInfo = (category: Template["category"]) => {
    switch (category) {
      case "positive":
        return { icon: Award, color: "text-green-500", bg: "bg-green-50", border: "border-green-200" };
      case "negative":
        return { icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" };
      case "photo":
        return { icon: ImageIcon, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" };
      default:
        return { icon: Star, color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200" };
    }
  };

  const handleUseTemplate = (template: Template) => {
    onUseTemplate(template.text);
    toast.success(`Template "${template.title}" copied to response`);
  };

  const handleCopyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Template copied to clipboard");
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.title || !newTemplate.text) {
      toast.error("Please fill in all fields");
      return;
    }

    const template: Template = {
      id: `custom-${Date.now()}`,
      ...newTemplate,
      useCount: 0
    };

    setTemplates([...templates, template]);
    setNewTemplate({ title: "", text: "", category: "positive" });
    setShowCreateDialog(false);
    toast.success("Template created successfully");
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success("Template deleted");
  };

  const categorizedTemplates = {
    positive: templates.filter(t => t.category === "positive"),
    negative: templates.filter(t => t.category === "negative"),
    photo: templates.filter(t => t.category === "photo"),
    neutral: templates.filter(t => t.category === "neutral")
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Response Templates</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Quick responses to save time and maintain consistency
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Template Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{templates.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Available templates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Most Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">
              {templates.sort((a, b) => b.useCount - a.useCount)[0]?.title || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {templates.sort((a, b) => b.useCount - a.useCount)[0]?.useCount || 0} uses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Response Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">~45min</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Template Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground mt-1">Of responses use templates</p>
          </CardContent>
        </Card>
      </div>

      {/* Template Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Positive Review Templates */}
        <Card className="border-green-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <CardTitle>Positive Review Templates</CardTitle>
                <CardDescription>Quick responses for 4-5 star reviews</CardDescription>
              </div>
              <Badge variant="secondary">{categorizedTemplates.positive.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {categorizedTemplates.positive.map((template) => (
              <div key={template.id} className="border rounded-lg p-3 space-y-3 hover:border-green-300 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{template.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{template.text}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span>Used {template.useCount} times</span>
                    {template.lastUsed && <span>• {template.lastUsed}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Use
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyTemplate(template.text)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {template.id.startsWith('custom-') && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Negative Review Templates */}
        <Card className="border-orange-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <CardTitle>Improvement Response Templates</CardTitle>
                <CardDescription>Professional responses for 1-3 star reviews</CardDescription>
              </div>
              <Badge variant="secondary">{categorizedTemplates.negative.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {categorizedTemplates.negative.map((template) => (
              <div key={template.id} className="border rounded-lg p-3 space-y-3 hover:border-orange-300 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{template.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{template.text}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span>Used {template.useCount} times</span>
                    {template.lastUsed && <span>• {template.lastUsed}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Use
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyTemplate(template.text)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {template.id.startsWith('custom-') && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Photo Review Templates */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <CardTitle>Photo Review Templates</CardTitle>
                <CardDescription>Responses for reviews with photos</CardDescription>
              </div>
              <Badge variant="secondary">{categorizedTemplates.photo.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {categorizedTemplates.photo.map((template) => (
              <div key={template.id} className="border rounded-lg p-3 space-y-3 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{template.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{template.text}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span>Used {template.useCount} times</span>
                    {template.lastUsed && <span>• {template.lastUsed}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Use
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyTemplate(template.text)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {template.id.startsWith('custom-') && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions & Review Requests */}
        <Card className="border-purple-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              <div className="flex-1">
                <CardTitle>Review Request Automation</CardTitle>
                <CardDescription>Send review requests to customers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send to Recent Customers (Last 7 Days)
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Request from VIP Customers
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Send className="h-4 w-4 mr-2" />
              Follow-up with Non-Reviewers
            </Button>
            
            <div className="pt-4 border-t space-y-3">
              <h4 className="font-medium text-sm">Request Campaign Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sent this month:</span>
                  <span className="font-medium">156 emails</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response rate:</span>
                  <span className="font-medium text-green-600">34%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. rating received:</span>
                  <span className="font-medium">4.7 ⭐</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t">
              <Button className="w-full" variant="default">
                <Plus className="h-4 w-4 mr-2" />
                Create New Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Template Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Create a custom response template to use across your reviews
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Template Title</label>
              <Input
                placeholder="e.g., Thank You - Premium Service"
                value={newTemplate.title}
                onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                className="w-full border rounded-md p-2 text-sm"
                value={newTemplate.category}
                onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value as Template["category"] })}
              >
                <option value="positive">Positive (4-5 stars)</option>
                <option value="negative">Negative (1-3 stars)</option>
                <option value="photo">Photo Reviews</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Template Text</label>
              <Textarea
                placeholder="Write your response template here..."
                rows={4}
                value={newTemplate.text}
                onChange={(e) => setNewTemplate({ ...newTemplate, text: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateTemplate}
              >
                Create Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
