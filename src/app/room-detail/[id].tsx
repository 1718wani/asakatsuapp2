import { useLocalSearchParams } from "expo-router";

import { RoomDetailPageComponent } from "../../features/Room/page-components/RoomDetailPage";

export default function RoomDetail() {
  const { id } = useLocalSearchParams();
  return <RoomDetailPageComponent />;
}
