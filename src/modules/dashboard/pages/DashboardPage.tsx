import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent OTs */}
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4"></div>
            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={() => navigate("/notification-history")}
            >
              Ver todas las Notificaciones
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
