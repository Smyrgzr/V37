// Test file to check basic React functionality
export default function TestApp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="text-center space-y-4 p-8">
        <h1 className="text-4xl font-bold text-neutral-900">
          ✅ React is Working!
        </h1>
        <p className="text-lg text-neutral-600">
          The application is loading correctly.
        </p>
        <p className="text-sm text-neutral-500">
          If you see this message, there's no fundamental issue with the build.
        </p>
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900">
            Debug Info:
          </p>
          <p className="text-xs text-blue-700 mt-2">
            Timestamp: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
