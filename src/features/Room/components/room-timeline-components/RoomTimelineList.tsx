import { ScrollView, Text, View } from "react-native";
import { TodoIsOpenProps } from "../../types/TodoIsOpenProps";
import { Image } from "expo-image";

export const RoomTimelineList = (props: TodoIsOpenProps) => {
  const heightClass = props.todoIsOpen ? "h-2/3" : "h-full";
  return (
    <View className={`${heightClass} pb-24 mt-3`}>
      <View className=" bg-gray-600 mx-3 shadow-sm rounded-md">
        <Text className="text-white text-base font-medium ml-3">
          ルームのタイムライン
        </Text>
      </View>

      <ScrollView>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className="rounded-full w-10 h-10 mr"
          />
          <View className="ml-3">
            <View className=" flex flex-row items-center">
              <Text className="text-sm mr-2">みたに</Text>
              <Text className="text-xs mr-2">2023-12-20-07-23</Text>
            </View>
            <Text className=" text-base font-medium ">起床しました</Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
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
              起床失敗！あと2回でペナルティ
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
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
              ペナルティとなりました
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
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
              スキップを使いました！残り2
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className="rounded-full w-10 h-10 mr"
          />
          <View className="ml-3">
            <View className=" flex flex-row items-center">
              <Text className="text-sm mr-2">みたに</Text>
              <Text className="text-xs mr-2">2023-12-20-07-23</Text>
            </View>
            <Text className=" text-base font-medium ">新しく入室しました</Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className="rounded-full w-10 h-10 mr"
          />
          <View className="ml-3">
            <View className=" flex flex-row items-center">
              <Text className="text-sm mr-2">みたに</Text>
              <Text className="text-xs mr-2">2023-12-20-07-23</Text>
            </View>
            <Text className=" text-base font-medium ">退会しました</Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
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
              ルール変更が可決されました
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            className="rounded-full w-10 h-10 mr"
          />
          <View className="ml-3">
            <View className=" flex flex-row items-center">
              <Text className="text-sm mr-2">クリストファー</Text>
              <Text className="text-xs mr-2">2023-12-20-07-23</Text>
            </View>
            <Text className=" text-base font-medium ">起床しました</Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
          <Image
            source={{ uri: "https://i.pravatar.cc/200" }}
            className="rounded-full w-10 h-10 mr"
          />
          <View className="ml-3">
            <View className=" flex flex-row items-center">
              <Text className="text-sm mr-2">たなか</Text>
              <Text className="text-xs mr-2">2023-12-20-07-23</Text>
            </View>
            <Text className=" text-base font-medium ">起床しました</Text>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-3 mx-3 my-1 shadow-sm rounded-md">
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className="rounded-full w-10 h-10 mr"
          />
          <View className="ml-3">
            <View className=" flex flex-row items-center">
              <Text className="text-sm mr-2">みたに</Text>
              <Text className="text-xs mr-2">2023-12-20-07-23</Text>
            </View>
            <Text className=" text-base font-medium ">起床しました</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
