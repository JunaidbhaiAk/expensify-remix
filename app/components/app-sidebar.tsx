"use client";

import * as React from "react";
import {
  ClipboardList,
  DollarSign,
  HomeIcon,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { SIDEBAR_DATA } from "~/lib/constant";

const data = SIDEBAR_DATA;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
