import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const Start = () => {
  const [familyDetails, setFamilyDetails] = useState([
    {
      id: 1,
      relationship: "",
      name: "",
      age: "",
      work: "",
      monthSalary: "",
      phoneNo: "",
    },
  ]);

  useEffect(() => {
    // Fetch token and AppId from AsyncStorage when component mounts
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        console.log("Token retrieved successfully:", token);
        // You can set the AppId when the user logs in
        const appId = "yourAppId"; // Example AppId, replace with your logic
        await AsyncStorage.setItem("AppId", appId);
        console.log("AppId set successfully:", appId);
      } else {
        console.log("Token not found");
      }
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  const addFamilyMember = () => {
    const newId = familyDetails.length + 1;
    setFamilyDetails([
      ...familyDetails,
      {
        id: newId,
        relationship: "",
        name: "",
        age: "",
        work: "",
        monthSalary: "",
        phoneNo: "",
      },
    ]);
  };

  const removeFamilyMember = (id) => {
    const updatedFamily = familyDetails.filter(
      (familyDetail) => familyDetail.id !== id
    );
    setFamilyDetails(updatedFamily);
  };

  const saveFamilyDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const appId = await AsyncStorage.getItem("AppId"); // Retrieve AppId

      if (!appId) {
        console.log("AppId not found");
        return; // Exit function if AppId not found
      }

      const response = await axios.post(
        "http://10.0.2.2:3000/api/v1/fam/family",
        {
          familyDetails,
          AppId: appId, // Send AppId along with family details
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Family details saved successfully");
        Alert.alert("Success", "Family details saved successfully");
      } else {
        console.error("Failed to save family details");
        Alert.alert("Error", "Failed to save family details");
      }
    } catch (error) {
      console.error("Error saving family details:", error.message);
      Alert.alert("Error", "An error occurred while saving family details");
    }
  };

  const handleChangeRelation = (value, id) => {
    setFamilyDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, relationship: value } : item
      )
    );
  };

  const handleChangeName = (value, id) => {
    setFamilyDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, name: value } : item
      )
    );
  };

  const handleChangeAge = (value, id) => {
    setFamilyDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, age: value } : item
      )
    );
  };

  const handleChangeWork = (value, id) => {
    setFamilyDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, work: value } : item
      )
    );
  };

  const handleChangeMonthSalary = (value, id) => {
    setFamilyDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, monthSalary: value } : item
      )
    );
  };

  const handleChangePhoneNo = (value, id) => {
    setFamilyDetails((prevDetails) =>
      prevDetails.map((item) =>
        item.id === id ? { ...item, phoneNo: value } : item
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Family Details Form</Text>
        {familyDetails.map((familyDetail) => (
          <View key={familyDetail.id} style={styles.memberContainer}>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={familyDetail.relationship}
                onValueChange={(value) =>
                  handleChangeRelation(value, familyDetail.id)
                }
              >
                <Picker.Item label="Select Relationship" value="" />
                <Picker.Item label="Brother" value="Brother" />
                <Picker.Item label="Sister" value="Sister" />
                <Picker.Item label="Father" value="Father" />
                <Picker.Item label="Mother" value="Mother" />
                <Picker.Item label="Spouse" value="Spouse" />
                <Picker.Item label="Children" value="Children" />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={familyDetail.name}
              onChangeText={(value) => handleChangeName(value, familyDetail.id)}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={familyDetail.age}
              onChangeText={(value) => handleChangeAge(value, familyDetail.id)}
            />
            <TextInput
              style={styles.input}
              placeholder="Work"
              value={familyDetail.work}
              onChangeText={(value) => handleChangeWork(value, familyDetail.id)}
            />
            <TextInput
              style={styles.input}
              placeholder="Monthly Salary"
              value={familyDetail.monthSalary}
              onChangeText={(value) =>
                handleChangeMonthSalary(value, familyDetail.id)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={familyDetail.phoneNo}
              onChangeText={(value) =>
                handleChangePhoneNo(value, familyDetail.id)
              }
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeFamilyMember(familyDetail.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addFamilyMember}>
          <Text style={styles.addButtonText}>+ Add Family Member</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={saveFamilyDetails}>
          <Text style={styles.saveButtonText}>Save and Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  memberContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#059A5F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Start;
