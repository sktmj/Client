import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";

const WorkExperience = ({ navigation }) => {
  const [isFresher, setIsFresher] = useState(false);
  const [CompName, setCompName] = useState("");
  const [designationOptions, setDesignationOptions] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [LastSalary, setLastSalary] = useState(0); // Default to 0
  const [RelieveReason, setRelieveReason] = useState("");
  const [RefPerson, setRefPerson] = useState("");
  const [PhoneNo, setPhoneNo] = useState(""); // Default to empty string
  const [FrmMnth, setFrmMnth] = useState("");
  const [FrmYr, setFrmYr] = useState("");
  const [ToMnth, setToMnth] = useState("");
  const [ToYr, setToYr] = useState("");
  const [InitSalary, setInitSalary] = useState(0); // Default to 0
  const [LastCompany, setLastCompany] = useState("");
  const [WorkCompany, setWorkCompany] = useState("");
  const [workRelieveReason, setWorkRelieveReason] = useState("");
  const [EPFNO, setEPFNO] = useState("");
  const [UANNO, setUANNO] = useState("");
  const [RegExpExNo, setRegExpExNo] = useState("");
  const [SalesExp, setSalesExp] = useState("");
  const [HealthIssue, setHealthIssue] = useState("");
  const [IsDriving, setIsDriving] = useState("");
  const [LicenseNo, setLicenseNo] = useState("");
  const [IsCompWrkHere, setIsCompWrkHere] = useState("");
  const [CarLicense, setCarLicense] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDesignationOptions();
  }, []);

  const fetchDesignationOptions = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:3000/api/v1/expc/designation"
      );
      setDesignationOptions(response.data);
    } catch (error) {
      console.error("Error fetching Designations: ", error.message);
    }
  };

  const handlesubmit = async () => {
    try {
      // Add Qualification
      const experienceResponse = await axios.post(
        "http://10.0.2.2:3000/api/v1/expc/experience",
        {
          CompName,
          Designation: selectedDesignation,
          LastSalary: LastSalary,
          RelieveReason: RelieveReason,
          RefPerson: RefPerson,
          PhoneNo: PhoneNo,
          FrmMnth: FrmMnth,
          FrmYr: FrmYr,
          ToMnth: ToMnth,
          ToYr: ToYr,
          InitSalary: InitSalary,
          LastCompany: LastCompany ? "Y" : "N",
        }
      );

      if (experienceResponse.data.success) {
        Alert.alert("Success", "experience added successfully");
        // Now add Course
        const token = await AsyncStorage.getItem("token");
        const WorkExperieceResponse = await axios.post(
          "http://10.0.2.2:3000/api/v1/expc/TotalExperience",
          {
            WorkCompany: WorkCompany,
            RelieveReason: RelieveReason,
            EPFNO: EPFNO,
            UANNO: UANNO,
            RegExpExNo: RegExpExNo,
            SalesExp: SalesExp,
            HealthIssue: HealthIssue,
            IsDriving: IsDriving,
            LicenseNo: LicenseNo,
            IsCompWrkHere: IsCompWrkHere,
            CarLicense: CarLicense ? "Y" : "N",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (WorkExperieceResponse.status === 200) {
          Alert.alert("Success", "WorkExperience added successfully");
          // Navigate to next screen or perform any other action
        } else {
          Alert.alert("Error", WorkExperieceResponse.data.message);
        }
      } else {
        Alert.alert("Error", experienceResponse.data.message);
      }
    } catch (error) {
      console.error(
        "Error adding Experience and WorkExperience:",
        error.message
      );
      Alert.alert("Error", "Failed to add Experience and WorkExperience");
    }
  };

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("CarLicenseDoc", file);

      const response = await fetch("http://10.0.2.2:3000/api/v1/expc/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          // You may need to include other headers such as authorization token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      console.log(data);

      Alert.alert("Success", "File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error.message);
      Alert.alert("Error", "Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  const handleChooseFile = async () => {
    try {
      const fileResult = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Change the type as needed
      });

      if (fileResult.type === "success" && fileResult.uri) {
        const fileData = {
          uri: fileResult.uri,
          name: fileResult.name,
          type: "image/jpeg", // Change the type as needed
        };
        setFile(fileData);
      }
    } catch (error) {
      console.error("Error choosing file:", error.message);
      Alert.alert("Error", "Failed to choose file");
    }
  };
  return (
    <ScrollView style={styles.container}>
    
      <View style={styles.inputContainer}>
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
              <TextInput
                style={styles.input}
                placeholder="Organizaion Name Name"
                value={CompName}
                onChangeText={setCompName}
              />
              <Text>Select Designation:</Text>

              {/* <Picker
          selectedValue={selectedDesignation}
          onValueChange={(itemValue, itemIndex) => setSelectedDesignation(itemValue)}
        >
          {designationOptions.map((option) => (
            <Picker.Item key={option.DesignationId.toString()} label={option.DesignationName} value={option.DesignationId} />
          ))}
        </Picker> */}

              <Picker
                selectedValue={selectedDesignation}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedDesignation(itemValue)
                }
              >
                <Picker.Item label="Select designation" value="" />
                {designationOptions.map((option, index) => (
                  <Picker.Item
                    key={`${option.DesignationId}_${index}`}
                    label={option.DesignationName}
                    value={option.DesignationId}
                  />
                ))}
              </Picker>

              <TextInput
                style={styles.input}
                placeholder="From-Month"
                value={FrmMnth}
                onChangeText={setFrmMnth}
              />
              <TextInput
                style={styles.input}
                placeholder="From-Year"
                value={FrmYr}
                onChangeText={setFrmYr}
              />

              <TextInput
                style={styles.input}
                placeholder="To-Month"
                value={ToMnth}
                onChangeText={setToMnth}
              />

              <TextInput
                style={styles.input}
                placeholder="To-Year"
                value={ToYr}
                onChangeText={setToYr}
              />
              <TextInput
                style={styles.input}
                placeholder="Initial-Salary"
                value={InitSalary}
                onChangeText={setInitSalary}
              />

              <TextInput
                style={styles.input}
                placeholder="Last-Salary"
                value={LastSalary}
                onChangeText={setLastSalary}
              />

              <TextInput
                style={styles.input}
                placeholder="Relieve-Reason"
                value={RelieveReason}
                onChangeText={setRelieveReason}
              />

              <TextInput
                style={styles.input}
                placeholder="Contact-Person"
                value={RefPerson}
                onChangeText={setRefPerson}
              />

              <TextInput
                style={styles.input}
                placeholder="Contact-Number"
                value={PhoneNo}
                onChangeText={setPhoneNo}
              />

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setLastCompany(!LastCompany)}
              >
                <Icon
                  name={LastCompany ? "check-square-o" : "square-o"}
                  size={20}
                  color="black"
                />
                <Text style={{ marginLeft: 8 }}>Last Company?</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

     <Text style={styles.sectionTitle}>Current Working Company</Text>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Button
            title="Choose File"
            onPress={handleChooseFile}
            disabled={loading}
          />
          <Button
            title="Upload File"
            onPress={handleFileUpload}
            disabled={!file || loading}
          />
        </View>
        {/* Add other input fields similarly */}
        <TouchableOpacity style={styles.addButton} onPress={handlesubmit}>
          <Text style={styles.addButtonText}>Insert</Text>
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
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#059A5F",
    paddingVertical: 12,
    paddingHorizontal: 16, // Adjusted for better visibility
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default WorkExperience;
