import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from 'expo-document-picker';

const Start = () => {
  const [isFresher, setIsFresher] = useState(false);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CompName: "",
    Designation: "",
    Duration: "",
    LastSalary: "",
    RelieveReason: "",
    RefPerson: "",
    PhoneNo: "",
    FrmMnth: "",
    FrmYr: "",
    ToMnth: "",
    ToYr: "",
    InitSalary: "",
    LastCompany: "N", // Default value for LastCompany
  });
  const Navigation = useNavigation();

  useEffect(() => {
    fetchDesignationOptions();
  }, []);

  const fetchDesignationOptions = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:3000/api/v1/expc/designation");
      setDesignationOptions(response.data);
    } catch (error) {
      console.error("Error fetching Designations: ", error.message);
    }
  };

  const toggleCheckbox = () => {
    setFormData({ ...formData, LastCompany: formData.LastCompany === "Y" ? "N" : "Y" });
  };

  const handleSaveAndProceed = () => {
    // Validate form data here if needed

    // Send form data to backend API
    axios.post("http://10.0.2.2:3000/api/v1/expc/experience", formData)
      .then((response) => {
        console.log("Data inserted successfully:", response.data);
        Navigation.navigate("FamilyDetails"); // Navigate to the next screen
      })
      .catch((error) => {
        console.error("Error inserting data:", error.message);
        // Handle error
      });
  };

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('CarLicenseDoc', file);

      const response = await fetch('http://10.0.2.2:3000/api/v1/expc/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // You may need to include other headers such as authorization token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      console.log(data);

      Alert.alert('Success', 'File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      Alert.alert('Error', 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleChooseFile = async () => {
    try {
      const fileResult = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // Change the type as needed
      });

      if (fileResult.type === 'success' && fileResult.uri) {
        const fileData = {
          uri: fileResult.uri,
          name: fileResult.name,
          type: 'image/jpeg', // Change the type as needed
        };
        setFile(fileData);
      }
    } catch (error) {
      console.error('Error choosing file:', error.message);
      Alert.alert('Error', 'Failed to choose file');
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <View>
        <TouchableOpacity onPress={() => setIsFresher((prev) => !prev)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isFresher ? (
              <FontAwesome name="check-square" size={24} color="black" />
            ) : (
              <FontAwesome name="square" size={24} color="black" />
            )}
            <Text style={{ marginLeft: 10 }}>I'm Fresher</Text>
          </View>
        </TouchableOpacity>

        {!isFresher && (
          <>
            <View>
              <Text>Select Designation:</Text>
              <Picker
                selectedValue={selectedDesignation}
                onValueChange={(itemValue) => {
                  setSelectedDesignation(itemValue);
                  setFormData({ ...formData, Designation: itemValue });
                }}
              >
                <Picker.Item label="Select Designation" value="" />
                {designationOptions.map((option) => (
                  <Picker.Item key={option.DesignationId} label={option.DesignationName} value={option.DesignationId} />
                ))}
              </Picker>
              <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
                placeholder="Organization Name"
                onChangeText={(text) => setFormData({ ...formData, CompName: text })}
              />
            </View>

            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="Duration"
              onChangeText={(text) => setFormData({ ...formData, Duration: text })}
            />
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="Last Salary"
              onChangeText={(text) => setFormData({ ...formData, LastSalary: text })}
            />
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="Relieve Reason"
              onChangeText={(text) => setFormData({ ...formData, RelieveReason: text })}
            />
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="Ref Person"
              onChangeText={(text) => setFormData({ ...formData, RefPerson: text })}
            />
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="Phone Number"
              onChangeText={(text) => setFormData({ ...formData, PhoneNo: text })}
            />
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="From Month"
              onChangeText={(text) => setFormData({ ...formData, FrmMnth: text })}
            />
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="From Year"
              onChangeText={(text) => setFormData({ ...formData, FrmYr: text })}
            />
            {/* Similarly add other input fields */}
            <TouchableOpacity onPress={toggleCheckbox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {formData.LastCompany === "Y" ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square" size={24} color="black" />
                )}
                <Text style={{ marginLeft: 10 }}>Last Company</Text>
              </View>
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <Button title="Choose File" onPress={handleChooseFile} disabled={loading} />
              <Button title="Upload File" onPress={handleFileUpload} disabled={!file || loading} />
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        style={{ backgroundColor: "#059A5F", padding: 30, borderRadius: 8, marginTop: 20, alignItems: "center" }}
        onPress={handleSaveAndProceed}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Save and Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Start;
