import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [text, setText] = useState<string>("Hello, React Native");
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () =>
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  const toggleText = () =>
    setText((currentText) =>
      currentText === "Hello, React Native"
        ? "テキストがそれか！"
        : "Hello, React Native"
    );

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-blue-500 text-xl">{text}</Text>
      <TouchableOpacity
        onPress={toggleText}
        className="mt-6 h-fit w-fit rounded-full bg-blue-500 px-4 py-2"
      >
        <Text className="color-white text-xl font-bold drop-shadow-2lx">
          テキストを変更
        </Text>
      </TouchableOpacity>

      <Text className="text-2xl mt-10 text-gray-500 font-bold">{count}</Text>
      <View className="mt-[20px] flex-row justify-center items-center">
        <TouchableOpacity
          onPress={handleDecrement}
          className="border-1 h-[50px] w-[50px] items-center justify-center rounded-full bg-blue-500 shadow"
        >
          <Text className="color-white text-xl font-bold">ー</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleIncrement}
          className="border-1 ml-20 h-[50px] w-[50px] items-center justify-center rounded-full bg-blue-500 shadow"
        >
          <Text className="color-white text-xl font-bold">＋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}