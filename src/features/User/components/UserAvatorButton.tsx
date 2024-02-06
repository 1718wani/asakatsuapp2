import React from "react";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { path } from "../../../consts/path";
import { Image } from "expo-image";
import { getUserInfo } from "../../Room/apis/getUserInfo";
import Toast from "react-native-toast-message";
import { Skeleton } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";

export const UserAvatorButton = () => {
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    error: userInfoError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
  });

  return (
    <>
      {userInfoLoading && (
        <>
          <Skeleton circle animation="wave" width={30} height={30} />
        </>
      )}
      {userInfo && (
        <Link href={path.editUser} asChild>
          <Pressable>
            {() => (
              <Image
                source={{ uri: userInfo?.avatar_url }}
                className="rounded-full w-9 h-9"
              />
            )}
          </Pressable>
        </Link>
      )}
    </>
  );
};
