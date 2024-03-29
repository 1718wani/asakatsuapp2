import { Text, View } from "react-native";
import CuteDragon from "../../../../components/CuteDragon";
import { getAwakeSuccessCountForHeatMap } from "../../apis/getAwakeSuccessCountForHeatMap";
import { makeDateAndSuccessCountArray } from "../../functions/heatmap-functions/makeDateAndSuccessCountArray";
import { getLastMonthFirstDateAndThisMonthLastDate } from "../../functions/heatmap-functions/getLastMonthFirstDateAndThisMonthLastDate";
import { colorsForCountOnHeatMap } from "../../consts/colorsForCountOnHeatMap";
import { splitArrayIntoChunks } from "../../functions/heatmap-functions/splitArrayIntoChunks";
import { Skeleton } from "@rneui/themed";
import Toast from "react-native-toast-message";
import { useQuery } from "@tanstack/react-query";

export const AwakeHeatMap = () => {
  const dates = getLastMonthFirstDateAndThisMonthLastDate();

  const {
    data: heatMapData,
    isLoading: heatMapDataIsLoading,
    error: heatMapDataError,
  } = useQuery({
    queryKey: ["defaultRoom"],
    queryFn: () =>
      getAwakeSuccessCountForHeatMap(
        // defaultRoomがない場合、負の数を返してNullを返す

        dates.firstDateOfLastMonth,
        dates.lastDateOfCurrentMonth
      ),
  });

  const pairData = makeDateAndSuccessCountArray(heatMapData);
  const splitValuesBySeven = splitArrayIntoChunks(pairData, 7);

  return (
    <>
      {heatMapDataIsLoading && (
        <Skeleton width={100} animation="wave" className=" ml-2 rounded-3xl" />
      )}
      {heatMapDataError &&
        Toast.show({
          type: "error",
          text1: "ルームの成績は取得できませんでした",
        })}

      {heatMapData && (
        <View className=" bg-white rounded-md shadow-sm py-3 px-4">
          <View className=" flex flex-row">
            <View>
              <Text className="mb-1">先月+今月の成功率</Text>
              <View className="flex flex-row">
                {splitValuesBySeven.map((chunk, index) => (
                  <View key={index} className="flex-col">
                    {chunk.map((value, index) => (
                      <View
                        key={index}
                        className={`${colorsForCountOnHeatMap(
                          value.awakeSuccessCount
                        )} p-1 m-0.5 h-1/7 aspect-square`}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </View>
            <View className="ml-14 ">
              <Text className=" flex items-center">成功率は80%！</Text>
              <CuteDragon />
            </View>
          </View>
        </View>
      )}
    </>
  );
};
