import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Smartphone,
  MessageSquare,
} from "lucide-react";
import type { NotificationEvent } from "../interfaces/notification-event.interface";

interface NotificationDetailsModalProps {
  data: NotificationEvent | null;
  open: boolean;
  onClose: () => void;
}

export const NotificationDetailsModal = ({
  data,
  open,
  onClose,
}: NotificationDetailsModalProps) => {
  if (!data) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a");
    } catch (e) {
      console.error(e);
      return dateString;
    }
  };

  // --- Helpers for visual elements inside the modal ---
  const getStatusBanner = () => {
    switch (data.state) {
      case "SUCCESS":
        return (
          <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
            <div className="flex-1">
              <AlertTitle>Sent Successfully</AlertTitle>
              <AlertDescription className="text-emerald-700 text-xs mt-1">
                Delivered via {data.channel.name}. Provider ID:{" "}
                <code className="bg-emerald-100 px-1 rounded">
                  {data.providerMessageId || "N/A"}
                </code>
              </AlertDescription>
            </div>
          </Alert>
        );
      case "FAILED":
        return (
          <Alert
            variant="destructive"
            className="bg-red-50 border-red-200 text-red-800 flex items-start gap-3"
          >
            <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <AlertTitle>Delivery Failed</AlertTitle>
              <AlertDescription className="text-red-700 text-xs font-mono mt-2 bg-red-100 p-2 rounded">
                Error: {data.providerMessageId || "Unknown Error"}
              </AlertDescription>
            </div>
          </Alert>
        );
      default:
        return (
          <Alert className="bg-amber-50 border-amber-200 text-amber-800 flex items-start gap-3">
            <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <AlertTitle>Pending / Processing</AlertTitle>
              <AlertDescription className="text-amber-700 text-xs mt-1">
                This notification is currently being processed.
              </AlertDescription>
            </div>
          </Alert>
        );
    }
  };

  const getChannelIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "sms":
        return <Smartphone className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto sm:rounded-xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="px-2 py-1 bg-neutral-50 gap-1">
              {getChannelIcon(data.channel.type)}
              <span className="capitalize">{data.channel.type}</span>
            </Badge>
            <span className="text-neutral-400 text-xs font-mono">Letra</span>
          </div>
          <DialogTitle className="text-xl">{data.template.name}</DialogTitle>
          <DialogDescription>
            Event ID:{" "}
            <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded">
              {data.id}
            </code>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* 1. Status Banner */}
          {getStatusBanner()}

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content Area (Left 2/3) */}
            <div className="md:col-span-2 space-y-6">
              {/* Template Content Section */}
              <div>
                <h3 className="text-sm font-medium mb-3 text-neutral-900">
                  Template Content Used
                </h3>
                <Card className="bg-neutral-50/50 border-neutral-200 shadow-none">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xs font-medium text-neutral-500 uppercase">
                      Subject / Title
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm font-medium text-neutral-900 pt-0 pb-4">
                    {data.template.title}
                  </CardContent>
                  <div className="px-6 border-t border-neutral-200"></div>
                  <CardHeader className="pb-3 pt-4">
                    <CardTitle className="text-xs font-medium text-neutral-500 uppercase">
                      Body Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white border border-neutral-200 p-4 rounded-md text-sm text-neutral-800 font-mono whitespace-pre-wrap leading-relaxed">
                      {data.template.message}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Metadata Sidebar (Right 1/3) */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3 text-neutral-900">
                  Metadata
                </h3>
                <Card className="bg-white border-neutral-200 shadow-sm">
                  <CardContent className="p-0">
                    <dl className="divide-y divide-neutral-100 text-sm">
                      <div className="px-4 py-3 grid grid-cols-3 gap-1">
                        <dt className="text-neutral-500 col-span-1">
                          Created At
                        </dt>
                        <dd className="text-neutral-900 col-span-2 font-medium text-right">
                          {formatDate(data.createdAt)}
                        </dd>
                      </div>
                      <div className="px-4 py-3 grid grid-cols-3 gap-1 items-center">
                        <dt className="text-neutral-500 col-span-1">
                          Recipient ID
                        </dt>
                        <dd
                          className="text-neutral-900 col-span-2 font-mono text-xs text-right truncate pl-4"
                          title={data.userId}
                        >
                          {data.userId}
                        </dd>
                      </div>
                      <div className="px-4 py-3 grid grid-cols-3 gap-1 items-center">
                        <dt className="text-neutral-500 col-span-1">
                          Template ID
                        </dt>
                        <dd
                          className="text-neutral-900 col-span-2 font-mono text-xs text-right truncate pl-4"
                          title={data.template.id}
                        >
                          {data.template.id}
                        </dd>
                      </div>
                      <div className="px-4 py-3 grid grid-cols-3 gap-1 items-start">
                        <dt className="text-neutral-500 col-span-1 mt-1">
                          Dedup Key
                        </dt>
                        <dd className="col-span-2 text-right pl-4">
                          <code className="text-[10px] bg-neutral-100 p-1 rounded block break-all text-neutral-600 text-left">
                            {data.dedupKey}
                          </code>
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between gap-2 border-t border-neutral-100 pt-4">
          <div className="text-xs text-neutral-500 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> Updated:{" "}
            {formatDate(data.updatedAt)}
          </div>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close Details
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
