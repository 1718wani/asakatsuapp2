import { Text, View } from "react-native";
import CuteDragon from "../../../../components/CuteDragon";

type dateData = {
  date: string;
  awakeSuccessCount: number | undefined;
};

export const AwakeHeatMap = () => {
  const values: dateData[] = [
    { date: "2023/12/17", awakeSuccessCount: 2 },
    { date: "2023/12/18", awakeSuccessCount: 4 },
    { date: "2023/12/19", awakeSuccessCount: 3 },
    { date: "2023/12/20", awakeSuccessCount: 3 },
    { date: "2023/12/21", awakeSuccessCount: 1 },
    { date: "2023/12/22", awakeSuccessCount: 3 },
    { date: "2023/12/23", awakeSuccessCount: 3 },
    { date: "2023/12/24", awakeSuccessCount: 2 },
    { date: "2023/12/25", awakeSuccessCount: 0 },
    { date: "2023/12/26", awakeSuccessCount: 3 },
    { date: "2023/12/27", awakeSuccessCount: 3 },
    { date: "2023/12/28", awakeSuccessCount: 1 },
    { date: "2023/12/29", awakeSuccessCount: 3 },
    { date: "2023/12/30", awakeSuccessCount: 4 },
    { date: "2023/12/31", awakeSuccessCount: 4 },
    { date: "2024/01/01", awakeSuccessCount: 2 },
    { date: "2024/01/02", awakeSuccessCount: 3 },
    { date: "2024/01/03", awakeSuccessCount: 3 },
    { date: "2024/01/04", awakeSuccessCount: 4 },
    { date: "2024/01/05", awakeSuccessCount: 3 },
    { date: "2024/01/06", awakeSuccessCount: 2 },
    { date: "2024/01/07", awakeSuccessCount: 3 },
    { date: "2024/01/08", awakeSuccessCount: 1 },
    { date: "2024/01/09", awakeSuccessCount: 1 },
    { date: "2024/01/10", awakeSuccessCount: 3 },
    { date: "2024/01/11", awakeSuccessCount: 2 },
    { date: "2024/01/12", awakeSuccessCount: 1 },
    { date: "2024/01/13", awakeSuccessCount: 1 },
    { date: "2024/01/14", awakeSuccessCount: 1 },
    { date: "2024/01/15", awakeSuccessCount: 4 },
    { date: "2024/01/16", awakeSuccessCount: 1 },
    { date: "2024/01/17", awakeSuccessCount: 1 },
    { date: "2024/01/18", awakeSuccessCount: 2 },
    { date: "2024/01/19", awakeSuccessCount: 4 },
    { date: "2024/01/20", awakeSuccessCount: 2 },
    { date: "2024/01/21", awakeSuccessCount: 3 },
    { date: "2024/01/22", awakeSuccessCount: 2 },
    { date: "2024/01/23", awakeSuccessCount: 4 },
    { date: "2024/01/24", awakeSuccessCount: 2 },
    { date: "2024/01/25", awakeSuccessCount: 4 },
    { date: "2024/01/26", awakeSuccessCount: 2 },
    { date: "2024/01/27", awakeSuccessCount: 4 },
    { date: "2024/01/28", awakeSuccessCount: 2 },
    { date: "2024/01/29", awakeSuccessCount: 3 },
    { date: "2024/01/30", awakeSuccessCount: 2 },

    { date: "2024/03/02", awakeSuccessCount: undefined },
    { date: "2024/03/03", awakeSuccessCount: undefined },
    { date: "2024/03/04", awakeSuccessCount: undefined },
    { date: "2024/03/05", awakeSuccessCount: undefined },
    { date: "2024/03/06", awakeSuccessCount: undefined },
    { date: "2024/03/07", awakeSuccessCount: undefined },
    { date: "2024/03/08", awakeSuccessCount: undefined },
    { date: "2024/03/09", awakeSuccessCount: undefined },
    { date: "2024/03/10", awakeSuccessCount: undefined },
    { date: "2024/03/11", awakeSuccessCount: undefined },
    { date: "2024/03/12", awakeSuccessCount: undefined },
    { date: "2024/03/13", awakeSuccessCount: undefined },
    { date: "2024/03/14", awakeSuccessCount: undefined },
    { date: "2024/03/15", awakeSuccessCount: undefined },
  ];

  const splitValuessBySeven: dateData[][] = values.reduce(
    (result: dateData[][], item: dateData, index: number) => {
      const chunkIndex: number = Math.floor(index / 7);

      if (!result[chunkIndex]) {
        result[chunkIndex] = []; // 新しいチャンクの開始
      }

      result[chunkIndex].push(item);

      return result;
    },
    []
  );

  const getColorForCount = (count: number | undefined): string => {
    switch (count) {
      case 1:
        return "bg-red-100";
      case 2:
        return "bg-red-200";
      case 3:
        return "bg-red-300";
      case 4:
        return "bg-red-400";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <View className=" bg-white rounded-md shadow-sm py-3 px-4">
      <View className=" flex flex-row">
        <View>
          <Text className="mb-1">ここ60日の成功率</Text>
          <View className="flex flex-row">
            {splitValuessBySeven.map((chunk, index) => (
              <View key={index} className="flex-col">
                {chunk.map((value, index) => (
                  <View
                    key={index}
                    className={`${getColorForCount(
                      value.awakeSuccessCount
                    )} p-1 m-0.5 h-1/7 aspect-square`}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
        <View className="ml-14 ">
          <Text className=" flex items-center">成功率は80%</Text>
          <CuteDragon />
        </View>
      </View>
    </View>
  );
};
