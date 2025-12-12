"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Camera, 
  Upload, 
  Check, 
  AlertTriangle,
  Info,
  Eye,
  Download,
  Sparkles
} from "lucide-react";
import { cn } from "../ui/utils";
import { Alert, AlertDescription } from "../ui/alert";

interface DetectedDamage {
  id: string;
  type: 'scratch' | 'dent' | 'chip' | 'crack' | 'rust';
  severity: 'minor' | 'moderate' | 'severe';
  location: string;
  confidence: number; // 0-100
  coordinates: { x: number; y: number; width: number; height: number };
  description: string;
}

interface InspectionResult {
  id: string;
  vehicleId: string;
  licensePlate: string;
  timestamp: Date;
  totalDamages: number;
  damagesList: DetectedDamage[];
  overallCondition: 'excellent' | 'good' | 'fair' | 'poor';
  aiConfidence: number;
  imageUrl: string;
}

export function VehicleDamageDetection() {
  const [selectedTab, setSelectedTab] = useState('demo');
  const [isScanning, setIsScanning] = useState(false);

  // Mock inspection result
  const mockInspection: InspectionResult = {
    id: 'insp_001',
    vehicleId: 'v_12345',
    licensePlate: 'ABC 1234',
    timestamp: new Date(),
    totalDamages: 4,
    damagesList: [
      {
        id: 'd1',
        type: 'scratch',
        severity: 'minor',
        location: 'Front bumper (right side)',
        confidence: 94,
        coordinates: { x: 520, y: 340, width: 80, height: 15 },
        description: 'Light surface scratch, 3 inches long'
      },
      {
        id: 'd2',
        type: 'dent',
        severity: 'moderate',
        location: 'Rear door (driver side)',
        confidence: 89,
        coordinates: { x: 180, y: 280, width: 60, height: 60 },
        description: 'Small dent, approximately 2 inches diameter'
      },
      {
        id: 'd3',
        type: 'chip',
        severity: 'minor',
        location: 'Hood (center)',
        confidence: 96,
        coordinates: { x: 400, y: 200, width: 20, height: 20 },
        description: 'Paint chip from rock impact'
      },
      {
        id: 'd4',
        type: 'crack',
        severity: 'severe',
        location: 'Windshield (passenger side)',
        confidence: 98,
        coordinates: { x: 450, y: 150, width: 120, height: 5 },
        description: 'Crack extending 5 inches from edge'
      }
    ],
    overallCondition: 'fair',
    aiConfidence: 92,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop'
  };

  const stats = {
    inspectionsToday: 23,
    damagesDetected: 67,
    disputesAvoided: 8,
    avgConfidence: 93
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'text-red-600 bg-red-100';
      case 'moderate': return 'text-orange-600 bg-orange-100';
      case 'minor': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDamageTypeIcon = (type: string) => {
    return AlertTriangle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">AI Vehicle Damage Detection</h2>
        <p className="text-muted-foreground mt-1">
          Computer Vision-powered pre-service inspection to avoid disputes
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inspections Today</p>
                <p className="text-2xl font-bold">{stats.inspectionsToday}</p>
              </div>
              <Camera className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Damages Detected</p>
                <p className="text-2xl font-bold text-orange-600">{stats.damagesDetected}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disputes Avoided</p>
                <p className="text-2xl font-bold text-green-600">{stats.disputesAvoided}</p>
              </div>
              <Check className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgConfidence}%</p>
              </div>
              <Sparkles className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Info */}
      <Alert className="border-purple-200 bg-purple-50">
        <Sparkles className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-900">
          <strong>YOLO v8 Object Detection Model</strong> trained on 100,000+ vehicle images with 96% mAP accuracy. 
          Detects scratches, dents, chips, cracks, and rust in real-time (0.3s per image).
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
          <TabsTrigger value="history">Inspection History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Demo Tab */}
        <TabsContent value="demo" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Upload/Capture */}
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Inspection</CardTitle>
                <CardDescription>Upload image or capture photo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isScanning && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={mockInspection.imageUrl}
                        alt="Vehicle"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={handleScan}>
                        <Camera className="w-4 h-4 mr-2" />
                        Scan for Damage
                      </Button>
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                )}

                {isScanning && (
                  <div className="border-2 border-blue-300 rounded-lg p-8 text-center bg-blue-50">
                    <div className="relative w-full aspect-video bg-blue-100 rounded-lg overflow-hidden mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                    <p className="text-blue-900 font-medium">AI analyzing vehicle...</p>
                    <p className="text-sm text-blue-700 mt-1">Detecting damages and measuring severity</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Detection Results</CardTitle>
                    <CardDescription>License Plate: {mockInspection.licensePlate}</CardDescription>
                  </div>
                  <Badge className="bg-purple-600 text-white">
                    {mockInspection.aiConfidence}% confident
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Overall Condition */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Condition</span>
                    <Badge 
                      className={cn(
                        mockInspection.overallCondition === 'excellent' && 'bg-green-600',
                        mockInspection.overallCondition === 'good' && 'bg-blue-600',
                        mockInspection.overallCondition === 'fair' && 'bg-yellow-600',
                        mockInspection.overallCondition === 'poor' && 'bg-red-600',
                        'text-white capitalize'
                      )}
                    >
                      {mockInspection.overallCondition}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {mockInspection.totalDamages} damage{mockInspection.totalDamages !== 1 ? 's' : ''} detected
                  </p>
                </div>

                {/* Damages List */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Detected Damages:</h4>
                  {mockInspection.damagesList.map((damage, idx) => {
                    const Icon = getDamageTypeIcon(damage.type);
                    return (
                      <Card key={damage.id} className={cn("border-l-4", getSeverityColor(damage.severity))}>
                        <CardContent className="pt-3 pb-3">
                          <div className="flex items-start gap-3">
                            <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                  <p className="font-medium text-sm capitalize">{damage.type}</p>
                                  <p className="text-xs text-muted-foreground">{damage.location}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {damage.confidence}%
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{damage.description}</p>
                              <Badge className={cn("text-xs mt-1", getSeverityColor(damage.severity))}>
                                {damage.severity}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Approve & Continue
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Annotated Image */}
          <Card>
            <CardHeader>
              <CardTitle>AI Damage Annotations</CardTitle>
              <CardDescription>Visual representation of detected damages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={mockInspection.imageUrl}
                  alt="Annotated Vehicle"
                  className="w-full h-full object-cover"
                />
                {/* Damage Annotations */}
                {mockInspection.damagesList.map((damage) => (
                  <div
                    key={damage.id}
                    className={cn(
                      "absolute border-2 rounded",
                      damage.severity === 'severe' && "border-red-500",
                      damage.severity === 'moderate' && "border-orange-500",
                      damage.severity === 'minor' && "border-yellow-500"
                    )}
                    style={{
                      left: `${(damage.coordinates.x / 800) * 100}%`,
                      top: `${(damage.coordinates.y / 450) * 100}%`,
                      width: `${(damage.coordinates.width / 800) * 100}%`,
                      height: `${(damage.coordinates.height / 450) * 100}%`
                    }}
                  >
                    <div className={cn(
                      "absolute -top-6 left-0 px-2 py-0.5 rounded text-xs font-medium text-white",
                      damage.severity === 'severe' && "bg-red-500",
                      damage.severity === 'moderate' && "bg-orange-500",
                      damage.severity === 'minor' && "bg-yellow-500"
                    )}>
                      {damage.type} ({damage.confidence}%)
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inspections</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Camera className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>Inspection history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Detection Settings</CardTitle>
              <CardDescription>Configure AI sensitivity and behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Info className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>Settings panel coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
