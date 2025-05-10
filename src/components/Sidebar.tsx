
import React from 'react';
import { LayoutDashboard, ClipboardList, BarChart2 } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar>
      <SidebarContent className="pt-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/dashboard" className="w-full">
              <SidebarMenuButton isActive={currentPath === '/dashboard'} tooltip="Dashboard">
                <LayoutDashboard className={currentPath === '/dashboard' ? "text-primary" : ""} />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link to="/survey" className="w-full">
              <SidebarMenuButton isActive={currentPath === '/survey'} tooltip="Survey">
                <ClipboardList className={currentPath === '/survey' ? "text-primary" : ""} />
                <span>Survey</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link to="/insights" className="w-full">
              <SidebarMenuButton isActive={currentPath === '/insights'} tooltip="Insights">
                <BarChart2 className={currentPath === '/insights' ? "text-primary" : ""} />
                <span>Insights</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
