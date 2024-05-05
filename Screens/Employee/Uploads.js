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
  Button,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
const Uploads = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [mobilePicture, setMobilePicture] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigation();

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Pic", file);
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://10.0.2.2:3000/api/v1/uploads/profilepic", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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

  const handleMobilepic = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("MobilePic", file);
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://10.0.2.2:3000/api/v1/uploads/mobilepic", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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


  const handleResume = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("ResumeFileName", file);
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://10.0.2.2:3000/api/v1/uploads/resume", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
            disabled={!profilePicture|| loading}
          />
        </View>

    
      
        {profilePicture && (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        )}

        <Text style={styles.sectionTitle}>Mobile Picture</Text>
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
            onPress={handleMobilepic}
            disabled={!mobilePicture|| loading}
          />
        </View>

  
      
        {mobilePicture && (
          <Image source={{ uri:mobilePicture }} style={styles.image} />
        )}

       <Text style={styles.sectionTitle}>Upload Resume</Text>
       
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
            onPress={handleResume}
            disabled={!resume|| loading}
          />
        </View>

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
