import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const Start = () => {
  const [isFresher, setIsFresher] = useState(false);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
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
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="To Month"
              onChangeText={(text) => setFormData({ ...formData, ToMnth: text })}
            />
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="To Year"
              onChangeText={(text) => setFormData({ ...formData, ToYr: text })}
            />
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
              placeholder="Initial Salary"
              onChangeText={(text) => setFormData({ ...formData, InitSalary: text })}
            />
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
