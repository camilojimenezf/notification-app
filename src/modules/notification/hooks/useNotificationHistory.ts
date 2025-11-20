import { useQuery } from "@tanstack/react-query";
import { getNotificationsAction } from "../actions/get-notifications-history.action";

export const useNotificationsHistory = () => {
  return useQuery({
    queryKey: ["notifications-history"],
    queryFn: () => getNotificationsAction(),
    staleTime: 0,
  });
};
