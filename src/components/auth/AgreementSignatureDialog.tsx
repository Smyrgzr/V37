import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface Agreement {
  id: string;
  type: string;
  version: string;
  title: string;
  content: string;
  effectiveDate: string;
}

interface AgreementSignatureDialogProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
  apiUrl?: string;
}

export function AgreementSignatureDialog({
  userId,
  open,
  onOpenChange,
  onComplete,
  apiUrl = 'http://localhost:5000/api/v1'
}: AgreementSignatureDialogProps) {
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      fetchRequiredAgreements();
    }
  }, [open]);

  const fetchRequiredAgreements = async () => {
    try {
      setLoading(true);
      setError('');

      // Get user's agreement status
      const statusRes = await fetch(`${apiUrl}/agreements/user/${userId}/status`);
      const statusData = await statusRes.json();

      if (!statusData.success) {
        throw new Error(statusData.error);
      }

      if (statusData.data.allSigned) {
        onComplete();
        return;
      }

      // Fetch missing agreements
      const agreementsToSign: Agreement[] = [];
      for (const missing of statusData.data.missingAgreements) {
        const res = await fetch(`${apiUrl}/agreements/${missing.type}`);
        const data = await res.json();
        if (data.success) {
          agreementsToSign.push(data.data);
        }
      }

      setAgreements(agreementsToSign);
      setCurrentIndex(0);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch agreements');
    } finally {
      setLoading(false);
    }
  };

  const handleSign = async () => {
    try {
      setLoading(true);
      setError('');

      const currentAgreement = agreements[currentIndex];

      const res = await fetch(`${apiUrl}/agreements/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          agreementId: currentAgreement.id,
          signatureData: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
          }
        })
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      // Move to next agreement or complete
      if (currentIndex < agreements.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setAccepted(false);
      } else {
        onComplete();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign agreement');
    } finally {
      setLoading(false);
    }
  };

  const currentAgreement = agreements[currentIndex];

  if (loading && agreements.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!currentAgreement) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {currentAgreement.title}
          </DialogTitle>
          <DialogDescription>
            Version {currentAgreement.version} • Agreement {currentIndex + 1} of {agreements.length}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-96 rounded-md border p-4">
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: currentAgreement.content }} />
          </div>
        </ScrollArea>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="accept"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked as boolean)}
          />
          <label
            htmlFor="accept"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and accept this agreement
          </label>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSign}
            disabled={!accepted || loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {currentIndex < agreements.length - 1 ? 'Accept & Continue' : 'Accept & Complete'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
