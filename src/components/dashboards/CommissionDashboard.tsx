import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface CommissionStats {
  byStatus: Array<{
    status: string;
    _sum: { commissionAmount: number };
    _count: number;
  }>;
  pendingPayout: number;
  totalPaid: number;
  paidCount: number;
}

interface Commission {
  id: string;
  transactionAmount: number;
  commissionRate: number;
  commissionAmount: number;
  status: string;
  createdAt: string;
  paidAt?: string;
  transaction: {
    id: string;
    type: string;
    createdAt: string;
  };
}

interface CommissionDashboardProps {
  ownerId: string;
  apiUrl?: string;
}

export function CommissionDashboard({ 
  ownerId, 
  apiUrl = 'http://localhost:5000/api/v1' 
}: CommissionDashboardProps) {
  const [stats, setStats] = useState<CommissionStats | null>(null);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [ownerId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [statsRes, commissionsRes] = await Promise.all([
        fetch(`${apiUrl}/commissions/stats/${ownerId}`),
        fetch(`${apiUrl}/commissions/owner/${ownerId}?limit=20`)
      ]);

      const statsData = await statsRes.json();
      const commissionsData = await commissionsRes.json();

      if (statsData.success) setStats(statsData.data);
      if (commissionsData.success) setCommissions(commissionsData.data.commissions);
    } catch (error) {
      console.error('Error fetching commission data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      PENDING: { variant: 'secondary', icon: Clock },
      APPROVED: { variant: 'default', icon: CheckCircle },
      PAID: { variant: 'success', icon: CheckCircle },
      DISPUTED: { variant: 'destructive', icon: AlertCircle }
    };

    const config = variants[status] || variants.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Payout</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{formatCurrency(stats?.pendingPayout || 0)}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval & payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{formatCurrency(stats?.totalPaid || 0)}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.paidCount || 0} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Commission Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {commissions[0]?.commissionRate || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Based on your subscription tier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Commissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
          <CardDescription>
            Track your Letwash platform fees and payouts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction Amount</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paid Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No commissions yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    commissions.map((commission) => (
                      <TableRow key={commission.id}>
                        <TableCell>{formatDate(commission.createdAt)}</TableCell>
                        <TableCell>{formatCurrency(commission.transactionAmount)}</TableCell>
                        <TableCell>{commission.commissionRate}%</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(commission.commissionAmount)}
                        </TableCell>
                        <TableCell>{getStatusBadge(commission.status)}</TableCell>
                        <TableCell>
                          {commission.paidAt ? formatDate(commission.paidAt) : '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="pending">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction Amount</TableHead>
                    <TableHead>Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions
                    .filter((c) => c.status === 'PENDING' || c.status === 'APPROVED')
                    .map((commission) => (
                      <TableRow key={commission.id}>
                        <TableCell>{formatDate(commission.createdAt)}</TableCell>
                        <TableCell>{formatCurrency(commission.transactionAmount)}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(commission.commissionAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="paid">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction Amount</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Paid Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions
                    .filter((c) => c.status === 'PAID')
                    .map((commission) => (
                      <TableRow key={commission.id}>
                        <TableCell>{formatDate(commission.createdAt)}</TableCell>
                        <TableCell>{formatCurrency(commission.transactionAmount)}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(commission.commissionAmount)}
                        </TableCell>
                        <TableCell>{commission.paidAt ? formatDate(commission.paidAt) : '-'}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
