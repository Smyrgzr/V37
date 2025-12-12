"use client";

import { useNotifications } from "../../contexts/NotificationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Bell, Mail, Smartphone, Clock, Calendar } from "lucide-react";

export function NotificationPreferences() {
  const { preferences, updatePreferences } = useNotifications();

  const categoryLabels = {
    operational: 'Operational',
    financial: 'Financial',
    administrative: 'Administrative',
    customer: 'Customer',
    marketing: 'Marketing',
    ai_analytics: 'AI & Analytics',
  };

  const categoryDescriptions = {
    operational: 'Bookings, capacity, staff, equipment alerts',
    financial: 'Revenue, payments, subscriptions',
    administrative: 'Service requests, branches, system updates',
    customer: 'Reviews, complaints, churn risks',
    marketing: 'Campaigns, promotions, engagement',
    ai_analytics: 'AI predictions, anomalies, recommendations',
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold">Notification Preferences</h2>
        <p className="text-muted-foreground mt-1">
          Manage how and when you receive notifications
        </p>
      </div>

      {/* Channel Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <Label className="font-medium">In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications within the platform
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.channels.inApp}
              onCheckedChange={(checked) =>
                updatePreferences({
                  channels: { ...preferences.channels, inApp: checked },
                })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <Label className="font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Important updates via email
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.channels.email}
              onCheckedChange={(checked) =>
                updatePreferences({
                  channels: { ...preferences.channels, email: checked },
                })
              }
            />
          </div>

          {preferences.channels.email && (
            <div className="ml-8 space-y-2">
              <Label htmlFor="email" className="text-sm">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={preferences.channels.emailAddress || ''}
                onChange={(e) =>
                  updatePreferences({
                    channels: { ...preferences.channels, emailAddress: e.target.value },
                  })
                }
                placeholder="your.email@example.com"
              />
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <div>
                <Label className="font-medium">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Critical alerts via text message
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.channels.sms}
              onCheckedChange={(checked) =>
                updatePreferences({
                  channels: { ...preferences.channels, sms: checked },
                })
              }
            />
          </div>

          {preferences.channels.sms && (
            <div className="ml-8 space-y-2">
              <Label htmlFor="phone" className="text-sm">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={preferences.channels.smsNumber || ''}
                onChange={(e) =>
                  updatePreferences({
                    channels: { ...preferences.channels, smsNumber: e.target.value },
                  })
                }
                placeholder="+1-555-0123"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
          <CardDescription>Control which types of notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((category) => (
            <div key={category}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Label className="font-medium">{categoryLabels[category]}</Label>
                    <Badge variant="outline" className="text-xs">
                      {preferences.categories[category].frequency}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {categoryDescriptions[category]}
                  </p>
                </div>
                <Switch
                  checked={preferences.categories[category].enabled}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      categories: {
                        ...preferences.categories,
                        [category]: {
                          ...preferences.categories[category],
                          enabled: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Quiet Hours
          </CardTitle>
          <CardDescription>
            Pause non-critical notifications during specific hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Enable Quiet Hours</Label>
            <Switch
              checked={preferences.quietHours.enabled}
              onCheckedChange={(checked) =>
                updatePreferences({
                  quietHours: { ...preferences.quietHours, enabled: checked },
                })
              }
            />
          </div>

          {preferences.quietHours.enabled && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-sm">From</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={preferences.quietHours.startTime}
                    onChange={(e) =>
                      updatePreferences({
                        quietHours: {
                          ...preferences.quietHours,
                          startTime: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-sm">To</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={preferences.quietHours.endTime}
                    onChange={(e) =>
                      updatePreferences({
                        quietHours: {
                          ...preferences.quietHours,
                          endTime: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Allow Critical Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive urgent alerts during quiet hours
                  </p>
                </div>
                <Switch
                  checked={preferences.quietHours.allowCritical}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      quietHours: {
                        ...preferences.quietHours,
                        allowCritical: checked,
                      },
                    })
                  }
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Digest Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Digest Settings
          </CardTitle>
          <CardDescription>
            Receive summary emails at scheduled intervals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="font-medium">Daily Digest</Label>
              <Switch
                checked={preferences.digest.daily.enabled}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    digest: {
                      ...preferences.digest,
                      daily: { ...preferences.digest.daily, enabled: checked },
                    },
                  })
                }
              />
            </div>
            {preferences.digest.daily.enabled && (
              <div className="space-y-2">
                <Label htmlFor="dailyTime" className="text-sm">Delivery Time</Label>
                <Input
                  id="dailyTime"
                  type="time"
                  value={preferences.digest.daily.time}
                  onChange={(e) =>
                    updatePreferences({
                      digest: {
                        ...preferences.digest,
                        daily: { ...preferences.digest.daily, time: e.target.value },
                      },
                    })
                  }
                />
              </div>
            )}
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="font-medium">Weekly Digest</Label>
              <Switch
                checked={preferences.digest.weekly.enabled}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    digest: {
                      ...preferences.digest,
                      weekly: { ...preferences.digest.weekly, enabled: checked },
                    },
                  })
                }
              />
            </div>
            {preferences.digest.weekly.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weeklyDay" className="text-sm">Day</Label>
                  <select
                    id="weeklyDay"
                    value={preferences.digest.weekly.day}
                    onChange={(e) =>
                      updatePreferences({
                        digest: {
                          ...preferences.digest,
                          weekly: {
                            ...preferences.digest.weekly,
                            day: parseInt(e.target.value),
                          },
                        },
                      })
                    }
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="0">Sunday</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weeklyTime" className="text-sm">Time</Label>
                  <Input
                    id="weeklyTime"
                    type="time"
                    value={preferences.digest.weekly.time}
                    onChange={(e) =>
                      updatePreferences({
                        digest: {
                          ...preferences.digest,
                          weekly: {
                            ...preferences.digest.weekly,
                            time: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
