import PieCard from "./PieCard";
import RecentExpensCard from "./RecentExpenseCard";
import MonthlyChart from "./MonthlyChart";
import { useNavigation } from "react-router";
import DashboardSkeleton from "./DashboardSkeleton";

const ExpenseDashboard = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Expense Dashboard</h1>

      {/* Top Row: Pie Chart + Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart - Category Breakdown */}
        <PieCard />
        {/* Recent Expenses */}
        <RecentExpensCard />
      </div>

      {/* Bottom Row: Monthly Area Chart */}
      <MonthlyChart />
    </div>
  );
};

export default ExpenseDashboard;
