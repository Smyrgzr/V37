"use client";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto p-8 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-neutral-900">
            Letwash Platform
          </h1>
          <p className="text-xl text-neutral-600">
            Test Mode - Checking System
          </p>
        </div>
        
        <div className="p-6 bg-white border border-neutral-200 rounded-lg shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-green-500 animate-pulse"></div>
            <p className="font-medium">React is loading correctly</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-green-500 animate-pulse"></div>
            <p className="font-medium">Tailwind CSS is working</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-green-500 animate-pulse"></div>
            <p className="font-medium">Component rendering successfully</p>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">
            Debug Information:
          </p>
          <p className="text-xs text-blue-700">
            Timestamp: {new Date().toLocaleString('tr-TR')}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Status: System operational ✓
          </p>
        </div>
        
        <p className="text-sm text-neutral-500">
          If you see this message, the basic application structure is working.
          <br />
          The issue might be in a specific component or data loading.
        </p>
      </div>
    </div>
  );
}
