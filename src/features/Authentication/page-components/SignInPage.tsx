import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Button, Input } from "react-native-elements";
import { useAuth } from "../hooks/useAuth";
import { AuthenticationInputField } from "../components/AuthenticationInputField";

export const SignInPageComponent = () => {
  const {
    setEmail,
    setPassword,
    signInWithEmail,
    signUpWithEmail,
    email,
    password,
    loading,
  } = useAuth();

  return (
    <AuthenticationInputField
      setEmail={setEmail}
      setPassword={setPassword}
      signInWithEmail={signInWithEmail}
      signUpWithEmail={signUpWithEmail}
      email={email}
      password={password}
      loading={loading}
    />
  );
};
