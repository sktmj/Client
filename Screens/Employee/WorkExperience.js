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
  const [regExpExNo, setRegExpExNo] = useState("");
  const [SalesExp, setSalesExp] = useState("");
  const [HealthIssue, setHealthIssue] = useState("");
  const [IsDriving, setIsDriving] = useState("");
  const [LicenseNo, setLicenseNo] = useState("");
  const [IsCompWrkHere, setIsCompWrkHere] = useState("");
  const [CarLicense, setCarLicense] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [epfNoVisible, setEpfNoVisible] = useState(false);
  const [epfNo, setEpfNo] = useState("");
  const [regExpExNoVisible, setRegExpExNoVisible] = useState(false);
  const [licenseNoVisible, setLicenseNoVisible] = useState(false);
  const [sections, setSections] = useState([]);
  useEffect(() => {
    fetchDesignationOptions();
    checkAuthentication();
  }, []);
  useEffect(() => {
    fetchExperienceDetails(); // Call the function when the component mounts
  }, []);
  useEffect(() => {
    if (isFresher) {
      setSections([]);
    } else {
      setSections([
        {
          CompName: "",
          Designation: "",
          LastSalary: "",
          RelieveReason: "",
          RefPerson: "",
          PhoneNo: "",
          FrmMnth: "",
          FrmYr: "",
          ToMnth: "",
          ToYr: "",
          InitSalary: "",
          LastCompany: false,
        },
      ]);
    }
  }, [isFresher]);

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        CompName: "",
        Designation: "",
        LastSalary: "",
        RelieveReason: "",
        RefPerson: "",
        PhoneNo: "",
        FrmMnth: "",
        FrmYr: "",
        ToMnth: "",
        ToYr: "",
        InitSalary: "",
        LastCompany: false,
      },
    ]);
  };

  const handleRemoveSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };
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
        setToken(storedToken); // Ensure token is trimmed of any extra characters
      }
    } catch (error) {
      console.error("Error checking authentication:", error.message);
    }
  };

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

  const fetchExperienceDetails = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("AppId");
      if (storedToken) {
        const response = await axios.get(
          "http://10.0.2.2:3000/api/v1/expc/getExpc",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        if (response.data.success) {
          console.log("Experience details retrieved successfully:", response.data.data);
          const fetchedExperience = response.data.data[0]; // Assuming you only need data from the first experience
          setCompName(fetchedExperience.CompName);
          setSelectedDesignation(fetchedExperience.Designation);
          // Similarly set other state variables
        } else {
          console.error("Experience details retrieval failed:", response.data.message);
        }
      } else {
        console.log("User is not authenticated. Redirecting to login screen...");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error fetching experience details:", error.message);
    }
  };


  const handlesubmit = async () => {
    console.log(token, "hhhhh");
    try {
      console.log(selectedDesignation, LastSalary, RelieveReason);
      // Add Qualification
      const experienceResponse = await axios.post(
        "http://10.0.2.2:3000/api/v1/expc/experience",
        {
          CompName:CompName,
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
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (experienceResponse.data.success) {
        Alert.alert("Success", "experience added successfully");
        // Now add Cours
        const WorkExperieceResponse = await axios.post(
          "http://10.0.2.2:3000/api/v1/expc/TotalExperience",
          {
            WorkCompany: WorkCompany,
            RelieveReason: RelieveReason,
            EPFNO: EPFNO,
            UANNO: UANNO,
            RegExpExNo: regExpExNo,
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
        console.log(WorkExperieceResponse);
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

  const handleCheckboxToggle = (fieldName) => {
    switch (fieldName) {
      case "EPFNO":
        setEpfNoVisible(!epfNoVisible);
        break;
      case "RegExpExNo":
        setRegExpExNoVisible(!regExpExNoVisible);
        break;
      case "LicenseNo":
        setLicenseNoVisible(!licenseNoVisible);
        break;
      case "IsDriving": // Add this case
        setIsDriving(!IsDriving); // Toggle the state value
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => setIsFresher((prev) => !prev)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name={isFresher ? "check-square" : "square"}
            size={24}
            color="black"
          />
          <Text style={styles.text}>I'M FRESHER :</Text>
        </View>
      </TouchableOpacity>

      {!isFresher &&
        sections.map((section, index) => (
          <View key={index}>
            <Text style={styles.sectionTitle}>Experience {index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Organization Name"
              value={section.CompName}
              onChangeText={(text) => {
                const updatedSections = [...sections];
                updatedSections[index].CompName = text;
                setSections(updatedSections);
              }}
            />
            <Text style={styles.text}>Select Designation:</Text>

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
<Text style={styles.text}>From-Month :</Text>

<TextInput
  style={styles.input}
  value={FrmMnth}
  onChangeText={setFrmMnth}
/>
 <Text style={styles.text}>From-Year:</Text>
<TextInput
  style={styles.input}
  placeholder="From-Year"
  value={FrmYr}
  onChangeText={setFrmYr}
/>
<Text style={styles.text}>To-Month :</Text>
<TextInput
  style={styles.input}
  placeholder="To-Month"
  value={ToMnth}
  onChangeText={setToMnth}
/>
<Text style={styles.text}>To-Year :</Text>
<TextInput
  style={styles.input}
  placeholder="To-Year"
  value={ToYr}
  onChangeText={setToYr}
/>
<Text style={styles.text}>Initial-Salary :</Text>
<TextInput
  style={styles.input}
  placeholder="Initial-Salary"
  value={InitSalary}
  onChangeText={setInitSalary}
/>
<Text style={styles.text}>Last-Salary :</Text>
<TextInput
  style={styles.input}
  placeholder="Last-Salary"
  value={LastSalary}
  onChangeText={setLastSalary}
/>
<Text style={styles.text}>Relieve-Reason :</Text>
<TextInput
  style={styles.input}
  placeholder="Relieve-Reason"
  value={RelieveReason}
  onChangeText={setRelieveReason}
/>
<Text style={styles.text}>Contact-Person :</Text>
<TextInput
  style={styles.input}
  placeholder="Contact-Person"
  value={RefPerson}
  onChangeText={setRefPerson}
/>
<Text style={styles.text}>Contact-Number :</Text>
<TextInput
  style={styles.input}
  placeholder="Contact-Number"
  value={PhoneNo}
  onChangeText={setPhoneNo}
/>

<TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveSection(index)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
          
        ))}

      {!isFresher && (
        
        <TouchableOpacity style={styles.addButton} onPress={handleAddSection}>
          <Text style={styles.addButtonText}>Add Experience</Text>
        </TouchableOpacity>
       
      )}
      <View>
          <Text style={styles.sectionTitle}>Current Working Company</Text>
          <Text style={styles.text}>current working company :</Text>
          <TextInput
            style={styles.input}
            placeholder="Current Working Company"
            value={WorkCompany}
            onChangeText={setWorkCompany}
          />
                <Text style={styles.text}>reason for relieving :</Text>
          <TextInput
            style={styles.input}
            placeholder="Reason for Relieving"
            value={workRelieveReason}
            onChangeText={setWorkRelieveReason}
          />

          {/* Checkbox for EPNNO */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleCheckboxToggle("EPFNO")}
          >
<Text style={styles.text}>having epf ?</Text>
            <Icon
              name={epfNoVisible ? "check-square-o" : "square-o"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {/* Input field for EPNNO */}
  
          {epfNoVisible && (

            <TextInput
              style={styles.input}
              placeholder="Enter EPF NO"
              value={epfNo}
              onChangeText={setEpfNo}
            />
          )}
          <Text style={styles.text}>UAN NO</Text>
          <TextInput
            style={styles.input}
            value={UANNO}
            onChangeText={setUANNO}
          />

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleCheckboxToggle("RegExpExNo")}
          >
            <Icon
              name={regExpExNoVisible ? "check-square-o" : "square-o"}
              size={20}
              color="black"
            />
    
            <Text style={styles.text}>RegExpExNo</Text>
          </TouchableOpacity>
          {/* Input field for RegExpExNo */}
          {regExpExNoVisible && (
            <TextInput
              style={styles.input}
              placeholder="Enter RegExpExNo"
              value={regExpExNo}
              onChangeText={setRegExpExNo}
            />
          )}
            <Text style={styles.text}>Textile / Jewellery Experience :</Text>
          <TextInput
            style={styles.input}
            value={SalesExp}
            onChangeText={setSalesExp}
          />
   <Text style={styles.text}>Any Health Issue :</Text>
          <TextInput
            style={styles.input}
            placeholder="Any Health Issue"
            value={HealthIssue}
            onChangeText={setHealthIssue}
          />

          {/* Checkbox for LicenseNo */}
          <View>
            {/* Checkbox for IsDriving */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setIsDriving(!IsDriving);
                // Toggle visibility of input field based on IsDriving
                if (!IsDriving) {
                  setLicenseNoVisible(true);
                } else {
                  setLicenseNoVisible(false);
                }
              }}
            >
              <Icon
                name={IsDriving ? "check-square-o" : "square-o"}
                size={20}
                color="black"
              />
              <Text style={styles.text}>do you ride bike ?</Text>
            </TouchableOpacity>

            {/* Input field for LicenseNo */}
            {licenseNoVisible && (
              <TextInput
                style={styles.input}
                placeholder="Enter LicenseNo"
                value={LicenseNo}
                onChangeText={(text) => setLicenseNo(text)}
              />
            )}
          </View>
          {/* Checkbox for IsCompWrkHere */}
          <View>
            {/* Checkbox for IsCompWrkHere */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsCompWrkHere(!IsCompWrkHere)}
            >
              <Icon
                name={IsCompWrkHere ? "check-square-o" : "square-o"}
                size={20}
                color="black"
              />
           <Text style={styles.text}> Ready To Work In All Branches?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
           <Text style={styles.text}> License DOC</Text>
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
        <TouchableOpacity style={styles.submitButton} onPress={handlesubmit}>
          <Text style={styles.addButtonText}>Submit</Text>
        </TouchableOpacity>

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
  deleteButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  },
  submitButton: {
    backgroundColor:"#059A5F",
    paddingVertical:25,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
   
  }
});

export default WorkExperience;
