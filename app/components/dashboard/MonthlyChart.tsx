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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import type { MonthlyExpense } from "./types";
import { getMonthNames, groupByMonth } from "~/lib/utils";
import { useLoaderData } from "react-router";
import type { loader } from "~/routes/page";

export default function MonthlyChart() {
  const { expenses } = useLoaderData<typeof loader>();
  const monthlyData: MonthlyExpense[] = groupByMonth(expenses);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>Total spending over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: "Total",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-full"
        >
          <AreaChart data={monthlyData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const [year, month] = value.split("-");
                const monthNames = getMonthNames;
                return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`$${value}`, "Total"]}
                />
              }
            />
            <Area
              type="linear"
              dataKey="total"
              fill="var(--color-total)"
              fillOpacity={0.4}
              stroke="var(--color-total)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
