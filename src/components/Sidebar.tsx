
import React from 'react';
import { LayoutDashboard, ClipboardList, BarChart2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="pt-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={true} tooltip="Dashboard">
              <LayoutDashboard className="text-primary" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Survey">
              <ClipboardList />
              <span>Survey</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Insights">
              <BarChart2 />
              <span>Insights</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
