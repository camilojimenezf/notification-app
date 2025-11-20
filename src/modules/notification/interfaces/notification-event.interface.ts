import type { Channel } from "./channel.interface";
import type { NotificationTemplate } from "./notification-template.interface";

export interface NotificationEvent {
  id: string;
  template: NotificationTemplate;
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
