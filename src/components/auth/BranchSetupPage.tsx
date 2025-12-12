import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { BranchForm } from "../management/BranchForm";

interface BranchSetupPageProps {
  user: {
    name: string;
    centerName: string;
  };
  onComplete: (branchData: any) => void;
  onSkip: () => void;
}

export function BranchSetupPage({ user, onComplete, onSkip }: BranchSetupPageProps) {
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome to Letwash, {user.name}!
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Let's set up your first branch location for <span className="font-semibold">{user.centerName}</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Why set up a branch?</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Manage bookings and appointments for your location</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Track revenue and analytics per branch</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Configure services, packages, and pricing</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Start accepting customer bookings immediately</span>
                </li>
              </ul>
            </div>

            <div className="text-center text-sm text-gray-600">
              You can add more branches later from the dashboard
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={onSkip}
            >
              Skip for now
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Set Up First Branch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Create Your First Branch</CardTitle>
            <CardDescription>
              Fill in the details for your branch location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BranchForm
              onSave={(branchData) => {
                onComplete(branchData);
              }}
              onCancel={() => setShowForm(false)}
              centerId="temp"
              centerName={user.centerName}
              businessModules={[]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
