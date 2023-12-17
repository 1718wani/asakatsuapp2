import React from "react";
import { Link } from "expo-router";
import { Image, Pressable } from "react-native";
import { path } from "../../../consts/path";

export const UserAvatorButton = () => {
  return (
    <Link href={path.editUser} asChild>
      <Pressable>
        {() => (
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className="rounded-full w-9 h-9"
          />
        )}
      </Pressable>
    </Link>
  );
};
