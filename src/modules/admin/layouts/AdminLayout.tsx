import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      {/* Sidebar (fixed) */}
      <aside className="fixed inset-y-0 left-0 w-64 z-30">
        <Sidebar />
      </aside>

      {/* App header (fixed, width = viewport - 16rem) */}
      <div className="fixed top-0 left-64 right-0 z-40 h-16 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Header />
      </div>

      {/* Page area: fixed & bounded. Pages can manage internal scroll freely */}
      <main
        className="
          fixed top-16 left-64 right-0 bottom-0
          p-5
          overflow-hidden
        "
      >
        {/* Ensure children can't force horizontal growth */}
        <div className="h-full w-full min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
