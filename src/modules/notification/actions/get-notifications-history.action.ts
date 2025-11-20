import { notificationApi } from "@/api/notificationApi";
import type { NotificationHistoryResponse } from "../interfaces/notification-history-response.interface";

export const getNotificationsAction =
  async (): Promise<NotificationHistoryResponse> => {
    const { data } = await notificationApi.get<NotificationHistoryResponse>(
      "/notification-events/user"
    );
    return data;
  };
