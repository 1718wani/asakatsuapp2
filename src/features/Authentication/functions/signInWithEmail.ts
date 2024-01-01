import { Alert } from "react-native";
import { supabase } from "../../../libs/supabase";
import { SignInOrUpWithEmailProps } from "../types/SignInOrUpWithEmailProps";

export const signInWithEmailFunction = async ({
  email,
  password,
  setLoading,
}: SignInOrUpWithEmailProps) => {
  setLoading(true);
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) Alert.alert(error.message);
  setLoading(false);
};
