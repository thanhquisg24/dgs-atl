import { useSystemSettingSocket } from "@hooks/useSystemSettingSocket";
import RecentCard from "./RecentCard";

export const RecentCardWithSocket = () => {
  const data = useSystemSettingSocket();
  return <RecentCard isLoading={data.isLoading} idGames={data.systemStatus ? data.systemStatus.updatingGames : []} />;
};
