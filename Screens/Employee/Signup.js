// SignupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigation = useNavigation();

  const handleSendOTP = () => {
    // Code to send OTP
    setOtpSent(true); // For demonstration, assume OTP sent successfully
  };
  const handleClick = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Applicant Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity style={styles.otpButton} onPress={handleSendOTP}>
        <Text style={styles.buttonText}>
          {otpSent ? "Resend OTP" : "Send OTP"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginRedirect} onPress={handleClick}>
        <Text style={styles.redirectText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#090920", //
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff", // White color
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
    backgroundColor: "#fff", // White color
  },
  otpButton: {
    backgroundColor: "#059A5F", // Navy Blue color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff", // White color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginRedirect: {
    marginTop: 20,
  },
  redirectText: {
    color: "#fff", // White color
    fontSize: 16,
  },
});
