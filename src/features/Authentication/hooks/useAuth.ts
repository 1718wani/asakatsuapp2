import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../../libs/supabase";
import { signInWithEmailFunction } from "../functions/signInWithEmail";
import { signUpWithEmailFunction } from "../functions/signUpWithEmail";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // signInWithEmailを切り出した関数を使用
  async function signInWithEmail() {
    await signInWithEmailFunction({ email, password, setLoading });
  }

  // signUpWithEmailを切り出した関数を使用
  async function signUpWithEmail() {
    await signUpWithEmailFunction({ email, password, setLoading });
  }

  return {
    setEmail,
    setPassword,
    signInWithEmail,
    signUpWithEmail,
    email,
    password,
    loading,
  };
};
