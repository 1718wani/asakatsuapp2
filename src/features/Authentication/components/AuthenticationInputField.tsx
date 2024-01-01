import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";

// Propsの型定義
type SignInFormProps = {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  signInWithEmail: () => void;
  signUpWithEmail: () => void;
  email: string;
  password: string;
  loading: boolean;
};

export const AuthenticationInputField = ({
  setEmail,
  setPassword,
  signInWithEmail,
  signUpWithEmail,
  email,
  password,
  loading,
}: SignInFormProps) => {
  return (
    <View style={styles.container}>
      {/* Email Input */}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      {/* Password Input */}
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      {/* Sign in and Sign up Buttons */}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
