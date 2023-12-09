import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { RoomDetailPage } from "../../features/Room/page-components/RoomDetailPage";

export default function Room() {
  const { id } = useLocalSearchParams();
  return <RoomDetailPage />;
}
