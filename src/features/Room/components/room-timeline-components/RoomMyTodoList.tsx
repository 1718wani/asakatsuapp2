import { Pressable, ScrollView, Text, View } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState } from "react";
import { TodoIsOpenProps } from "../../types/TodoIsOpenProps";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export const RoomMyTodoList = (props: TodoIsOpenProps) => {
  const heightClass = props.todoIsOpen ? "h-2/5" : "";
  const router = useRouter();
  return (
    <View className={`${heightClass}`}>
      <View className="flex flex-row justify-between bg-gray-600 mx-3 shadow-sm mt-2 rounded-md">
        <Text className="text-white text-base font-medium ml-3">TODO</Text>
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
      {props.todoIsOpen && (
        <ScrollView>
          <View className="flex flex-row items-center bg-white p-3 mx-3 my-2 shadow-sm rounded-md">
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              className="rounded-full w-10 h-10 mr"
            />
            <View className="ml-3">
              <View className=" flex flex-row items-center">
                <Text className="text-sm mr-2">みたに</Text>
                <Text className="text-xs mr-2">2023-12-20-07-23</Text>
              </View>
              <Text className=" text-base font-medium ">
                ペナルティを完了してください
              </Text>
            </View>
            <View className=" ml-auto">
              <View className=" bg-white border-slate-300 shadow-md shadow-slate-300 rounded-full w-10 h-10 items-center justify-center">
                <AntDesign name="check" size={24} color="black" />
              </View>
            </View>
          </View>
          <View className="flex flex-row items-center bg-white p-3 mx-3 my-2 shadow-sm rounded-md">
            <Image
              source={{ uri: "https://i.pravatar.cc/200" }}
              className="rounded-full w-10 h-10 mr"
            />
            <View className="ml-3">
              <View className=" flex flex-row items-center">
                <Text className="text-sm mr-2">たなか</Text>
                <Text className="text-xs mr-2">2023-12-21-07-23</Text>
              </View>
              <Text className=" text-base font-medium ">
                ルール変更を提案しました
              </Text>
            </View>
            <View className=" ml-auto">
              <Pressable
                onPress={() => {
                  router.push("/approve-room-rule");
                }}
              >
                {({ pressed }) => (
                  <View
                    className=" bg-white border-slate-300 shadow-md shadow-slate-300 rounded-full w-10 h-10 items-center justify-center"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  >
                    <MaterialCommunityIcons
                      name="text-box-search-outline"
                      size={24}
                      color="black"
                    />
                  </View>
                )}
              </Pressable>
            </View>
          </View>
          <View className="flex flex-row items-center bg-white p-3 mx-3 my-2 shadow-sm rounded-md">
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              className="rounded-full w-10 h-10 mr"
            />
            <View className="ml-3">
              <View className=" flex flex-row items-center">
                <Text className="text-sm mr-2">クリストファー</Text>
                <Text className="text-xs mr-2">2023-12-21-07-23</Text>
              </View>
              <Text className=" text-base font-medium ">
                ペナルティ完了を承認してください
              </Text>
            </View>
            <View className=" ml-auto">
              <Pressable
                onPress={() => {
                  console.log("TODOリストボタンが押されました");
                }}
              >
                {({ pressed }) => (
                  <View
                    className=" bg-white border-slate-300 shadow-md shadow-slate-300 rounded-full w-10 h-10 items-center justify-center"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  >
                    <FontAwesome5 name="thumbs-up" size={24} color="black" />
                  </View>
                )}
              </Pressable>
            </View>
          </View>
          <View className="flex flex-row items-center bg-white p-3 mx-3 my-2 shadow-sm rounded-md">
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              className="rounded-full w-10 h-10 mr"
            />
            <View className="ml-3">
              <View className=" flex flex-row items-center">
                <Text className="text-sm mr-2">みたに</Text>
                <Text className="text-xs mr-2">2023-12-20-07-23</Text>
              </View>
              <Text className=" text-base font-medium ">
                ペナルティを完了してください
              </Text>
            </View>
            <View className=" ml-auto">
              <View className=" bg-white border-slate-300 shadow-md shadow-slate-300 rounded-full w-10 h-10 items-center justify-center">
                <AntDesign name="check" size={24} color="black" />
              </View>
            </View>
          </View>
          <View className="flex flex-row items-center bg-white p-3 mx-3 my-2 shadow-sm rounded-md">
            <Image
              source={{ uri: "https://i.pravatar.cc/200" }}
              className="rounded-full w-10 h-10 mr"
            />
            <View className="ml-3">
              <View className=" flex flex-row items-center">
                <Text className="text-sm mr-2">たなか</Text>
                <Text className="text-xs mr-2">2023-12-21-07-23</Text>
              </View>
              <Text className=" text-base font-medium ">
                ルール変更を確認してください
              </Text>
            </View>
            <View className=" ml-auto">
              <View className=" bg-white border-slate-300 shadow-md shadow-slate-300 rounded-full w-10 h-10 items-center justify-center">
                <MaterialCommunityIcons
                  name="text-box-search-outline"
                  size={24}
                  color="black"
                />
              </View>
            </View>
          </View>
          <View className="flex flex-row items-center bg-white p-3 mx-3 my-2 shadow-sm rounded-md">
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              className="rounded-full w-10 h-10 mr"
            />
            <View className="ml-3">
              <View className=" flex flex-row items-center">
                <Text className="text-sm mr-2">クリストファー</Text>
                <Text className="text-xs mr-2">2023-12-21-07-23</Text>
              </View>
              <Text className=" text-base font-medium ">
                ペナルティ完了を承認してください
              </Text>
            </View>
            <View className=" ml-auto">
              <View className=" bg-white border-slate-300 shadow-md shadow-slate-300 rounded-full w-10 h-10 items-center justify-center">
                <FontAwesome5 name="thumbs-up" size={24} color="black" />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
