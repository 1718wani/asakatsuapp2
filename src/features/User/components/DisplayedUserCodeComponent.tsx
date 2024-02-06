import { Image } from "expo-image";
import { Suspense, useEffect, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { supabase } from "../../../libs/supabase";
import { router } from "expo-router";
import { fetchUserCode } from "../apis/fetchUserCode";
import { Skeleton } from "@rneui/themed";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const DisplayUserCode = () => {
  const { data: userCode } = useSuspenseQuery({
    queryKey: ["userCode"],
    queryFn: () => fetchUserCode(),
  });

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userCode ?? "");
    Toast.show({
      type: "info",
      text1: `ユーザーコードをコピーしました`,
    });
  };

  return (
    <>
      <Text className="ml-2">{userCode}</Text>
      <MaterialIcons
        name="content-copy"
        size={24}
        color="black"
        onPress={() => copyToClipboard()}
      />
    </>
  );
};

export const DisplayedUserCodeComponent = () => {
  return (
    <>
      <Suspense
        fallback={
          <Skeleton
            width={100}
            animation="wave"
            className=" ml-2 rounded-3xl"
          />
        }
      >
        <DisplayUserCode />
      </Suspense>
    </>
  );
};
