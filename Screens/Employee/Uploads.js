import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

const Uploads = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [mobilePicture, setMobilePicture] = useState(null);
  const [resume, setResume] = useState(null);
  const Navigation = useNavigation();

  const handleProfilePictureUpload = (image) => {
    setProfilePicture(image);
  };

  const handleMobilePictureUpload = (image) => {
    setMobilePicture(image);
  };

  const handleResumeUpload = (document) => {
    setResume(document);
  };

  const saveAndProceed = () => {
    Navigation.navigate("Declaration");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Profile Picture</Text>
        <TouchableOpacity
          style={[
            styles.uploadButton,
            { backgroundColor: "#333", padding: 12 },
          ]}
          onPress={() => {}}
          // Add functionality to choose and upload profile picture
        >
          <Text style={styles.buttonText}>Upload Profile Picture</Text>
        </TouchableOpacity>
        {profilePicture && (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        )}

        <Text style={styles.sectionTitle}>Mobile Picture</Text>
        <TouchableOpacity
          style={[
            styles.uploadButton,
            { backgroundColor: "#333", padding: 12 },
          ]}
          onPress={() => {}}
          // Add functionality to choose and upload mobile picture
        >
          <Text style={styles.buttonText}>Upload Mobile Picture</Text>
        </TouchableOpacity>
        {mobilePicture && (
          <Image source={{ uri: mobilePicture }} style={styles.image} />
        )}

        <Text style={styles.sectionTitle}>Resume</Text>
        <TouchableOpacity
          style={[
            styles.uploadButton,
            { backgroundColor: "#333", padding: 12 },
          ]}
          onPress={() => {}}
          // Add functionality to choose and upload resume
        >
          <Text style={styles.buttonText}>Upload Resume</Text>
        </TouchableOpacity>
        {resume && <Text style={styles.resumeText}>{resume}</Text>}

        <TouchableOpacity style={styles.saveButton} onPress={saveAndProceed}>
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
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  resumeText: {
    fontSize: 16,
    marginBottom: 20,
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

export default Uploads;
