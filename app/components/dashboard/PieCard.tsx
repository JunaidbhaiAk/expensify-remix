import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { CHART_COLORS } from "~/lib/constant";
import { groupByCategory } from "~/lib/utils";
import type { CategoryExpense } from "./types";
import { useLoaderData } from "react-router";
import type { loader } from "~/routes/page";
import AddExpenses from "./AddExpensesDraft";

export default function PieCard() {
  const { expenses } = useLoaderData<typeof loader>();
  const pieData: CategoryExpense[] = groupByCategory(expenses);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription>How your money is being spent</CardDescription>
      </CardHeader>
      <CardContent>
        {pieData?.length ? (
          <ChartContainer
            config={{
              amount: {
                label: "Amount",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="mx-auto aspect-square max-h-[300px] w-full"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="var(--color-amount)"
                dataKey="amount"
                nameKey="category"
                label={({ category, percent }) =>
                  `${category}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={true}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <AddExpenses />
        )}
      </CardContent>
    </Card>
  );
}
