/**
 * WALK-IN TRANSACTION LIST VIEW
 * ==============================
 * 
 * Real-time transaction list for walk-in business modules
 * Shows active, recent, and upcoming transactions
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../ui/utils";
import {
  Radio,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Car,
  Zap,
  TrendingUp,
  Activity,
} from "lucide-react";
import { motion } from "motion/react";
import { Station } from "../management/StationStatusManager";
import { BusinessModule, getModuleConfig } from "../../types/business-modules";

interface Transaction {
  id: string;
  stationId: string;
  stationName: string;
  customer: string;
  service: string;
  price: number;
  status: "active" | "completed" | "waiting";
  startTime: Date;
  estimatedEndTime: Date;
  actualEndTime?: Date;
  duration: number; // minutes
}

interface WalkInTransactionListProps {
  stations: Station[];
  module?: BusinessModule;
  selectedDate: Date;
}

export function WalkInTransactionList({
  stations,
  module,
  selectedDate,
}: WalkInTransactionListProps) {
  // Filter stations
  const filteredStations = stations.filter(s => 
    s.operationModel === "walk-in" &&
    (module ? s.businessModule === module : true)
  );

  // Generate mock transactions based on station status
  const generateTransactions = (): Transaction[] => {
    const transactions: Transaction[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDay = new Date(selectedDate);
    selectedDay.setHours(0, 0, 0, 0);
    
    const isToday = today.getTime() === selectedDay.getTime();
    
    filteredStations.forEach((station, index) => {
      // Active transactions
      if (station.status === "occupied" && station.currentBooking) {
        const startTime = new Date();
        startTime.setMinutes(startTime.getMinutes() - (station.capacity?.avgServiceTime || 15) / 2);
        
        const endTime = new Date();
        const endsInMatch = station.currentBooking.endsIn?.match(/(\d+)/);
        const remainingMinutes = endsInMatch ? parseInt(endsInMatch[1]) : 10;
        endTime.setMinutes(endTime.getMinutes() + remainingMinutes);

        transactions.push({
          id: `txn-active-${station.id}`,
          stationId: station.id,
          stationName: station.name,
          customer: station.currentBooking.customer,
          service: station.currentBooking.service,
          price: Math.random() * 50 + 30,
          status: "active",
          startTime,
          estimatedEndTime: endTime,
          duration: station.capacity?.avgServiceTime || 15,
        });
      }

      // Completed transactions (mock for today)
      if (isToday && index < 3) {
        const completedTime = new Date();
        completedTime.setHours(Math.floor(Math.random() * 4) + 6, Math.floor(Math.random() * 60));
        
        const duration = station.capacity?.avgServiceTime || 15;
        const startTime = new Date(completedTime);
        startTime.setMinutes(startTime.getMinutes() - duration);

        transactions.push({
          id: `txn-completed-${station.id}-${index}`,
          stationId: station.id,
          stationName: station.name,
          customer: ["Mike Johnson", "Emma Davis", "Chris Lee"][index],
          service: ["Express Wash", "Basic Wash", "Premium Detail"][index],
          price: [25.99, 35.99, 55.99][index],
          status: "completed",
          startTime,
          estimatedEndTime: completedTime,
          actualEndTime: completedTime,
          duration,
        });
      }

      // Waiting (in queue)
      if (station.nextBooking && isToday) {
        const waitTime = new Date();
        waitTime.setMinutes(waitTime.getMinutes() + 5);
        
        const endTime = new Date(waitTime);
        endTime.setMinutes(endTime.getMinutes() + (station.capacity?.avgServiceTime || 15));

        transactions.push({
          id: `txn-waiting-${station.id}`,
          stationId: station.id,
          stationName: station.name,
          customer: station.nextBooking.customer,
          service: "Quick Wash",
          price: Math.random() * 40 + 20,
          status: "waiting",
          startTime: waitTime,
          estimatedEndTime: endTime,
          duration: station.capacity?.avgServiceTime || 15,
        });
      }
    });

    return transactions.sort((a, b) => {
      // Sort by: active first, then waiting, then completed (most recent)
      const statusOrder = { active: 0, waiting: 1, completed: 2 };
      if (a.status !== b.status) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return b.startTime.getTime() - a.startTime.getTime();
    });
  };

  const transactions = generateTransactions();

  const activeCount = transactions.filter(t => t.status === "active").length;
  const completedCount = transactions.filter(t => t.status === "completed").length;
  const waitingCount = transactions.filter(t => t.status === "waiting").length;
  const totalRevenue = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.price, 0);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status: Transaction["status"]) => {
    switch (status) {
      case "active":
        return {
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: Radio,
          label: "In Progress",
        };
      case "completed":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle,
          label: "Completed",
        };
      case "waiting":
        return {
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: Clock,
          label: "Waiting",
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Radio size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-xs text-neutral-600">Active Now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-xs text-neutral-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock size={20} className="text-yellow-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{waitingCount}</p>
                <p className="text-xs text-neutral-600">In Queue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <DollarSign size={20} className="text-purple-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(0)}</p>
                <p className="text-xs text-neutral-600">Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} />
              Transaction History
            </CardTitle>
            <Badge variant="secondary">
              {transactions.length} transactions
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length > 0 ? (
            <ScrollArea className="h-[600px]">
              <div className="p-6 space-y-3">
                {transactions.map((transaction, index) => {
                  const statusConfig = getStatusConfig(transaction.status);
                  const StatusIcon = statusConfig.icon;
                  const moduleConfig = module ? getModuleConfig(module) : null;

                  return (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className={cn(
                        "border-2",
                        transaction.status === "active" && "ring-2 ring-blue-200"
                      )}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "size-10 rounded-lg flex items-center justify-center",
                                statusConfig.color
                              )}>
                                <StatusIcon size={20} />
                              </div>
                              <div>
                                <p className="font-semibold">{transaction.customer}</p>
                                <p className="text-sm text-neutral-600">{transaction.service}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className={statusConfig.color}>
                              {statusConfig.label}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-neutral-600">
                              <Car size={14} />
                              <span>{transaction.stationName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-600">
                              <Clock size={14} />
                              <span>{transaction.duration} min</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-600">
                              <Zap size={14} />
                              <span>
                                {formatTime(transaction.startTime)} - {formatTime(transaction.estimatedEndTime)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 font-semibold text-green-700">
                              <DollarSign size={14} />
                              <span>${transaction.price.toFixed(2)}</span>
                            </div>
                          </div>

                          {transaction.status === "active" && (
                            <div className="mt-3 pt-3 border-t">
                              <div className="flex items-center justify-between text-xs text-blue-600">
                                <span>In progress...</span>
                                <span>
                                  Ends in {Math.round((transaction.estimatedEndTime.getTime() - new Date().getTime()) / 60000)} min
                                </span>
                              </div>
                              <div className="mt-2 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-blue-500"
                                  initial={{ width: "30%" }}
                                  animate={{ width: "70%" }}
                                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                />
                              </div>
                            </div>
                          )}

                          {moduleConfig && (
                            <div className="mt-3 pt-3 border-t">
                              <Badge variant="outline" className={cn("text-xs", moduleConfig.bgColor, moduleConfig.color)}>
                                {moduleConfig.name}
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="p-12 text-center">
              <Activity size={48} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-neutral-500">No transactions found for selected date</p>
              <p className="text-sm text-neutral-400 mt-2">
                Walk-in transactions will appear here in real-time
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      {module && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              Module Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{filteredStations.length}</p>
                <p className="text-xs text-neutral-600 mt-1">Active Stations</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(filteredStations.reduce((acc, s) => acc + (s.capacity?.servicesPerHour || 0), 0))}
                </p>
                <p className="text-xs text-neutral-600 mt-1">Services/Hour</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {filteredStations.length > 0
                    ? Math.round((activeCount / filteredStations.length) * 100)
                    : 0}%
                </p>
                <p className="text-xs text-neutral-600 mt-1">Utilization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
