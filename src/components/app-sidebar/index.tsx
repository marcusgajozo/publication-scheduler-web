"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Users,
  Heart,
  Calendar,
  Music,
  Menu,
  ChevronLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/members", icon: Users, label: "Members" },
  { href: "/ministries", icon: Heart, label: "Ministries" },
  { href: "/schedules", icon: Calendar, label: "Schedules" },
  { href: "/songs", icon: Music, label: "Songs" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <>
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-sidebar-foreground">
                  Church CMS
                </span>
                <span className="text-xs text-muted-foreground">
                  Management
                </span>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          {!isCollapsed && (
            <div className="text-xs text-muted-foreground text-center">
              v1.0.0
            </div>
          )}
        </div>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-sidebar-foreground">
                  Church CMS
                </span>
                <span className="text-xs text-muted-foreground">
                  Management
                </span>
              </div>
            </div>

            <nav className="flex-1 p-2 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-3"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
