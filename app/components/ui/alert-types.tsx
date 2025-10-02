import { CircleFadingArrowUpIcon } from "lucide-react";
import { Alert, AlertTitle } from "./alert";

export const SuccessAlert = ({ message }: { message: string }) => {
  return (
    <Alert className="bg-emerald-600/10 dark:bg-emerald-600/15 text-emerald-500 border-emerald-500/50 dark:border-emerald-600/50 max-w-sm">
      <CircleFadingArrowUpIcon className="size-4" />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
};
