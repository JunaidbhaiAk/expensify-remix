import { Fragment } from "react";
import { useMatches } from "react-router";
import type { RouteHandle } from "~/lib/types";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

export default function DynamicBreadCrumbs() {
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
    <>
      {crumbs.map((crumb, index) => (
        <Fragment key={index}>
          <BreadcrumbItem className="hidden md:block">
            {crumb.href ? (
              <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {index < crumbs.length - 1 && (
            <BreadcrumbSeparator className="hidden md:block" />
          )}
        </Fragment>
      ))}
    </>
  );
}
