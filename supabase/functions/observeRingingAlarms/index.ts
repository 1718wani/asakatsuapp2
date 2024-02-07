import subMinutes from "https://deno.land/x/date_fns@v2.22.1/subMinutes/index.ts";
import isSameHour from "https://deno.land/x/date_fns@v2.22.1/isSameHour/index.ts";
import isSameMinute from "https://deno.land/x/date_fns@v2.22.1/isSameMinute/index.ts";
import parseISO from "https://deno.land/x/date_fns@v2.22.1/parseISO/index.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// 型定義
type AlarmData = {
  id: any;
  user_id: any;
  alarm_time: string;
};

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
      // alarmsのwakeup_timeが今のものだけ抜き出す。
      const now = new Date();
      // 15分後の時刻を計算
      const fifteenMinutesLater = subMinutes(now, 15);

      const { data: standbyAlarmsData, error: standbyAlarmsError } =
        await supabase
          .from("alarms")
          .select("id,user_id,alarm_time")
          .eq("status", "ringing");

      if (standbyAlarmsError) {
        console.error("standbyのアラームの取得を失敗しています。");
        throw standbyAlarmsData;
      }

      if (standbyAlarmsData.length === 0) {
        return new Response(
          "該当アラームがありませんでしたのでNo action needed",
          { status: 200 }
        );
      }

      // フィルタリング処理の関数
      const filterSameTime = (alarmsData: AlarmData[] | null) => {
        if (!alarmsData) return [];

        return alarmsData.filter((alarm) => {
          const date = parseISO(alarm.alarm_time, "");
          return (
            isSameHour(fifteenMinutesLater, date) &&
            isSameMinute(fifteenMinutesLater, date)
          );
        });
      };

      const filteredAlarms = filterSameTime(standbyAlarmsData);
      const filteredAlarmsId = filteredAlarms.map((alarm) => alarm.id);
      console.log("フィルタリング結果", filteredAlarms);
      if (filteredAlarms.length === 0) {
        return new Response(
          "該当アラームが時刻でフィルタリングした結果ありませんでしたのでNo action needed",
          { status: 200 }
        );
      }

      const { data: tokensData, error: tokensError } = await supabase
        .from("profiles")
        .select("expo_push_token")
        .in(
          "id",
          filteredAlarms.map((a) => a.user_id)
        );

      if (tokensError) {
        console.error("Tokenの取得を失敗しています。");
        throw standbyAlarmsData;
      }

      if (tokensData.length === 0) {
        return new Response("該当tokenがありませんでしたのでNo action needed", {
          status: 200,
        });
      }

      // その人たちのデバイスIDにだけプッシュ通知を送る。

      const pushNotifications = tokensData.map(async (tokenData) => {
        return fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: tokenData.expo_push_token,
            sound: "default",
            body: "もう時間終了です。のテスト",
          }),
        }).then((res) => res.json());
      });

      const results = await Promise.all(pushNotifications);

      // alarms テーブルの該当するレコードの status を 'ringing' に更新
      const { error: updateError } = await supabase
        .from("alarms")
        .update({ status: "failure" })
        .eq("status", "ringing")
        .in("id", filteredAlarmsId);

      if (updateError) {
        console.error("アラームのステータス更新に失敗しました。", updateError);
        throw updateError;
      }

      return new Response(JSON.stringify({ results }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
      // またそれらのalarmsだけisRingingに変える。
    } catch (err) {
      // Supabase 操作のエラー処理
      return new Response(String(err?.message ?? err), { status: 500 });
    }
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
