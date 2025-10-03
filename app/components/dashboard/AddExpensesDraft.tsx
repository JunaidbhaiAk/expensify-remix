import { Link } from "react-router";
import { PlusCircle } from "lucide-react";

export default function AddExpensesDraft() {
  return (
    <Link to="/expenses/add" className="flex flex-col items-center text-center">
      <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No expenses yet</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Start tracking your spending by adding your first expense.
      </p>
    </Link>
  );
}
