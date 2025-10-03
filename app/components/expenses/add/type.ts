import type { DefaultValues } from "react-hook-form";
import type { ExpenseFormValues } from "./validator";

export type ExpenseFormPropsType = {
  defaultValues: DefaultValues<ExpenseFormValues>;
  id: string;
};
