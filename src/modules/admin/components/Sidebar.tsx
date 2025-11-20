import { Link, useLocation } from "react-router";
import { LayoutDashboard, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  submenu?: { name: string; to: string }[];
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", to: "/", icon: LayoutDashboard },
  {
    name: "Historial Notificaciones",
    to: "/notification-history",
    icon: History,
  },
];

export const Sidebar = () => {
  const { pathname } = useLocation();

  const isActiveRoute = (to: string) => {
    return to === pathname;
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <h1 className="text-xl font-bold text-sidebar-foreground">
            Notifications App
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.name}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer",
                    item.disabled
                      ? "cursor-not-allowed opacity-50"
                      : isActiveRoute(item.to)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  onClick={(e) => item.disabled && e.preventDefault()}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
