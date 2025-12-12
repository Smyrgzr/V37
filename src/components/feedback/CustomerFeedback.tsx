/**
 * CUSTOMER FEEDBACK & RATING
 * ==========================
 * Post-service feedback collection from customers
 */

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, Send, ThumbsUp, MessageSquare, CheckCircle } from "lucide-react";
import { cn } from "../ui/utils";
import type { Reservation } from "../../types/reservation";

export interface FeedbackData {
  rating: number; // 1-5 stars
  serviceQuality: number; // 1-5
  workerProfessionalism: number; // 1-5
  cleanliness: number; // 1-5
  value: number; // 1-5
  comments?: string;
  wouldRecommend: boolean;
}

export interface CustomerFeedbackProps {
  reservation: Reservation;
  onSubmit: (feedback: FeedbackData) => void;
  readonly?: boolean;
  existingFeedback?: FeedbackData;
}

export function CustomerFeedback({
  reservation,
  onSubmit,
  readonly = false,
  existingFeedback,
}: CustomerFeedbackProps) {
  const [rating, setRating] = useState(existingFeedback?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [serviceQuality, setServiceQuality] = useState(
    existingFeedback?.serviceQuality || 0
  );
  const [workerProfessionalism, setWorkerProfessionalism] = useState(
    existingFeedback?.workerProfessionalism || 0
  );
  const [cleanliness, setCleanliness] = useState(
    existingFeedback?.cleanliness || 0
  );
  const [value, setValue] = useState(existingFeedback?.value || 0);
  const [comments, setComments] = useState(existingFeedback?.comments || "");
  const [wouldRecommend, setWouldRecommend] = useState(
    existingFeedback?.wouldRecommend ?? true
  );
  const [submitted, setSubmitted] = useState(!!existingFeedback);

  const handleSubmit = () => {
    if (rating === 0) return;

    const feedback: FeedbackData = {
      rating,
      serviceQuality,
      workerProfessionalism,
      cleanliness,
      value,
      comments: comments.trim() || undefined,
      wouldRecommend,
    };

    onSubmit(feedback);
    setSubmitted(true);
  };

  const RatingStars = ({
    value,
    onChange,
    label,
    readonly = false,
  }: {
    value: number;
    onChange?: (val: number) => void;
    label: string;
    readonly?: boolean;
  }) => {
    const [hovered, setHovered] = useState(0);

    return (
      <div className="space-y-2">
        <p className="text-sm font-medium">{label}</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={readonly}
              onClick={() => !readonly && onChange?.(star)}
              onMouseEnter={() => !readonly && setHovered(star)}
              onMouseLeave={() => !readonly && setHovered(0)}
              className="focus:outline-none disabled:cursor-default"
            >
              <Star
                className={cn(
                  "size-6 transition-all",
                  star <= (hovered || value)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-neutral-300"
                )}
              />
            </button>
          ))}
          {value > 0 && (
            <span className="ml-2 text-sm text-neutral-600">
              {value}/5
            </span>
          )}
        </div>
      </div>
    );
  };

  if (submitted) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="size-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-neutral-600">
            Your feedback has been submitted successfully.
          </p>
          {rating >= 4 && (
            <Badge className="mt-4 bg-green-100 text-green-700">
              <ThumbsUp className="size-3 mr-1" />
              Great rating!
            </Badge>
          )}
        </div>

        {/* Display submitted feedback */}
        {readonly && existingFeedback && (
          <div className="mt-6 pt-6 border-t space-y-4">
            <RatingStars
              value={existingFeedback.rating}
              label="Overall Rating"
              readonly
            />
            {existingFeedback.comments && (
              <div>
                <p className="text-sm font-medium mb-2">Comments</p>
                <p className="text-sm text-neutral-600 p-3 bg-neutral-50 rounded">
                  {existingFeedback.comments}
                </p>
              </div>
            )}
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-1">How was your experience?</h3>
        <p className="text-sm text-neutral-600">
          Your feedback helps us improve our service
        </p>
      </div>

      {/* Service Info */}
      <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-neutral-600">Service</p>
            <p className="font-medium">{reservation.services[0]?.name}</p>
          </div>
          <div>
            <p className="text-neutral-600">Worker</p>
            <p className="font-medium">
              {reservation.assignedStaff?.name || "Staff"}
            </p>
          </div>
          <div>
            <p className="text-neutral-600">Date</p>
            <p className="font-medium">
              {reservation.scheduledStart.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-neutral-600">Vehicle</p>
            <p className="font-medium">{reservation.customer.vehiclePlate}</p>
          </div>
        </div>
      </div>

      {/* Overall Rating */}
      <div className="mb-6 p-6 border border-blue-200 bg-blue-50 rounded-lg">
        <RatingStars
          value={rating}
          onChange={setRating}
          label="Overall Experience"
        />
      </div>

      {/* Detailed Ratings */}
      <div className="mb-6 space-y-4">
        <p className="font-medium">Rate specific aspects:</p>
        
        <RatingStars
          value={serviceQuality}
          onChange={setServiceQuality}
          label="Service Quality"
        />
        
        <RatingStars
          value={workerProfessionalism}
          onChange={setWorkerProfessionalism}
          label="Worker Professionalism"
        />
        
        <RatingStars
          value={cleanliness}
          onChange={setCleanliness}
          label="Cleanliness Result"
        />
        
        <RatingStars value={value} onChange={setValue} label="Value for Money" />
      </div>

      {/* Recommendation */}
      <div className="mb-6 p-4 border rounded-lg">
        <p className="font-medium mb-3">Would you recommend us?</p>
        <div className="flex gap-3">
          <Button
            onClick={() => setWouldRecommend(true)}
            variant={wouldRecommend ? "default" : "outline"}
            className={cn(
              "flex-1",
              wouldRecommend && "bg-green-600 hover:bg-green-700"
            )}
          >
            <ThumbsUp className="size-4 mr-2" />
            Yes
          </Button>
          <Button
            onClick={() => setWouldRecommend(false)}
            variant={!wouldRecommend ? "default" : "outline"}
            className={cn(
              "flex-1",
              !wouldRecommend && "bg-red-600 hover:bg-red-700"
            )}
          >
            No
          </Button>
        </div>
      </div>

      {/* Comments */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Additional Comments (Optional)
        </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Tell us more about your experience..."
          className="w-full min-h-24 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={500}
        />
        <p className="text-xs text-neutral-500 mt-1">
          {comments.length}/500 characters
        </p>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={rating === 0}
        className="w-full"
      >
        <Send className="size-4 mr-2" />
        Submit Feedback
      </Button>
    </Card>
  );
}
