import moment from "moment";
import { useLoaderData } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { loader } from "~/routes/page";

export default function RecentExpensCard() {
  const { expenses } = useLoaderData<typeof loader>();
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>
          Last {recentExpenses?.length} transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentExpenses.map((expense) => (
          <div key={expense.id} className="flex justify-between">
            <div>
              <p className="font-medium">{expense.description}</p>
              <p className="text-sm text-muted-foreground">
                {expense.category}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">${expense.amount.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                {moment(expense.date).format("MMM Do YYYY")}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
