import { notificationApi } from "@/api/notificationApi";
import type { NotificationHistoryResponse } from "../interfaces/notification-history-response.interface";

export const getNotificationsAction =
  async (): Promise<NotificationHistoryResponse> => {
    const { data } = await notificationApi.get<NotificationHistoryResponse>(
      `/notification-events/user/?userId=4af0e87d-d165-4efc-90c3-d73d7046f55e`
    );
    return data;
  };
