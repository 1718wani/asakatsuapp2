import { useLocalSearchParams } from "expo-router";
import { FirstApproveRoomRulePageComponent } from "../../features/Room/page-components/FirstApproveRoomRulePage";

export default function FirstApproveRoomRulePage() {
  const { id } = useLocalSearchParams();
  return <FirstApproveRoomRulePageComponent roomId={id} />;
}
