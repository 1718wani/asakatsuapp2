import { router } from "expo-router";
import { supabase } from "../../../libs/supabase";
import { path } from "../../../consts/path";

export const signOut = () => {
  supabase.auth.signOut();
};
