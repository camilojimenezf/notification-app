import { createBrowserRouter, Navigate } from "react-router";

import { AdminLayout } from "@admin/layouts/AdminLayout";
import { DashboardPage } from "@dashboard/pages/DashboardPage";

import { NotificationHistoryPage } from "@notification/pages/NotificationHistoryPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "notification-history",
        element: <NotificationHistoryPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
