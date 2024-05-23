import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AcademicDetails = ({ navigation }) => {
  const [qualifications, setQualifications] = useState([]);
  const [qualificationFields, setQualificationFields] = useState([]);
  const [courseFields, setCourseFields] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (token) {
      fetchQualificationDetails();
      fetchCourseDetails();
      fetchQualifications();
    }
  }, [token]);

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

  const fetchQualificationDetails = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:3000/api/v1/Qlf/getQlf",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the token from the state
          },
        }
      );
      if (response.data.success) {
        console.log(
          "Qualifications retrieved successfully:",
          response.data.data
        );
        const fetchedQualifications = response.data.data.map((qual) => ({
          AppQualId: qual.AppQualId, // Include AppQualId
          selectedQualification: qual.QualId,
          colName: qual.ColName,
          yearPass: qual.YearPass,
          percentage: qual.Percentage ? String(qual.Percentage) : "",
          degree: qual.Degree,
          lastDegree: qual.LastDegree === "Y",
          location: qual.Location,
        }));
        setQualificationFields(fetchedQualifications);
      } else {
        console.error(
          "Qualification retrieval failed:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching qualification details:", error.message);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:3000/api/v1/Qlf/getCourse",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the token from the state
          },
        }
      );
      if (response.data.success) {
        console.log("Courses retrieved successfully:", response.data.data);
        const fetchedCourses = response.data.data.map((course) => ({
          CourseId: course.CourseId, // Include CourseId
          course: course.Course,
          institute: course.Institute,
          studYear: course.StudYear,
          coursePercentage: course.CrsPercentage
            ? String(course.CrsPercentage)
            : "",
        }));
        setCourseFields(fetchedCourses);
      } else {
        console.error("Course retrieval failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching course details:", error.message);
    }
  };

  const fetchQualifications = async () => {
    try {
      const response = await fetch(
        "http://10.0.2.2:3000/api/v1/Qlf/qualification"
      );
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
        AppQualId: null, // Initialize with null
        selectedQualification: null,
        colName: "",
        yearPass: "",
        percentage: "",
        degree: "",
        lastDegree: false,
        location: "",
      },
    ]);
    setFormChanged(true);
  };

  const handleRemoveQualificationField = (index) => {
    const fields = [...qualificationFields];
    const removedField = fields.splice(index, 1)[0]; // Remove the field and get the removed item
    setQualificationFields(fields);
    setFormChanged(true);

    // Check if the removed field was already present in the database
    if (removedField.AppQualId) {
      // Perform deletion operation from the database
      // You can write the deletion logic here
      console.log(
        `Qualification with ID ${removedField.AppQualId} will be deleted from the database`
      );
    }
  };

  const handleAddCourseField = () => {
    setCourseFields([
      ...courseFields,
      {
        CourseId: null, // Initialize with null
        course: "",
        institute: "",
        studYear: "",
        coursePercentage: "",
      },
    ]);
    setFormChanged(true);
  };

  const handleRemoveCourseField = (index) => {
    const fields = [...courseFields];
    const removedField = fields.splice(index, 1)[0]; // Remove the field and get the removed item
    setCourseFields(fields);
    setFormChanged(true);

    // Check if the removed field was already present in the database
    if (removedField.CourseId) {
      // Perform deletion operation from the database
      // You can write the deletion logic here
      console.log(
        `Course with ID ${removedField.CourseId} will be deleted from the database`
      );
    }
  };

  const handleQualificationChange = (index, field, value) => {
    const fields = [...qualificationFields];
    fields[index][field] = value;
    setQualificationFields(fields);
    setFormChanged(true);
  };

  const handleCourseChange = (index, field, value) => {
    const fields = [...courseFields];
    fields[index][field] = value;
    setCourseFields(fields);
    setFormChanged(true);
  };

 const handleUpdateCourse = async (index) => {
  if (isSubmitting) {
    return; // Prevent multiple submissions
  }
  setIsSubmitting(true);
  try {
    const course = courseFields[index];
    const response = await axios.put(
      "http://10.0.2.2:3000/api/v1/Qlf/updateAppCourse",
      {
        CourseId: course.CourseId, // Include CourseId
        Course: course.course,
        Institute: course.institute,
        CrsPercentage: parseFloat(course.coursePercentage),
        StudYear: course.studYear,
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

  const handleAddQualificationAndCourse = async () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    setIsSubmitting(true);

    try {
      for (const qualification of qualificationFields) {
        if (!qualification.AppQualId) {
          // Only add new qualifications
          const qualificationResponse = await fetch(
            "http://10.0.2.2:3000/api/v1/Qlf/InsertQlCT",
            {
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
            }
          );

          if (!qualificationResponse.ok) {
            throw new Error("Failed to add qualification");
          }

          const qualificationData = await qualificationResponse.json();

          if (!qualificationData.success) {
            throw new Error(
              qualificationData.message || "Failed to add qualification"
            );
          }

          // Update the qualification field with the newly generated AppQualId
          qualification.AppQualId = qualificationData.AppQualId;
        }
      }
      const addedCourseIds = []; 

     for (const course of courseFields) {
      const courseResponse = await axios.post(
        "http://10.0.2.2:3000/api/v1/Qlf/courses",
        {
          Course: course.course,
          Institute: course.institute,
          StudYear: course.studYear,
          CrsPercentage: parseFloat(course.coursePercentage),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!courseResponse.data.success) {
        throw new Error(courseResponse.data.message || "Failed to add course");
      }

      // Store the added CourseId
      addedCourseIds.push(courseResponse.data.CourseId);
    }

    // Save the added CourseIds in AsyncStorage
    await AsyncStorage.setItem("AddedCourseIds", JSON.stringify(addedCourseIds));

    Alert.alert("Success", "Courses added successfully");
    setFormChanged(false); // Reset form change tracking
  } catch (error) {
    console.error("Error adding courses:", error.message);
    Alert.alert("Error", "Failed to add courses");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isSubmitting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {isLoggedIn ? (
        <View>
          <Text style={styles.header}>Qualification Details</Text>
          {qualificationFields.map((qualification, index) => (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>Qualification:</Text>
              <Picker
                style={styles.picker}
                selectedValue={qualification.selectedQualification}
                onValueChange={(value) =>
                  handleQualificationChange(index, "selectedQualification", value)
                }
              >
                <Picker.Item label="Select Qualification" value={null} />
                {qualifications.map((qual) => (
                  <Picker.Item
                    key={qual.QualId}
                    label={qual.QualName}
                    value={qual.QualId}
                  />
                ))}
              </Picker>

              <Text style={styles.label}>College Name:</Text>
              <TextInput
                style={styles.input}
                value={qualification.colName}
                onChangeText={(value) =>
                  handleQualificationChange(index, "colName", value)
                }
              />

              <Text style={styles.label}>Year of Passing:</Text>
              <TextInput
                style={styles.input}
                value={qualification.yearPass}
                onChangeText={(value) =>
                  handleQualificationChange(index, "yearPass", value)
                }
              />

              <Text style={styles.label}>Percentage:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={qualification.percentage}
                onChangeText={(value) =>
                  handleQualificationChange(index, "percentage", value)
                }
              />

              <Text style={styles.label}>Degree:</Text>
              <TextInput
                style={styles.input}
                value={qualification.degree}
                onChangeText={(value) =>
                  handleQualificationChange(index, "degree", value)
                }
              />

              <Text style={styles.label}>Is this your last degree?</Text>
              <Picker
                style={styles.picker}
                selectedValue={qualification.lastDegree ? "Y" : "N"}
                onValueChange={(value) =>
                  handleQualificationChange(
                    index,
                    "lastDegree",
                    value === "Y"
                  )
                }
              >
                <Picker.Item label="Yes" value="Y" />
                <Picker.Item label="No" value="N" />
              </Picker>

              <Text style={styles.label}>Location:</Text>
              <TextInput
                style={styles.input}
                value={qualification.location}
                onChangeText={(value) =>
                  handleQualificationChange(index, "location", value)
                }
              />
             
          <View style={styles.buttonsContainer}>
             
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveQualificationField(index)}
                disabled={isSubmitting}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleUpdateQualification(index)}
                disabled={isSubmitting}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddQualificationField}
            disabled={isSubmitting}
          >
            <Icon name="plus" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add Qualification</Text>
          </TouchableOpacity>

          <Text style={styles.header}>Course Details</Text>
          {courseFields.map((course, index) => (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>Course:</Text>
              <TextInput
                style={styles.input}
                value={course.course}
                onChangeText={(value) =>
                  handleCourseChange(index, "course", value)
                }
              />

              <Text style={styles.label}>Institute:</Text>
              <TextInput
                style={styles.input}
                value={course.institute}
                onChangeText={(value) =>
                  handleCourseChange(index, "institute", value)
                }
              />

              <Text style={styles.label}>Study Year:</Text>
              <TextInput
                style={styles.input}
                value={course.studYear}
                onChangeText={(value) =>
                  handleCourseChange(index, "studYear", value)
                }
              />

              <Text style={styles.label}>Percentage:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={course.coursePercentage}
                onChangeText={(value) =>
                  handleCourseChange(index, "coursePercentage", value)
                }
              />

              {/* Update course button */}
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleUpdateCourse(index)}
                disabled={isSubmitting}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>

              {/* Remove course button */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveCourseField(index)}
                disabled={isSubmitting}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Add course button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCourseField}
            disabled={isSubmitting}
          >
            <Icon name="plus" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add Course</Text>
          </TouchableOpacity>

          {/* Submit button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddQualificationAndCourse}
            disabled={isSubmitting || !formChanged} // Disable if already submitting or no changes
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#059A5F",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  updateButton: {
     backgroundColor: "#059A5F",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#008CBA",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
  },
   buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default AcademicDetails;
