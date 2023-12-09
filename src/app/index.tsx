import { RoomCardsListPage } from "../features/Room/page-components/RoomCardsListPage";
import { View } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View>
      <Link href="/about">About</Link>
      <Link href="/user/bacon">View user</Link>
      <RoomCardsListPage />
    </View>
  );
}
