import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AcademicDetails = ({ navigation }) => {
  const [qualifications, setQualifications] = useState([]);
  const [qualificationFields, setQualificationFields] = useState([
    {
      selectedQualification: null,
      colName: "",
      yearPass: "",
      percentage: "",
      degree: "",
      lastDegree: false,
      location: "",
    },
  ]);
  const [courseFields, setCourseFields] = useState([
    {
      course: "",
      institute: "",
      studYear: "",
      coursePercentage: "",
    },
  ]);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchQualifications();
    checkAuthentication();
  }, []);


  useEffect(() => {
    if (token) {
      fetchQulificationDetails();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCourseDetails();
    }
  }, [token]);

  const checkAuthentication = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("AppId");
      if (!storedToken) {
        console.log("User is not authenticated. Redirecting to login screen...");
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

  const fetchQulificationDetails = async () => {
    try {
      const storedToken = token;
      const response = await axios.get("http://10.0.2.2:3000/api/v1/Qlf/getQlf", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${storedToken}`, // Use the token from the state
        },
      });
      if (response.data.success) {
        console.log("Qualifications retrieved successfully:", response.data.data);
        setQualificationFields(response.data.data); // Set the qualification fields directly
      } else {
        console.error("Qualification retrieval failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching qualification details:", error.message);
    }
  };
  
  const fetchCourseDetails = async () => {
    try {
      const storedToken = token;
      const response = await axios.get("http://10.0.2.2:3000/api/v1/Qlf/getCourse", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${storedToken}`, // Use the token from the state
        },
      });
      if (response.data.success) {
        console.log("Courses retrieved successfully:", response.data.data);
        setCourseFields(response.data.data); // Set the course fields directly
      } else {
        console.error("Course retrieval failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching course details:", error.message);
    }
  };

  const fetchQualifications = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/api/v1/Qlf/qualification");
      if (!response.ok) {
        throw new Error("Failed to fetch qualifications");
      }
      const data = await response.json();
      setQualifications(data);
    } catch (error) {
      console.error("Error fetching qualifications:", error.message);
      Alert.alert("Error", "Failed to fetch qualifications");
    }
  };

  const handleAddQualificationField = () => {
    setQualificationFields([
      ...qualificationFields,
      {
        selectedQualification: null,
        colName: "",
        yearPass: "",
        percentage: "",
        degree: "",
        lastDegree: false,
        location: "",
      },
    ]);
  };

  const handleRemoveQualificationField = (index) => {
    const fields = [...qualificationFields];
    fields.splice(index, 1);
    setQualificationFields(fields);
  };

  const handleAddCourseField = () => {
    setCourseFields([
      ...courseFields,
      {
        course: "",
        institute: "",
        studYear: "",
        coursePercentage: "",
      },
    ]);
  };

  const handleRemoveCourseField = (index) => {
    const fields = [...courseFields];
    fields.splice(index, 1);
    setCourseFields(fields);
  };

  const handleQualificationChange = (index, field, value) => {
    const fields = [...qualificationFields];
    fields[index][field] = value;
    setQualificationFields(fields);
  };

  const handleCourseChange = (index, field, value) => {
    const fields = [...courseFields];
    fields[index][field] = value;
    setCourseFields(fields);
  };

  const handleAddQualificationAndCourse = async () => {
    try {
      for (const qualification of qualificationFields) {
        const qualificationResponse = await fetch("http://10.0.2.2:3000/api/v1/Qlf/InsertQlCT", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            QualId: qualification.selectedQualification,
            ColName: qualification.colName,
            YearPass: qualification.yearPass,
            Percentage: parseFloat(qualification.percentage),
            Degree: qualification.degree,
            LastDegree: qualification.lastDegree ? "Y" : "N",
            Location: qualification.location,
          }),
        });

        const qualificationData = await qualificationResponse.json();

        if (!qualificationResponse.ok || !qualificationData.success) {
          Alert.alert("Error", qualificationData.message || "Failed to add qualification");
          return;
        }
      }

      for (const course of courseFields) {
        const courseResponse = await fetch("http://10.0.2.2:3000/api/v1/Qlf/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Course: course.course,
            Institute: course.institute,
            StudYear: course.studYear,
            CrsPercentage: course.coursePercentage,
          }),
        });

        if (!courseResponse.ok) {
          const courseData = await courseResponse.json();
          Alert.alert("Error", courseData.message || "Failed to add course");
          return;
        }
      }

      Alert.alert("Success", "Qualifications and courses added successfully");
      // Navigate to next screen or perform any other action
    } catch (error) {
      console.error("Error adding qualification and course:", error.message);
      Alert.alert("Error", "Failed to add qualification and course");
    }
  };

  return (
    <ScrollView style={styles.container}>
    <Text style={styles.sectionTitle}>Add Qualification</Text>
    {qualificationFields.map((field, index) => (
      <View key={index} style={styles.inputContainer}>
        <Text style={styles.text}>Select qualification:</Text>
        <Picker
          selectedValue={field.selectedQualification}
          onValueChange={(itemValue) => handleQualificationChange(index, "selectedQualification", itemValue)}
        >
          {qualifications.map((qualification) => (
            <Picker.Item
              key={qualification.QualificationId.toString()}
              label={qualification.QualificationName}
              value={qualification.QualificationId}
            />
          ))}
        </Picker>
        <Text style={styles.text}>collage name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Collage Name"
          value={field.colName}
          onChangeText={(value) => handleQualificationChange(index, "colName", value)}
        />
           <Text style={styles.text}>Year of Passing :</Text>
        <TextInput
          style={styles.input}
          placeholder="Year of Passing"
          value={field.yearPass}
          onChangeText={(value) => handleQualificationChange(index, "yearPass", value)}
        />
          <Text style={styles.text}>Percentage:</Text>
        <TextInput
          style={styles.input}
          placeholder="Percentage"
          value={field.percentage}
          onChangeText={(value) => handleQualificationChange(index, "percentage", value)}
        />
          <Text style={styles.text}>DEGREE :</Text>
        <TextInput
          style={styles.input}
          placeholder="Degree"
          value={field.degree}
          onChangeText={(value) => handleQualificationChange(index, "degree", value)}
        />
          <Text style={styles.text}>LAST DEGREE ?</Text>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => handleQualificationChange(index, "lastDegree", !field.lastDegree)}
        >
          <Icon name={field.lastDegree ? "check-square-o" : "square-o"} size={20} color="black" />
          <Text style={{ marginLeft: 8 }}>Last Degree?</Text>
        </TouchableOpacity>
        <Text style={styles.text}>LOCATION:</Text>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={field.location}
          onChangeText={(value) => handleQualificationChange(index, "location", value)}
        />
       
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleRemoveQualificationField(index)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>

    ))}

    
    <TouchableOpacity style={styles.addButton} onPress={handleAddQualificationField}>
      <Text style={styles.addButtonText}>Add Qualification</Text>
    </TouchableOpacity>
       
      <Text style={styles.sectionTitle}>Add Course Details</Text>
      {courseFields.map((field, index) => (
        <View key={index} style={styles.inputContainer}>
            <Text style={styles.text}>COURSE:</Text>
          <TextInput
            style={styles.input}
            placeholder="Course"
            value={field.course}
            onChangeText={(value) => handleCourseChange(index, "course", value)}
          />
            <Text style={styles.text}>INSTITUTE :</Text>
          <TextInput
            style={styles.input}
            placeholder="Institute"
            value={field.institute}
            onChangeText={(value) => handleCourseChange(index, "institute", value)}
          />
            <Text style={styles.text}>YEAR OF STUDY :</Text>
          <TextInput
            style={styles.input}
            placeholder="Year of Study"
            value={field.studYear}
            onChangeText={(value) => handleCourseChange(index, "studYear", value)}
          />
            <Text style={styles.text}>PERCENTAGE :</Text>
          <TextInput
            style={styles.input}
            placeholder="Percentage"
            value={field.coursePercentage}
            onChangeText={(value) => handleCourseChange(index, "coursePercentage", value)}
          />
           <View style={styles.buttonsContainer}></View>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleRemoveCourseField(index)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          </View>
      ))}
      <View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCourseField}>
        <Text style={styles.addButtonText}>Add Course</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleAddQualificationAndCourse}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor:"#059A5F",
    paddingVertical:25,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
   
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
  }
});

export default AcademicDetails;
