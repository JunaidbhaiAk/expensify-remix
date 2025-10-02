import { Fragment } from "react";
import { Outlet, useMatches } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";

interface Crumb {
  label: string;
  href?: string; // Optional link for non-current
}

interface RouteHandle {
  crumb?: string | ((match: any) => Crumb);
}

export default function Page() {
  const matches = useMatches();
  // Build dynamic breadcrumbs from route handles
  const crumbs = matches
    .filter((match) => Boolean((match.handle as RouteHandle)?.crumb)) // Only routes with crumb
    .map((match) => {
      const crumb = (match.handle as RouteHandle)?.crumb;
      if (typeof crumb === "function") {
        return crumb(match);
      }
      return {
        label: crumb as string,
        href: match.pathname === match.pathname ? undefined : match.pathname,
      };
    });
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {crumbs.map((crumb, index) => (
              <Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < crumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </Fragment>
            ))}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
