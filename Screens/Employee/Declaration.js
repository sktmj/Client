import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomCheckBox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={styles.checkbox}>
        {checked && <Icon name="check-square-o" size={24} color="green" />}
        {!checked && <Icon name="square-o" size={24} color="green" />}
      </View>
      <Text style={styles.checkboxText}>I agree to the declaration</Text>
    </TouchableOpacity>
  );
};

const DeclarationComponent = () => {
  const [declaration, setDeclaration] = useState(false);
  const [goal, setGoal] = useState("");
  const [roleModel, setRoleModel] = useState("");
  const [roleModelWhy, setRoleModelWhy] = useState("");
  const [ourJobDtl, setOurJobDtl] = useState("");
  const [knownJobPlus, setKnownJobPlus] = useState("");
  const [knownJobMinus, setKnownJobMinus] = useState("");
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("AppId");
      if (!storedToken) {
        console.log(
          "User is not authenticated. Redirecting to login screen..."
        );
        navigation.navigate("Login");
      } else {
        console.log("User is authenticated.");
        setIsLoggedIn(true);
        setToken(storedToken.trim()); // Ensure token is trimmed of any extra characters
      }
    } catch (error) {
      console.error("Error checking authentication:", error.message);
    }
  };
  const handleDeclarationChange = () => {
    setDeclaration(!declaration);
  };
  const handleUpdateDeclaration = async () => {
    try {
      const response = await fetch(
        "http://10.0.2.2:3000/api/v1/prsl/declaration", // Correct endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Declaration: declaration,
            Goal: goal,
            RoleModel: roleModel,
            RoleModelWhy: roleModelWhy,
            OurJobDtl: ourJobDtl,
            KnownJobPlus: knownJobPlus,
            KnownJobMinus: knownJobMinus,
          }),
        }
      );

      const responseData = await response.json(); // Parse response data

      if (responseData.success) {
        Alert.alert("Success", "Declaration updated successfully");
        // Additional actions after successful update
      } else {
        Alert.alert("Error", responseData.message);
      }
    } catch (error) {
      console.error("Error updating declaration:", error.message);
      Alert.alert("Error", "Failed to update declaration");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Your Thoghts About The Chennai Silks Group?
      </Text>
      <TextInput
        style={styles.input}
        value={ourJobDtl}
        onChangeText={setOurJobDtl}
      />
      <Text style={styles.text}>Future Goal?</Text>
      <TextInput style={styles.input} value={goal} onChangeText={setGoal} />
      <Text style={styles.text}>In which Job You Will be more effective?</Text>
      <TextInput
        style={styles.input}
        value={knownJobPlus}
        onChangeText={setKnownJobPlus}
      />
      <Text style={styles.text}>In which Job You Will be less effective? </Text>
      <TextInput
        style={styles.input}
        value={knownJobMinus}
        onChangeText={setKnownJobMinus}
      />

      <Text style={styles.text}>Role Model? </Text>
      <TextInput
        style={styles.input}
        value={roleModel}
        onChangeText={setRoleModel}
      />

      <Text style={styles.text}>Why? </Text>
      <TextInput
        style={styles.input}
        value={roleModelWhy}
        onChangeText={setRoleModelWhy}
      />

      <CustomCheckBox checked={declaration} onPress={handleDeclarationChange} />
      <TouchableOpacity onPress={handleUpdateDeclaration}>
        <View style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DeclarationComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkbox: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor:  "#059A5F",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#333",
    textTransform: "uppercase",
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    width: 400,
  },
});
