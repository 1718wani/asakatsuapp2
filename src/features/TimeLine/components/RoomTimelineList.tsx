import { ScrollView, Text, View } from "react-native";
import { TodoIsOpenProps } from "../../Room/types/TodoIsOpenProps";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { getUserActivityLogsWithProfiles } from "../apis/getTimeLineDatas";
import { Database } from "../../../types/supabaseSchema";

export const RoomTimelineList = (props: TodoIsOpenProps) => {
  const heightClass = props.todoIsOpen ? "h-2/3" : "h-full";

  const renderActivityMessage = (
    type: Database["public"]["Enums"]["user_activity_type_enum"]
  ) => {
    switch (type) {
      case "wake_up_success":
        return "起床しました";
      case "wake_up_failure":
        return "起床失敗";
      case "skip_use":
        return "スキップを使いました";
      default:
        return "アクティビティがあります";
    }
  };

  const {
    data: userActivityLogsWithProfilesData,
    isLoading: userActivityLogsWithProfilesLoading,
    error: userActivityLogsWithProfilesError,
  } = useQuery({
    queryKey: ["userActivityLogsWithProfiles"],
    queryFn: () => getUserActivityLogsWithProfiles(),
  });

  return (
    <View className={`${heightClass} pb-24 mt-3`}>
      <View className=" bg-gray-600 mx-3 shadow-sm rounded-md">
        <Text className="text-white text-base font-medium ml-3">
          ルームのタイムライン
        </Text>
      </View>

      <ScrollView>
        {userActivityLogsWithProfilesData?.data?.map((item) => (
          <View
            key={item.id}
            className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md"
          >
            <Image
              source={{ uri: item.profiles?.avatar_url }}
              className="rounded-full w-10 h-10 mr"
            />
            <View className="ml-3">
              <View className="flex flex-row items-center">
                <Text className="text-sm mr-2">{item.profiles?.user_name}</Text>
                <Text className="text-xs mr-2">{item.timestamp}</Text>
              </View>
              <Text className="text-base font-medium">
                {renderActivityMessage(item.user_activity_type)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
