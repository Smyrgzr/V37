import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StripeCheckout } from '@/components/payment/StripeCheckout';
import { toast } from 'sonner@2.0.3';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  userId: string;
  amount: number;
  currency?: string;
  onSuccess?: () => void;
}

export function PaymentDialog({
  open,
  onOpenChange,
  bookingId,
  userId,
  amount,
  currency = 'try',
  onSuccess
}: PaymentDialogProps) {
  const handleSuccess = (paymentIntentId: string) => {
    toast.success('Payment successful!', {
      description: 'Your booking has been confirmed.'
    });
    onSuccess?.();
    onOpenChange(false);
  };

  const handleError = (error: string) => {
    toast.error('Payment failed', {
      description: error
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Secure payment powered by Stripe
          </DialogDescription>
        </DialogHeader>
        
        <StripeCheckout
          bookingId={bookingId}
          userId={userId}
          amount={amount}
          currency={currency}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </DialogContent>
    </Dialog>
  );
}
