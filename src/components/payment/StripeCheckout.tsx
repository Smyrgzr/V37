import { useState, useEffect } from 'react';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

// Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface StripeCheckoutProps {
  bookingId: string;
  userId: string;
  amount: number;
  currency?: string;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
  apiUrl?: string;
}

function CheckoutForm({ 
  bookingId, 
  userId, 
  amount, 
  currency = 'try',
  onSuccess, 
  onError,
  apiUrl = 'http://localhost:5000/api/v1'
}: StripeCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      // Confirm payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success?bookingId=${bookingId}`,
        },
        redirect: 'if_required'
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        setSuccess(true);
        onSuccess?.(paymentIntent.id);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground">
                Your booking has been confirmed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay {new Intl.NumberFormat('tr-TR', { 
              style: 'currency', 
              currency: currency.toUpperCase() 
            }).format(amount)}
          </>
        )}
      </Button>
    </form>
  );
}

export function StripeCheckout(props: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commissionInfo, setCommissionInfo] = useState<{
    commissionAmount: number;
    netAmount: number;
  } | null>(null);

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('accessToken');

      const response = await fetch(`${props.apiUrl}/stripe/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookingId: props.bookingId,
          userId: props.userId,
          amount: props.amount,
          currency: props.currency || 'try'
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setClientSecret(data.data.clientSecret);
      setCommissionInfo({
        commissionAmount: data.data.commissionAmount,
        netAmount: data.data.netAmount
      });
    } catch (err: any) {
      console.error('Error creating payment intent:', err);
      setError(err.message || 'Failed to initialize payment');
      props.onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button 
            onClick={createPaymentIntent} 
            variant="outline" 
            className="w-full mt-4"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#0066cc',
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
        <CardDescription>
          Complete your booking payment securely with Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        {commissionInfo && (
          <div className="mb-6 p-4 bg-muted rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking Amount:</span>
              <span className="font-medium">
                {new Intl.NumberFormat('tr-TR', { 
                  style: 'currency', 
                  currency: props.currency?.toUpperCase() || 'TRY' 
                }).format(props.amount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform Fee:</span>
              <span className="text-sm">
                {new Intl.NumberFormat('tr-TR', { 
                  style: 'currency', 
                  currency: props.currency?.toUpperCase() || 'TRY' 
                }).format(commissionInfo.commissionAmount)}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-medium">You'll Receive:</span>
              <span className="font-semibold text-green-600">
                {new Intl.NumberFormat('tr-TR', { 
                  style: 'currency', 
                  currency: props.currency?.toUpperCase() || 'TRY' 
                }).format(commissionInfo.netAmount)}
              </span>
            </div>
          </div>
        )}

        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm {...props} />
          </Elements>
        )}
      </CardContent>
    </Card>
  );
}
