import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Admin"); // Default to "Admin"
  const Navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://103.99.149.67:3000/api/v1/auth/login", {
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
        await AsyncStorage.setItem("token", responseData.token);
        await AsyncStorage.setItem("AppId", JSON.stringify(responseData.AppId)); // Stringify AppId
        console.log("Token and AppId stored:", responseData.token, responseData.AppId);

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
  const handleSignin = ()=>{
    Alert.alert("Oops...You are not an Admin");
  }

  const handleCarrier = () => {
    setUserType("Carrier");
  };

  const handleAdmin = () => {
    setUserType("Admin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.carrier} onPress={handleCarrier}>
          <Text style={styles.carrierText}>Carrier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.admin} onPress={handleAdmin}>
          <Text style={styles.adminText}>Admin</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <Image source={require('../../assets/images/daivel1.png')} style={styles.image} />
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
        {userType === "Carrier" ? (
          <>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>
                Not registered yet? Register here
              </Text>
            </TouchableOpacity>
          </>
        ) : userType === "Admin" ? (
          <TouchableOpacity style={styles.loginButton} onPress={handleSignin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090920",
    paddingHorizontal: 20,
  },
  topContainer: {
    width: '100%',
    position: 'absolute',
    top: 20, // Adjust as needed
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    color: '#333', // Text color
  },
  loginButton: {
    backgroundColor: '#059A5F',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerLink: {
    color: 'white',
    fontSize: 16,
  },
  admin: {
    paddingVertical: 10,
    backgroundColor: '#059A5F',
    borderRadius: 8,
    width: 100,
    marginLeft: 10
  },
  adminText: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 20
  },
  carrier: {
    paddingVertical: 10,
    backgroundColor: "#059A5F",
    borderRadius: 8,
    width: 100,
    marginLeft: 10
  },
  carrierText: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 20
  },
  image: {
    width: 400,
    height: 80,
    marginBottom: 20,
  },
});
