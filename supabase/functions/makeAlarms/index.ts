import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { supabase } from "../../../src/libs/supabase.ts";

// 0時00分になったら毎回アクティブなルームメンバーだけアラームを作成する

function getTimeFromString(timeStr: string): { hour: number; minute: number } {
  const [hourStr, minuteStr] = timeStr.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  return { hour, minute };
}

function getAlarmTime(wakeupTime: string) {
  // 現在時刻を取得
  const now = new Date();
  const { hour, minute } = getTimeFromString(wakeupTime);
  console.log("wakeuptimeという引数の値:", wakeupTime);
  if (wakeupTime === "NG") return null;

  // ルール設定に基づいて、アラーム時刻を計算
  const alarmTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute
  );

  // アラーム時刻が過去の場合、翌日のアラーム時刻を設定
  if (alarmTime < now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }

  console.log(alarmTime, "これがalarmTime");

  return alarmTime.toISOString();
}

Deno.serve(async (req) => {
  try {
    // 環境変数の読み込み
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("環境変数が設定されていません。");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      // Activeなroom_membersの抽出
      const {
        data: activeRoomMembersWithRuleData,
        error: activeRoomMembersWithRuleError,
      } = await supabase
        .from("room_members")
        .select(
          `
        *,
        rooms:room_id (
          *,
          rules:rule (
            *
          )
        )
      `
        )
        .eq("status", "active");

      if (activeRoomMembersWithRuleError) {
        console.error(
          "アクティブなルームメンバーデータ（Rulesデータ付き）のエラー:",
          activeRoomMembersWithRuleError
        );
      }

      if (!activeRoomMembersWithRuleData)
        return new Response("No action needed", { status: 200 });

      console.log(
        "アクティブなルームメンバーデータ（Rulesデータ付き）",
        activeRoomMembersWithRuleData
      );

      // 今日の曜日を取得（0 = 日曜日, 6 = 土曜日）
      const today = new Date().getDay();

      const activeRoomMembersWithRulesinTodayActive =
        activeRoomMembersWithRuleData.filter((roomMember) =>
          roomMember.rooms.rules.active_days.includes(today)
        );

      console.log(
        "Todayに関連しているものだけ抜粋",
        activeRoomMembersWithRulesinTodayActive
      );

      // TODO このタイミングでSkippingなRoom Memberもactiveに設定するべき。と思っていたが、実は違うかもしれない。ただここでやりたい。つまりactiveじゃなくても、今日ルール上必要ならもう先にactiveに戻せばいいということだ。


      // すべてのアラームレコードの挿入処理を準備
      const insertPromises = activeRoomMembersWithRulesinTodayActive.map(
        (roomMember) => {
          const alarmParams = {
            status: "standby",
            alarm_time: getAlarmTime(roomMember.rooms.rules.wakeup_time), // 実際のアラーム時刻を設定
            room_id: roomMember.room_id,
            user_id: roomMember.user_id,
          };

          console.log("設定されたアラームタイム", alarmParams.alarm_time);

          // Supabaseにアラームレコードを挿入するためのPromiseを生成
          return supabase.from("alarms").insert([alarmParams]);
        }
      );


      // すべての挿入処理を並行して実行
      Promise.all(insertPromises)
        .then((results) => {
          // 各挿入処理の結果を処理
          results.forEach(({ data, error }, index) => {
            if (error) {
              console.error(
                `アラームレコード${index}の挿入に失敗しました:`,
                error
              );
            } else {
              console.log(
                `アラームレコード${index}が正常に挿入されました:`,
                data
              );
            }
          });
        })
        .catch((error) => {
          // 全体の処理におけるエラーハンドリング
          console.error("アラームレコードの挿入処理に失敗しました:", error);
        });
    } catch (err) {
      // Supabase 操作のエラー処理
      return new Response(String(err?.message ?? err), { status: 500 });
    }
  } catch (err) {
    // その他のエラー処理
    return new Response(String(err?.message ?? err), { status: 500 });
  }
  return new Response("OK");
});
