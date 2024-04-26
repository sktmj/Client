import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert, // Import Alert for displaying messages
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AcademicDetails = () => {
  const [qualifications, setQualifications] = useState([
    {
      id: 1,
      qualification: "",
      degree: "",
      collegeName: "",
      location: "",
      percentage: "",
      lastDegree: false,
    },
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      courseName: "",
      institutionName: "",
      year: "",
      percentage: "",
    },
  ]);

  const Navigation = useNavigation();

  const [showQualifications, setShowQualifications] = useState(true);
  const [showCourses, setShowCourses] = useState(true);

  const addQualification = () => {
    const newId = qualifications.length + 1;
    setQualifications([
      ...qualifications,
      {
        id: newId,
        qualification: "",
        degree: "",
        collegeName: "",
        location: "",
        percentage: "",
        lastDegree: false,
      },
    ]);
  };

  const addCourse = () => {
    const newId = courses.length + 1;
    setCourses([
      ...courses,
      {
        id: newId,
        courseName: "",
        institutionName: "",
        year: "",
        percentage: "",
      },
    ]);
  };

  const handleQualificationChange = (id, field, value) => {
    const updatedQualifications = qualifications.map((qualification) =>
      qualification.id === id ? { ...qualification, [field]: value } : qualification
    );
    setQualifications(updatedQualifications);
  };

  const handleCourseChange = (id, field, value) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? { ...course, [field]: value } : course
    );
    setCourses(updatedCourses);
  };

  const handleToggleQualifications = () => {
    setShowQualifications(!showQualifications);
  };

  const handleToggleCourses = () => {
    setShowCourses(!showCourses);
  };

  const handleDeleteQualification = (id) => {
    const updatedQualifications = qualifications.filter(
      (qualification) => qualification.id !== id
    );
    setQualifications(updatedQualifications);
  };

  const handleDeleteCourse = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
  };

  const handleSaveAndProceed = async () => {
    try {
      // Prepare qualification data
      const qualificationData = qualifications.map((qualification) => ({
        ...qualification,
        // Additional data if needed
      }));

      // Make API request to insert qualification data
      const response = await fetch('http:10.0.2.2/api/v1/Qf/InsertQlCT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(qualificationData),
      });

      if (response.ok) {
        // Data inserted successfully
        Alert.alert('Success', 'Data saved successfully', [
          {
            text: 'OK',
            onPress: () => Navigation.navigate("WorkExperience"),
          },
        ]);
      } else {
        // Error inserting data
        Alert.alert('Error', 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleToggleQualifications}>
        <FontAwesome
          name={showQualifications ? "check-square" : "square"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Text style={styles.sectionToggle}>
        {showQualifications ? "Hide Qualifications" : "Show Qualifications"}
      </Text>
      {showQualifications && (
        <>
          <Text style={styles.sectionTitle}>Qualifications</Text>
          {qualifications.map((qualification) => (
            <View key={qualification.id}>
              <Text style={styles.sectionTitle}>
                Qualification {qualification.id}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Qualification"
                value={qualification.qualification}
                onChangeText={(value) =>
                  handleQualificationChange(
                    qualification.id,
                    "qualification",
                    value
                  )
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Degree"
                value={qualification.degree}
                onChangeText={(value) =>
                  handleQualificationChange(qualification.id, "degree", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="College Name"
                value={qualification.collegeName}
                onChangeText={(value) =>
                  handleQualificationChange(
                    qualification.id,
                    "collegeName",
                    value
                  )
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={qualification.location}
                onChangeText={(value) =>
                  handleQualificationChange(qualification.id, "location", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Percentage"
                value={qualification.percentage}
                onChangeText={(value) =>
                  handleQualificationChange(
                    qualification.id,
                    "percentage",
                    value
                  )
                }
              />
              <View style={styles.checkboxContainer}>
                {/* <CheckBox
                  value={qualification.lastDegree}
                  onValueChange={(value) => handleChange("lastDegree", value)}
                /> */}
                <Text style={styles.checkboxLabel}>Last Degree</Text>
              </View>
              {/* Other qualification fields */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteQualification(qualification.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addQualification}>
            <Text style={styles.addButtonText}>+ Add Qualification</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={handleToggleCourses}>
        <FontAwesome
          name={showCourses ? "check-square" : "square"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Text style={styles.sectionToggle}>
        {showCourses ? "Hide Courses" : "Show Courses"}
      </Text>
      {showCourses && (
        <>
          <Text style={styles.sectionTitle}>Courses</Text>
          {courses.map((course) => (
            <View key={course.id}>
              <Text style={styles.sectionTitle}>
                Course {course.id} Details
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Course Name"
                value={course.courseName}
                onChangeText={(value) =>
                  handleCourseChange(course.id, "courseName", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Institution Name"
                value={course.institutionName}
                onChangeText={(value) =>
                  handleCourseChange(course.id, "institutionName", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Year"
                value={course.year}
                onChangeText={(value) =>
                  handleCourseChange(course.id, "year", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Percentage"
                value={course.percentage}
                onChangeText={(value) =>
                  handleCourseChange(course.id, "percentage", value)
                }
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCourse(course.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addCourse}>
            <Text style={styles.addButtonText}>+ Add Course</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveAndProceed}
      >
        <Text style={styles.saveButtonText}>Save and Proceed</Text>
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
  sectionToggle: {
    fontSize: 16,
    color: "#0074D9",
    marginBottom: 10,
    marginLeft: 30, // Adjust the marginLeft to align with the sections
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
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
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#059A5F",
    padding: 30,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AcademicDetails;
