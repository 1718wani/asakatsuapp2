import { Link } from "expo-router";
import { View } from "react-native";

export default function Page() {
  return (
    <View>
      <Link href="/about">About</Link>

      <Link href="/user/bacon">View user</Link>
    </View>
  );
}
