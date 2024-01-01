import { Alert } from "react-native";
import { supabase } from "../../../libs/supabase"; 
import { SignInOrUpWithEmailProps } from "../types/SignInOrUpWithEmailProps";

export const signUpWithEmailFunction = async ({
  email,
  password,
  setLoading,
}: SignInOrUpWithEmailProps) => {
  setLoading(true);
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) Alert.alert(error.message);
  if (!session) Alert.alert("Please check your inbox for email verification!");
  setLoading(false);
};
