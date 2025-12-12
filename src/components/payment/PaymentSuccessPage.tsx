import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Download, Calendar } from 'lucide-react';

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const bookingId = searchParams.get('bookingId');
  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setBookingDetails(data.data);
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Your booking has been confirmed
            </p>
          </div>
        </div>

        {/* Booking Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Confirmation</CardTitle>
            <CardDescription>
              Reservation Code: {bookingDetails?.reservationCode || 'Loading...'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {bookingDetails && (
              <>
                {/* Service Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Service Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Service</p>
                      <p className="font-medium">{bookingDetails.service?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Vehicle Type</p>
                      <p className="font-medium">{bookingDetails.vehicleType}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{bookingDetails.duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount Paid</p>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(parseFloat(bookingDetails.finalPrice))}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Appointment</h3>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{formatDate(bookingDetails.startTime)}</p>
                      <p className="text-sm text-muted-foreground">
                        {bookingDetails.branch?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bookingDetails.branch?.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="text-muted-foreground">Name:</span> {bookingDetails.customerName}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {bookingDetails.customerPhone}</p>
                    {bookingDetails.customerEmail && (
                      <p><span className="text-muted-foreground">Email:</span> {bookingDetails.customerEmail}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="border-t pt-4 space-y-3">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.print()}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-center">
              A confirmation email has been sent to your registered email address.
              Please arrive 5 minutes before your scheduled time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
