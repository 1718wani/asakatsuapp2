import { Pressable, ScrollView, Text, View } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState } from "react";
import { TodoIsOpenProps } from "../../Room/types/TodoIsOpenProps";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserActivityLogsWithProfiles } from "../apis/getTimeLineDatas";
import { updateUserActivityLogChecked } from "../apis/updateUserActivityLogChecked";
import Toast from "react-native-toast-message";
import { getUserId } from "../../User/apis/getUserId";

// TODO そもそもTODOだけを取り出す関数に変更
export const RoomMyTodoList = (props: TodoIsOpenProps) => {
  const heightClass = props.todoIsOpen ? "h-2/5" : "";

  const {
    data: userIdData,
    isLoading: userIdLoading,
    error: userIdError,
  } = useQuery({
    queryKey: ["userId"],
    queryFn: () => getUserId(),
  });

  const {
    data: userActivityLogsWithProfilesData,
    isLoading: userActivityLogsWithProfilesLoading,
    error: userActivityLogsWithProfilesError,
  } = useQuery({
    queryKey: ["userActivityLogsWithProfiles"],
    queryFn: () => getUserActivityLogsWithProfiles(),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (logId: number) => {
      return updateUserActivityLogChecked(logId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userActivityLogsWithProfiles"],
      });
      Toast.show({
        type: "success",
        text1: "ペナルティを完了しました",
      });
    },
  });

  return (
    <View className={`${heightClass}`}>
      <View className="flex flex-row justify-between bg-gray-600 mx-3 shadow-sm mt-2 rounded-md">
        <Text className="text-white text-base font-medium ml-3">
          ペナルティ
        </Text>
        <Pressable
          onPress={() => {
            props.setTodoIsOpen(!props.todoIsOpen);
          }}
        >
          {({ pressed }) => (
            <View
              className=" flex flex-row items-center mr-2"
              style={{ opacity: pressed ? 0.5 : 1 }}
            >
              <AntDesign name="caretdown" size={24} color="white" />
            </View>
          )}
        </Pressable>
      </View>
      {props.todoIsOpen &&
        userActivityLogsWithProfilesData?.data?.length !== 0 && (
          <ScrollView>
            {userActivityLogsWithProfilesData?.data
              ?.filter(
                (item) =>
                  item.user_activity_type === "penalty_imposed" &&
                  item.checked === false
              )
              .map((item) => (
                <View
                  key={item.id}
                  className="flex flex-row items-center bg-white p-3 mx-3 my-2 shadow-sm rounded-md"
                >
                  <Image
                    source={{ uri: item.profiles?.avatar_url }}
                    className="rounded-full w-10 h-10 mr"
                  />
                  <View className="ml-3">
                    <View className=" flex flex-row items-center">
                      <Text className="text-sm mr-2">
                        {item.profiles?.user_name}
                      </Text>
                      <Text className="text-xs mr-2">{item.timestamp}</Text>
                    </View>
                    {item.profiles?.id === userIdData ? (
                      <Text className=" text-base font-medium ">
                        ペナルティを完了してください
                      </Text>
                    ) : (
                      <Text className=" text-base font-medium ">
                        ペナルティが課されました
                      </Text>
                    )}
                  </View>
                  <View className=" ml-auto">
                    {item.profiles?.id === userIdData ? (
                      <Pressable
                        onPress={() => {
                          mutation.mutate(item.id);
                          Toast.show({
                            type: "success",
                            text1: "ペナルティを完了しました",
                          });
                        }}
                      >
                        {({ pressed }) => (
                          <View
                            className=" bg-white border-slate-300 shadow-md shadow-slate-300 rounded-full w-10 h-10 items-center justify-center"
                            style={{ opacity: pressed ? 0.5 : 1 }}
                          >
                            <AntDesign name="check" size={24} color="black" />
                          </View>
                        )}
                      </Pressable>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              ))}
          </ScrollView>
        )}
      {props.todoIsOpen &&
        !userActivityLogsWithProfilesData?.data?.some(
          (activity) => activity.user_activity_type === "penalty_imposed"
        ) && (
          <View className=" flex items-center my-32">
            <Text>現在ペナルティはありません</Text>
          </View>
        )}
    </View>
  );
};
