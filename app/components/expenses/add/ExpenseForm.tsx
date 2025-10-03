"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Loader2 } from "lucide-react";
import { useActionData, useNavigate, useNavigation } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { CATEGORIES } from "~/lib/constant";
import { expenseSchema, type ExpenseFormValues } from "./validator";
import { useEffect } from "react";
import type { action } from "~/routes/expenses/add/page";
import { FailedAlert, SuccessAlert } from "~/components/ui/alert-types";
import type { ExpenseFormPropsType } from "./type";
import moment from "moment";

export function ExpenseForm({ defaultValues, id }: ExpenseFormPropsType) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isEditing = id !== "0";
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData<typeof action>();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: actionData?.data ?? defaultValues,
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (actionData?.success) {
      navigate("/expenses/list");
    } else if (actionData?.errors && actionData.data) {
      if (actionData.errors.properties) {
        Object.entries(actionData.errors.properties).forEach(([key, value]) => {
          if (value?.errors?.length) {
            form.setError(key as keyof ExpenseFormValues, {
              message: value.errors[0],
            });
          }
        });
      }
    }
  }, [actionData, form]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      {typeof actionData?.errors === "string" && (
        <FailedAlert message={actionData?.errors ? actionData?.errors : ""} />
      )}
      {actionData?.success && (
        <SuccessAlert message={actionData?.message ?? ""} />
      )}
      <Form {...form}>
        <form
          method="post"
          action={isEditing ? `/expenses/edit/${id}` : "/expenses/add"}
          className="w-full"
        >
          <Card className="max-w-lg m-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold tracking-tight">
                {isEditing ? "Update Existing Expense" : "Add New Expense"}
              </h2>
              <CardDescription>
                Enter details for your {isEditing ? "exsisting" : "new"}{" "}
                expense.
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        max={moment().format("YYYY-MM-DD")}
                      />
                    </FormControl>
                    <FormDescription>
                      When did this expense occur?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Coffee at cafe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Brief note about the expense.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>In your local currency.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      key={form.watch("category")}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input
                      type="hidden"
                      value={field.value || ""}
                      name="category"
                    />
                    <FormDescription>
                      Choose the type of expense.
                    </FormDescription>
                    <FormMessage className="max-w-sm" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting
                  ? "Adding Expense..."
                  : isEditing
                    ? "Update Expense"
                    : "Add Expense"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
