export interface NotificationHistoryResponse {
  meta: Meta;
  data: NotificationEvent[];
}

export interface NotificationEvent {
  id: string;
  template: Template;
  userId: string;
  channel: Channel;
  triggeredById: null;
  origin: null;
  state: string;
  dedupKey: string;
  providerMessageId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Channel {
  id: string;
  name: string;
  type: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  title: string;
  message: string;
  userId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
