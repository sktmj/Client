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
  const [experiences, setExperiences] = useState([]);
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
  const [experienceField, setExperienceField] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(
    (token) => {
      fetchExperienceDetails(); // Call the function when the component mounts
      fetchDesignationOptions();
      fetchUserDetails();
    },
    [token]
  );

  const handleExperienceField = () => {
    setExperienceField([
      ...experienceField,
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
    setFormChanged(true);
  };

  const handleRemoveQualificationField = (index) => {
    const fields = [...experienceField];
    const removedField = fields.splice(index, 1)[0]; // Remove the field and get the removed item
    setExperienceField(fields);
    setFormChanged(true);

    // Check if the removed field was already present in the database
    if (removedField.ExpId) {
      // Perform deletion operation from the database
      // You can write the deletion logic here
      console.log(
        `Qualification with ID ${removedField.ExpId} will be deleted from the database`
      );
    }
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
      const response = await axios.get(
        "http://10.0.2.2:3000/api/v1/expc/getExpc",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the token from the state
          },
        }
      );
      if (response.data.success) {
        console.log("Courses retrieved successfully:", response.data.data);
        const fetchedExperience = response.data.data.map((experience) => ({
          ExpId: experience.ExpId,
          CompName: experience.CompName, // Include CourseId
          selectedDesignationn: experience.DesignationId,
          Designation: experience.Designation,
          RefPerson: experience.RefPerson,
          PhoneNo: experience.PhoneNo,
          FrmMnth: experience.FrmMnth,
          FrmYr: experience.FrmYr,
          RelieveReason:experience.workRelieveReason,
          ToMnth: experience.ToMnth,
          ToYr: experience.ToYr,
          InitSalary:experience.InitSalary? String(experience.InitSalary) : "",
          LastSalary:experience.LastSalary? String(experience.LastSalary) : "",
          LastCompany: experience.LastCompany ? "Y" : "N",
        }));
        setExperienceField(fetchedExperience);
      } else {
        console.error("Experience retrieval failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching Experience details:", error.message);
    }
  };

  const handlesubmit = async () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    setIsSubmitting(true);

    try {
      for (const experience of experienceField) {
        if (!experience.ExpId) {
          // Only add new qualifications
          const ExperienceResponse = await fetch(
            "http://10.0.2.2:3000/api/v1/expc/experience",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                CompName: experience.CompName,
                Designation: experience.selectedDesignation,
                LastSalary: experience.LastSalary,
                UANNO:experience.UANNO,
                RelieveReason: experience.workRelieveReason,
                RefPerson: experience.RefPerson,
                PhoneNo: experience.PhoneNo,
                FrmMnth: experience.FrmMnth,
                FrmYr: experience.FrmYr,
                ToMnth: experience.ToMnth,
                ToYr: experience.ToYr,
                InitSalary: experience.InitSalary,
                LastCompany: experience.LastCompany ? "Y" : "N",
              }),
            }
          );

          if (!ExperienceResponse.ok) {
            throw new Error("Failed to add ExperienceResponse");
          }

          const ExperienceData = await ExperienceResponse.json();

          if (!ExperienceData.success) {
            throw new Error(
              ExperienceData.message || "Failed to add ExperienceData"
            );
          }
          experience.ExpId = ExperienceData.ExpId;
        }
      }
      const WorkExperieceResponse = await axios.post(
        "http://10.0.2.2:3000/api/v1/expc/TotalExperience",
        {
          WorkCompany: WorkCompany,
          RelieveReason: workRelieveReason,
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

      if (!WorkExperieceResponse.data.success) {
        throw new Error(
          WorkExperieceResponse.data.message || "Failed to add course"
        );
      }
      Alert.alert("Success", "Courses added successfully");
      setFormChanged(false); // Reset form change tracking
    } catch (error) {
      console.error("Error adding courses:", error.message);
      Alert.alert("Error", "Failed to add courses");
    } finally {
      setIsSubmitting(false);
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

  const handleExperienceChange = (index, field, value) => {
    const fields = [...experienceField];
    fields[index][field] = value;
    setExperienceField(fields);
    setFormChanged(true);
  };

  const handleUpdateExperience = async (index) => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    setIsSubmitting(true);
    try {
      const experience = experienceField[index];
      const response = await axios.put(
        "http://10.0.2.2:3000/api/v1/expc/updateExpc",
        {
          ExpId: experience.ExpId, // Pass the experience ID
          CompName: experience.CompName, // Pass the updated values
          Designation: experience.Designation,
          Duration: experience.Duration,
          LastSalary: experience.LastSalary,
          RelieveReason: experience.RelieveReason,
          RefPerson:experience.RefPerson,
          PhoneNo: experience.PhoneNo,
          FrmMnth: experience.FrmMnth,
          FrmYr: experience.FrmYr,
          ToMnth: experience.ToMnth,
          ToYr: experience.ToYr,
          InitSalary: experience.InitSalary,
          LastCompany: experience.LastCompany ? "Y" : "N",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update Course");
      }
  
      Alert.alert("Success", "Course updated successfully");
      setFormChanged(false); // Reset form change tracking
    } catch (error) {
      console.error("Error updating Course:", error.message);
      Alert.alert("Error", "Failed to update Course");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:3000/api/v1/expc/getExperience",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the token from the state
          },
        }
      );
      if (response.data.success) {
        console.log("User details retrieved successfully:", response.data.data);
        // Populate the input fields with the retrieved data
        // Assuming the data is an array with one object
        const userData = response.data.data[0];
        setWorkCompany(userData.WorkCompany);
        setWorkRelieveReason(userData.RelieveReason);
        setEPFNO(userData.EPFNO);
        setUANNO(userData.UANNO);
        setRegExpExNo(userData.RegExpExNo);
        setSalesExp(userData.SalesExp);
        setHealthIssue(userData.HealthIssue);
        setIsDriving(userData.IsDriving);
        setLicenseNo(userData.LicenseNo);
        setIsCompWrkHere(userData.IsCompWrkHere);
        setCarLicense(userData.CarLicense === "Y");
      } else {
        console.error("User details retrieval failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
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
        experienceField.map((experience, index) => (
          <View key={index}>
            <Text style={styles.sectionTitle}>Experience {index + 1}</Text>
            <Text style={styles.label}>College Name:</Text>
            <TextInput
              style={styles.input}
              value={experience.CompName}
              onChangeText={(value) =>
                handleExperienceChange(index, "CompName", value)
              }
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
              style={styles.picker}
              selectedValue={experience.selectedDesignation}
              onValueChange={(value) =>
                handleExperienceChange(index, "selectedDesignation", value)
              }
            >
              <Picker.Item label="Select Designation" value={null} />
              {designationOptions.map((option) => (
                <Picker.Item
                  key={option.DesignationId.toString()}
                  label={option.DesignationName}
                  value={option.DesignationId}
                />
              ))}
            </Picker>

            <Text style={styles.text}>From-Month :</Text>
            <TextInput
              style={styles.input}
              value={experience.FrmMnth}
              onChangeText={(value) =>
                handleExperienceChange(index, "FrmMnth", value)
              }
            />
            <Text style={styles.text}>From-Year:</Text>
            <TextInput
              style={styles.input}
              value={experience.FrmYr}
              onChangeText={(value) =>
                handleExperienceChange(index, "FrmYr", value)
              }
            />
            <Text style={styles.text}>To-Month :</Text>
            <TextInput
              style={styles.input}
              value={experience.ToMnth}
              onChangeText={(value) =>
                handleExperienceChange(index, "ToMnth", value)
              }
            />
            <Text style={styles.text}>To-Year :</Text>
            <TextInput
              style={styles.input}
              value={experience.ToYr}
              onChangeText={(value) =>
                handleExperienceChange(index, "ToYr", value)
              }
            />
            <Text style={styles.text}>Initial-Salary :</Text>
            <TextInput
              style={styles.input}
              value={experience.InitSalary}
              onChangeText={(value) =>
                handleExperienceChange(index, "InitSalary", value)
              }
            />
            <Text style={styles.text}>Last-Salary :</Text>

            <TextInput
              style={styles.input}
              value={experience.LastSalary}
              onChangeText={(value) =>
                handleExperienceChange(index, "LastSalary", value)
              }
            />
            <Text style={styles.text}>Relieve-Reason :</Text>
            <TextInput
              style={styles.input}
              value={experience.RelieveReason}
              onChangeText={(value) =>
                handleExperienceChange(index, "RelieveReason", value)
              }
            />
            <Text style={styles.text}>Contact-Person :</Text>

            <TextInput
              style={styles.input}
              value={experience.RefPerson}
              onChangeText={(value) =>
                handleExperienceChange(index, "RefPerson", value)
              }
            />
            <Text style={styles.text}>Contact-Number :</Text>
            <TextInput
              style={styles.input}
              value={experience.PhoneNo}
              onChangeText={(value) =>
                handleExperienceChange(index, "PhoneNo", value)
              }
            />
             <Text style={styles.label}>Is this your last degree?</Text>
              <Picker
                style={styles.picker}
                selectedValue={experience.LastCompany ? "Y" : "N"}
                onValueChange={(value) =>
                  handleExperienceChange(
                    index,
                    "LastCompany",
                    value === "Y"
                  )
                }
              >
                <Picker.Item label="Yes" value="Y" />
                <Picker.Item label="No" value="N" />
              </Picker>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => handleUpdateExperience(index)}
              disabled={isSubmitting}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleRemoveQualificationField(index)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}

      {!isFresher && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleExperienceField}
        >
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
        <TextInput style={styles.input} value={UANNO} onChangeText={setUANNO} />

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
    backgroundColor: "#059A5F",
    paddingVertical: 25,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default WorkExperience;
