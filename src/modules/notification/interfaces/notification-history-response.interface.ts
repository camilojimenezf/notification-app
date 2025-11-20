import type { NotificationEvent } from "./notification-event.interface";

export interface NotificationHistoryResponse {
  meta: Meta;
  data: NotificationEvent[];
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
