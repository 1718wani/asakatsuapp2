import { View } from "react-native";
import { RoomMyTodoList } from "../components/room-timeline-components/RoomMyTodoList";
import { RoomTimelineList } from "../components/room-timeline-components/RoomTimelineList";
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
