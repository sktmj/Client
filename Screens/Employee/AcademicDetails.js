import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AcademicDetails = ({ navigation }) => {
  const [qualifications, setQualifications] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [colName, setColName] = useState("");
  const [yearPass, setYearPass] = useState("");
  const [percentage, setPercentage] = useState("");
  const [degree, setDegree] = useState("");
  const [lastDegree, setLastDegree] = useState(false);
  const [location, setLocation] = useState("");
  const [course, setCourse] = useState("");
  const [institute, setInstitute] = useState("");
  const [studYear, setStudYear] = useState("");
  const [coursePercentage, setCoursePercentage] = useState("");

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:3000/api/v1/Qlf/qualification");
      setQualifications(response.data);
    } catch (error) {
      console.error("Error fetching qualifications:", error.message);
      Alert.alert("Error", "Failed to fetch qualifications");
    }
  };

  const handleAddQualificationAndCourse = async () => {
    try {
      // Add Qualification
 
      const qualificationResponse = await axios.post("http://10.0.2.2:3000/api/v1/Qlf/InsertQlCT", {
        QualId: selectedQualification,
        ColName: colName,
        YearPass: yearPass,
        Percentage: parseFloat(percentage),
        Degree: degree,
        LastDegree: lastDegree ? "Y" : "N",
        Location: location,
      });

      if (qualificationResponse.data.success) {
        Alert.alert("Success", "Qualification added successfully");
        // Now add Course
        const token = await AsyncStorage.getItem("token");
        const courseResponse = await axios.post("http://10.0.2.2:3000/api/v1/Qlf/courses", {
          Course: course,
          Institute: institute,
          StudYear: studYear,
          CrsPercentage: coursePercentage,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (courseResponse.status === 200) {
          Alert.alert("Success", "Course added successfully");
          // Navigate to next screen or perform any other action
        } else {
          Alert.alert("Error", courseResponse.data.message);
        }
      } else {
        Alert.alert("Error", qualificationResponse.data.message);
      }
    } catch (error) {
      console.error("Error adding qualification and course:", error.message);
      Alert.alert("Error", "Failed to add qualification and course");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Add Qualification</Text>
      <View style={styles.inputContainer}>
        <Text>Select Qualification:</Text>
        <Picker
          selectedValue={selectedQualification}
          onValueChange={(itemValue, itemIndex) => setSelectedQualification(itemValue)}
        >
          {qualifications.map((qualification) => (
            <Picker.Item key={qualification.QualificationId.toString()} label={qualification.QualificationName} value={qualification.QualificationId} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="College Name"
          value={colName}
          onChangeText={setColName}
        />
        <TextInput
          style={styles.input}
          placeholder="Year of Passing"
          value={yearPass}
          onChangeText={setYearPass}
        />
        <TextInput
          style={styles.input}
          placeholder="Percentage"
          value={percentage}
          onChangeText={setPercentage}
        />
        <TextInput
          style={styles.input}
          placeholder="Degree"
          value={degree}
          onChangeText={setDegree}
        />
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setLastDegree(!lastDegree)}
        >
          <Icon name={lastDegree ? "check-square-o" : "square-o"} size={20} color="black" />
          <Text style={{ marginLeft: 8 }}>Last Degree?</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Course Submission Section */}
      <Text style={styles.sectionTitle}>Add Course Details</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Course"
          value={course}
          onChangeText={setCourse}
        />
        <TextInput
          style={styles.input}
          placeholder="Institute"
          value={institute}
          onChangeText={setInstitute}
        />
        <TextInput
          style={styles.input}
          placeholder="Year of Study"
          value={studYear}
          onChangeText={setStudYear}
        />
        <TextInput
          style={styles.input}
          placeholder="Percentage"
          value={coursePercentage}
          onChangeText={setCoursePercentage}
        />
         <TouchableOpacity style={styles.addButton} onPress={handleAddQualificationAndCourse}>
        <Text style={styles.addButtonText}>Submit</Text>
      </TouchableOpacity>
      </View>

      {/* Submit Button */}
     
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AcademicDetails;
