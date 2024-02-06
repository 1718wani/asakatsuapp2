import { err } from "react-native-svg/lib/typescript/xml";
import { supabase } from "../../../libs/supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

export const uploadToBucket = async (imageFileUri: string) => {
  // ファイル名を取得（例：image.png）
  const fileName = imageFileUri.split("/").pop();

  const filePath = `my_folder/${fileName}`;
  const base64 = await FileSystem.readAsStringAsync(imageFileUri, {
    encoding: "base64",
  });
  const contentType = "image/png";

  const { error } = await supabase.storage
    .from("my_bucket")
    .upload(filePath, decode(base64), { contentType });
  if (error) {
    console.error("imageがアップロードできないです。");
    throw error;
  }

  // 画像のURLを取得
  const { data } = supabase.storage.from("my_bucket").getPublicUrl(filePath);
  const uploadedImageUrl = data.publicUrl;

  return uploadedImageUrl;
};
