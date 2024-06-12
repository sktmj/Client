import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Button, Image, Alert, StyleSheet, ActivityIndicator, Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const Uploads = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [MobilePicture,setMobilePicture] = useState(null)
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("AppId");
      if (!storedToken) {
        console.log("User is not authenticated. Redirecting to login screen...");
        navigation.navigate("Login");
      } else {
        console.log("User is authenticated.");
        setIsLoggedIn(true);
        setToken(storedToken.trim());
      }
    } catch (error) {
      console.error("Error checking authentication:", error.message);
    }
  };

  const handleFileUpload = async () => {
    if (!profilePicture) {
      Alert.alert("Error", "Please select an image to upload.");
      return;
    }
  
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Pic", {
        uri: profilePicture.uri,
        name: profilePicture.uri.split("/").pop(),
        type: "image/jpeg",
      });
  
      const response = await fetch(`http://103.99.149.67:3000/api/v1/uploads/profilepic`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
  
  const handleMobileUpload = async () => {
    if (!MobilePicture) {
      Alert.alert("Error", "Please select an image to upload.");
      return;
    }
  
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("MobilePic", {
        uri: MobilePicture.uri,
        name: MobilePicture.uri.split("/").pop(),
        type: "image/jpeg",
      });
  
      const response = await fetch(`http://103.99.149.67:3000/api/v1/uploads/mobilepic`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
   
  const handleMobleChooseFile = async () => {
    try {
      let fileResult;
      if (Platform.OS === "web") {
        fileResult = await DocumentPicker.getDocumentAsync({ type: "image/*" });
      } else {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
          Alert.alert("Permission Denied", "Camera permission is required to take photos.");
          return;
        }

        fileResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
  
      console.log("File result:", fileResult);
  
      if (!fileResult.cancelled && fileResult.assets && fileResult.assets.length > 0 && fileResult.assets[0].uri) {
        setMobilePicture(fileResult.assets[0]);
      } else {
        Alert.alert("Error", "Failed to choose file");
      }
    } catch (error) {
      console.error("Error choosing file:", error.message);
      Alert.alert("Error", "Failed to choose file");
    }
  };
  const handleMobileTakePhoto = async () => {
    try {
      console.log("Requesting camera permissions...");
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      console.log("Permission result:", permissionResult);
  
      if (permissionResult.granted === false) {
        Alert.alert("Permission Denied", "Camera permission is required to take photos.");
        return;
      }
  
      console.log("Launching camera...");
      let photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log("Photo:", photo);
  
      if (!photo.cancelled && photo.assets && photo.assets.length > 0 && photo.assets[0].uri) {
        setMobilePicture(photo.assets[0]);
      } else {
        Alert.alert("Error", "Failed to take photo");
      }
    } catch (error) {
      console.error("Error taking photo:", error.message);
      Alert.alert("Error", "Failed to take photo");
    }
  };
  
  
  const handleChooseFile = async () => {
    try {
      let fileResult;
      if (Platform.OS === "web") {
        fileResult = await DocumentPicker.getDocumentAsync({ type: "image/*" });
      } else {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
          Alert.alert("Permission Denied", "Camera permission is required to take photos.");
          return;
        }

        fileResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
  
      console.log("File result:", fileResult);
  
      if (!fileResult.cancelled && fileResult.assets && fileResult.assets.length > 0 && fileResult.assets[0].uri) {
        setProfilePicture(fileResult.assets[0]);
      } else {
        Alert.alert("Error", "Failed to choose file");
      }
    } catch (error) {
      console.error("Error choosing file:", error.message);
      Alert.alert("Error", "Failed to choose file");
    }
  };
  
  const handleTakePhoto = async () => {
    try {
      console.log("Requesting camera permissions...");
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      console.log("Permission result:", permissionResult);
  
      if (permissionResult.granted === false) {
        Alert.alert("Permission Denied", "Camera permission is required to take photos.");
        return;
      }
  
      console.log("Launching camera...");
      let photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log("Photo:", photo);
  
      if (!photo.cancelled && photo.assets && photo.assets.length > 0 && photo.assets[0].uri) {
        setProfilePicture(photo.assets[0]);
      } else {
        Alert.alert("Error", "Failed to take photo");
      }
    } catch (error) {
      console.error("Error taking photo:", error.message);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const handleChooseResumeFile = async () => {
    try {
      let fileResult;
      if (Platform.OS === "web") {
        fileResult = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      } else {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
        if (permissionResult.granted === false) {
          Alert.alert("Permission Denied", "Permission is required to access files.");
          return;
        }
  
        fileResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
  
      console.log("File result:", fileResult);
  
      if (!fileResult.cancelled && fileResult.assets && fileResult.assets.length > 0 && fileResult.assets[0].uri) {
        setResume(fileResult.assets[0]);
      } else {
        Alert.alert("Error", "Failed to choose file");
      }
    } catch (error) {
      console.error("Error choosing file:", error.message);
      Alert.alert("Error", "Failed to choose file");
    }
  };
  
  
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Profile Picture</Text>
        <View style={styles.fileInputContainer}>
          <Button
            title="Choose Image"
            onPress={handleChooseFile}
            disabled={loading}
          />
          <Button
            title="Take Photo"
            onPress={handleTakePhoto}
            disabled={loading}
          />
          <Button
            title="Upload Image"
            onPress={handleFileUpload}
            disabled={!profilePicture || loading}
          />
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {profilePicture && (
          <View style={styles.imageContainer}>
            <Text>Selected Image:</Text>
            <Image 
              source={{ uri: profilePicture.uri }} 
              style={styles.image} 
              onError={(error) => console.error("Image Error:", error)} 
              resizeMode="contain"
            />
          </View>
        )}
      </View>


      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Mobile Picture</Text>
        <View style={styles.fileInputContainer}>
          <Button
            title="Choose Image"
            onPress={handleMobleChooseFile}
            disabled={loading}
          />
          <Button
            title="Take Photo"
            onPress={handleMobileTakePhoto}
            disabled={loading}
          />
          <Button
            title="Upload Image"
            onPress={handleMobileUpload }
            disabled={!MobilePicture || loading}
          />
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {MobilePicture && (
          <View style={styles.imageContainer}>
            <Text>Selected Image:</Text>
            <Image 
              source={{ uri:MobilePicture.uri }} 
              style={styles.image} 
              onError={(error) => console.error("Image Error:", error)} 
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  formContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  fileInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  image: { width: 200, height: 200, marginTop: 10 },
});

export default Uploads;