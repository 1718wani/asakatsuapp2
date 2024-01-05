import { dateData } from "../../types/dateAndAwakeCountPairArray";

/**
 * 配列を指定したサイズのチャンクに分割する関数
 * @param array 分割する配列
 * @param chunkSize チャンクのサイズ
 * @returns 分割された配列の配列
 */
export const splitArrayIntoChunks = (
  array: dateData[],
  chunkSize: number
): dateData[][] => {
  return array.reduce((result: dateData[][], item: dateData, index: number) => {
    const chunkIndex: number = Math.floor(index / chunkSize);

    if (!result[chunkIndex]) {
      result[chunkIndex] = []; // 新しいチャンクの開始
    }

    result[chunkIndex].push(item);

    return result;
  }, []);
};
