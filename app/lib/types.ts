export type Crumb = {
  label: string;
  href?: string; // Optional link for non-current
};

export type RouteHandle = {
  crumb?: string | ((match: unknown) => Crumb);
};

export type Expenses = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
};
