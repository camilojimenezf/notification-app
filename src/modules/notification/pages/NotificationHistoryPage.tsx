import { useState } from "react";
import { useNotificationsHistory } from "../hooks/useNotificationHistory";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Mail,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { NotificationDetailsModal } from "../components/NotificationDetailModal";
import type { NotificationEvent } from "../interfaces/notification-event.interface";

// --- Helper Components (Same as before) ---
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    SUCCESS:
      "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    FAILED: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  };
  const icons = {
    SUCCESS: <CheckCircle2 className="w-3 h-3 mr-1" />,
    FAILED: <XCircle className="w-3 h-3 mr-1" />,
    PENDING: <Clock className="w-3 h-3 mr-1" />,
  };
  const key = status as keyof typeof styles;
  return (
    <Badge
      variant="outline"
      className={`${
        styles[key] || "bg-gray-100"
      } flex w-fit items-center px-2 py-0.5`}
    >
      {icons[key]}
      <span className="text-xs font-medium capitalize">
        {status.toLowerCase()}
      </span>
    </Badge>
  );
};

const ChannelIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case "email":
      return <Mail className="w-4 h-4 text-neutral-500" />;
    case "sms":
      return <Smartphone className="w-4 h-4 text-neutral-500" />;
    default:
      return <MessageSquare className="w-4 h-4 text-neutral-500" />;
  }
};

// --- Main Component ---

export const NotificationHistoryPage = () => {
  const { data, isLoading } = useNotificationsHistory();
  const [selectedEvent, setSelectedEvent] = useState<NotificationEvent | null>(
    null
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy • HH:mm");
    } catch (e) {
      console.error(e);
      return "Invalid Date";
    }
  };

  return (
    <div className="p-8 space-y-8 bg-neutral-50/50 min-h-screen">
      {/* Header & Filters (Same as before) */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Notification History
          </h1>
          <p className="text-neutral-500 mt-1">
            Monitor delivery status and audit logs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 bg-white">
            <Filter className="w-3.5 h-3.5 mr-2 text-neutral-500" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="h-8 bg-white">
            <Search className="w-3.5 h-3.5 mr-2 text-neutral-500" /> Search
          </Button>
        </div>
      </div>

      <Card className="border-neutral-200 shadow-sm bg-white overflow-hidden">
        {/* Table Header (Same as before) */}
        <CardHeader className="border-b border-neutral-100 px-6 py-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-neutral-900">
                Recent Events
              </CardTitle>
              <CardDescription className="text-xs text-neutral-500 mt-1">
                Showing {data?.data.length || 0} records
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50/50">
              <TableRow className="hover:bg-transparent border-neutral-100">
                <TableHead className="w-[200px] text-xs font-semibold uppercase text-neutral-500 pl-6">
                  Template
                </TableHead>
                <TableHead className="w-[120px] text-xs font-semibold uppercase text-neutral-500">
                  Channel
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase text-neutral-500">
                  Recipient
                </TableHead>
                <TableHead className="w-[120px] text-xs font-semibold uppercase text-neutral-500">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase text-neutral-500 text-right pr-6">
                  Timestamp
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? // Loading Skeletons (Same as before)
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="pl-6">
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Skeleton className="h-4 w-24 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                : // Type cast data.data to NotificationEvent[] if needed based on your hook return type
                  (data?.data as NotificationEvent[]).map((item) => (
                    <TableRow
                      key={item.id}
                      className="group hover:bg-neutral-50/50 border-neutral-100 transition-colors"
                    >
                      {/* ... (Template, Channel, Recipient, Status, Date TableCells remain exactly the same) ... */}
                      <TableCell className="pl-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-sm text-neutral-900 truncate max-w-[200px]">
                            {item.template.name}
                          </span>
                          <span className="text-xs text-neutral-500 font-mono truncate max-w-[180px] opacity-0 group-hover:opacity-100 transition-opacity">
                            ID: {item.id.slice(0, 8)}...
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-neutral-100 rounded-md border border-neutral-200">
                            <ChannelIcon type={item.channel.type} />
                          </div>
                          <span className="text-sm font-medium text-neutral-700 capitalize">
                            {item.channel.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-neutral-200">
                            <AvatarFallback className="text-xs text-neutral-600 bg-neutral-100">
                              U
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm text-neutral-700">
                              User
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {item.userId.split("-")[0]}...
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={item.state} />
                        {item.state === "FAILED" && (
                          <span className="text-[10px] text-red-500 block mt-1 truncate max-w-[100px]">
                            {item.providerMessageId}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <span className="text-sm text-neutral-600">
                          {formatDate(item.createdAt)}
                        </span>
                      </TableCell>

                      {/* Actions Menu - UPDATED */}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-neutral-200 data-[state=open]:bg-neutral-200"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4 text-neutral-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => setSelectedEvent(item)}
                              className="cursor-pointer font-medium"
                            >
                              <Eye className="w-4 h-4 mr-2 text-neutral-500" />{" "}
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                navigator.clipboard.writeText(item.id)
                              }
                            >
                              Copy Event ID
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                navigator.clipboard.writeText(item.dedupKey)
                              }
                            >
                              Copy Dedup Key
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
        {/* Pagination Footer (Same as before) */}
        {!isLoading && data?.meta && (
          <CardFooter className="border-t border-neutral-100 bg-neutral-50/30 px-6 py-4 flex items-center justify-between">
            <div className="text-xs text-neutral-500">
              Page <strong>{data.meta.page}</strong> of{" "}
              <strong>{data.meta.totalPages}</strong> ({data.meta.total} items)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-white"
                disabled={data.meta.page <= 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-white"
                disabled={data.meta.page >= data.meta.totalPages}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      <NotificationDetailsModal
        open={!!selectedEvent}
        data={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};
