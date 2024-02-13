import { View } from "react-native";
import { RoomMyTodoList } from "../../TimeLine/components/RoomMyTodoList";
import { RoomTimelineList } from "../../TimeLine/components/RoomTimelineList";
import { useState } from "react";

export const RoomTimelinePage = () => {
  const [todoIsOpen, setTodoIsOpen] = useState(true);
  return (
    <View>
      <RoomMyTodoList todoIsOpen={todoIsOpen} setTodoIsOpen={setTodoIsOpen} />
      <RoomTimelineList todoIsOpen={todoIsOpen} setTodoIsOpen={setTodoIsOpen} />
    </View>
  );
};
