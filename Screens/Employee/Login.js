import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const Navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserName: phoneNumber }),
      });
  
      if (!response.ok) {
        throw new Error("Error logging in");
      }
  
      const responseData = await response.json();
  
      if (responseData.token && responseData.AppId) {
        // Store token and AppId in AsyncStorage
        // Store token and AppId in AsyncStorage
await AsyncStorage.setItem("token", responseData.token);
await AsyncStorage.setItem("AppId", JSON.stringify(responseData.AppId)); // Stringify AppId
console.log("Token and AppId stored:", responseData.token, responseData.AppId);

        // Redirect to personal details screen
        Navigation.navigate("Application Form");
      } else {
        console.error("Token or AppId not received");
        Alert.alert("Login failed", "Token or AppId not received");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Login error", error.message);
    }
  };
  const handleRegister = () => {
    Navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerLink}>
          Not registered yet? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#090920",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#333", // Text color
  },
  loginButton: {
    backgroundColor: "#059A5F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerLink: {
    color: "white",
    fontSize: 16,
  },
});