import { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  Droplets,
  Wind,
  Sparkles,
  ClipboardCheck,
  Car,
  Play,
  Pause,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

export interface ServiceStage {
  id: string;
  label: string;
  icon: React.ElementType;
  duration: number; // in minutes
  color: string;
}

const DEFAULT_STAGES: ServiceStage[] = [
  {
    id: "check-in",
    label: "Check-In",
    icon: ClipboardCheck,
    duration: 5,
    color: "blue",
  },
  {
    id: "pre-wash",
    label: "Pre-Wash",
    icon: Droplets,
    duration: 10,
    color: "cyan",
  },
  {
    id: "washing",
    label: "Main Wash",
    icon: Car,
    duration: 20,
    color: "indigo",
  },
  {
    id: "rinsing",
    label: "Rinsing",
    icon: Droplets,
    duration: 8,
    color: "blue",
  },
  {
    id: "drying",
    label: "Drying",
    icon: Wind,
    duration: 12,
    color: "sky",
  },
  {
    id: "detailing",
    label: "Detailing",
    icon: Sparkles,
    duration: 25,
    color: "purple",
  },
  {
    id: "quality-check",
    label: "Quality Check",
    icon: CheckCircle,
    duration: 5,
    color: "green",
  },
];

export interface ServiceProgressTrackerProps {
  reservationId: string;
  serviceName: string;
  customerName: string;
  vehicleInfo: string;
  currentProgress: number; // 0-100
  currentStage?: string;
  stages?: ServiceStage[];
  isActive?: boolean;
  isPaused?: boolean;
  onProgressUpdate?: (reservationId: string, progress: number, stage: string) => void;
  onComplete?: (reservationId: string) => void;
  onPause?: (reservationId: string) => void;
  onResume?: (reservationId: string) => void;
}

export function ServiceProgressTracker({
  reservationId,
  serviceName,
  customerName,
  vehicleInfo,
  currentProgress: initialProgress,
  currentStage: initialStage,
  stages = DEFAULT_STAGES,
  isActive = false,
  isPaused = false,
  onProgressUpdate,
  onComplete,
  onPause,
  onResume,
}: ServiceProgressTrackerProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [currentStageId, setCurrentStageId] = useState(
    initialStage || stages[0]?.id
  );
  const [elapsedTime, setElapsedTime] = useState(0);

  // Auto-increment progress (for demo purposes)
  useEffect(() => {
    if (!isActive || isPaused || progress >= 100) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 0.5, 100); // 0.5% every second
        
        // Calculate which stage we're in based on progress
        const totalDuration = stages.reduce((sum, s) => sum + s.duration, 0);
        let accumulatedDuration = 0;
        let newStageId = stages[0]?.id;

        for (const stage of stages) {
          accumulatedDuration += stage.duration;
          const stageProgress = (accumulatedDuration / totalDuration) * 100;
          if (newProgress <= stageProgress) {
            newStageId = stage.id;
            break;
          }
        }

        if (newStageId !== currentStageId) {
          setCurrentStageId(newStageId);
          onProgressUpdate?.(reservationId, newProgress, newStageId);
        }

        if (newProgress >= 100 && prev < 100) {
          onComplete?.(reservationId);
        }

        return newProgress;
      });

      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, progress, currentStageId, reservationId, stages, onProgressUpdate, onComplete]);

  const getCurrentStage = () => {
    return stages.find((s) => s.id === currentStageId) || stages[0];
  };

  const getStageStatus = (stageId: string): "completed" | "active" | "pending" => {
    const stageIndex = stages.findIndex((s) => s.id === stageId);
    const currentIndex = stages.findIndex((s) => s.id === currentStageId);

    if (stageIndex < currentIndex) return "completed";
    if (stageIndex === currentIndex) return "active";
    return "pending";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const currentStage = getCurrentStage();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{serviceName}</h3>
              {isPaused && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                  Paused
                </span>
              )}
              {isActive && !isPaused && (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full animate-pulse">
                  Active
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-600">{customerName}</p>
            <p className="text-sm text-neutral-500">{vehicleInfo}</p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-neutral-600 flex items-center gap-1">
              <Clock className="size-3" />
              {formatTime(elapsedTime)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-700 font-medium">
              {currentStage.label}
            </span>
            <span className="text-neutral-500">
              {progress >= 100 ? "Completed" : "In Progress"}
            </span>
          </div>
          <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500 ease-linear",
                progress >= 100 ? "bg-green-500" : "bg-blue-500"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stage Timeline */}
        <div className="grid grid-cols-7 gap-2">
          {stages.map((stage) => {
            const status = getStageStatus(stage.id);
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "size-10 rounded-full flex items-center justify-center transition-all",
                    status === "completed" &&
                      "bg-green-100 text-green-600 border-2 border-green-500",
                    status === "active" &&
                      "bg-blue-100 text-blue-600 border-2 border-blue-500 ring-4 ring-blue-100 animate-pulse",
                    status === "pending" &&
                      "bg-neutral-100 text-neutral-400 border-2 border-neutral-300"
                  )}
                >
                  {status === "completed" ? (
                    <CheckCircle className="size-5" />
                  ) : (
                    <Icon className="size-5" />
                  )}
                </div>
                <p
                  className={cn(
                    "text-xs text-center",
                    status === "completed" && "text-green-700 font-medium",
                    status === "active" && "text-blue-700 font-semibold",
                    status === "pending" && "text-neutral-500"
                  )}
                >
                  {stage.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        {isActive && progress < 100 && (
          <div className="flex gap-2">
            {isPaused ? (
              <Button
                onClick={() => onResume?.(reservationId)}
                variant="default"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Play className="size-4 mr-2" />
                Resume Service
              </Button>
            ) : (
              <Button
                onClick={() => onPause?.(reservationId)}
                variant="outline"
                className="flex-1"
              >
                <Pause className="size-4 mr-2" />
                Pause Service
              </Button>
            )}
          </div>
        )}

        {/* Completion Message */}
        {progress >= 100 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="size-6 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Service Completed!</p>
                <p className="text-sm text-green-700">
                  Ready for quality check and customer pickup
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
