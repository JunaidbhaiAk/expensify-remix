import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-300 rounded-md" /> {/* Title */}
      {/* Top Row: Pie Chart + Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Skeleton */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="h-6 w-40 bg-gray-300 rounded-md mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded-md" />
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="h-48 w-48 rounded-full bg-gray-200" />
          </CardContent>
        </Card>

        {/* Recent Expenses Skeleton */}
        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-gray-300 rounded-md mb-2" />
            <div className="h-4 w-48 bg-gray-200 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded-md" />
                <div className="h-4 w-12 bg-gray-200 rounded-md" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      {/* Bottom Row: Monthly Chart Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-40 bg-gray-300 rounded-md mb-2" />
          <div className="h-4 w-64 bg-gray-200 rounded-md" />
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full bg-gray-200 rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
