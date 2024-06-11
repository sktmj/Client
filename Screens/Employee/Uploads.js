// import React, { useEffect, useState } from "react";
// import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Uploads = ({ navigation }) => {
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [mobilePicture, setMobilePicture] = useState(null);
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     checkAuthentication();
//   }, []);

//   useEffect(() => {
//     if (token) {
//       fetchUploads();
//     }
//   }, [token]);

//   const checkAuthentication = async () => {
//     try {
//       const storedToken = await AsyncStorage.getItem("AppId");
//       if (!storedToken) {
//         console.log("User is not authenticated. Redirecting to login screen...");
//         navigation.navigate("Login");
//       } else {
//         console.log("User is authenticated.");
//         setToken(storedToken.trim());
//       }
//     } catch (error) {
//       console.error("Error checking authentication:", error.message);
//     }
//   };

//   const fetchUploads = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         "http://103.99.149.67:3000/api/v1/uploads/getUploads",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setLoading(false);
//       if (response.ok) {
//         const data = await response.json();
//         console.log("User uploads retrieved successfully:", data);
//         setProfilePicture(data.data.profilePicture);
//         setMobilePicture(data.data.mobilePicture);
//         setResume(data.data.resume);
//       } else {
//         console.error("User uploads retrieval failed:", response.status, response.statusText);
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error fetching user uploads:", error.message);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           <View style={styles.formContainer}>
//             <Text style={styles.sectionTitle}>Profile Picture</Text>
//             {profilePicture ? (
//               <View style={styles.imageContainer}>
//                 <Text>Selected Profile Picture:</Text>
//                 <Image
//                   source={{ uri: `http://103.99.149.67:3000${profilePicture}` }}
//                   style={styles.image}
//                   resizeMode="contain"
//                 />
//               </View>
//             ) : (
//               <Text>No profile picture found</Text>
//             )}
//           </View>

//           <View style={styles.formContainer}>
//             <Text style={styles.sectionTitle}>Mobile Picture</Text>
//             {mobilePicture ? (
//               <View style={styles.imageContainer}>
//                 <Text>Selected Mobile Picture:</Text>
//                 <Image
//                   source={{ uri: `http://103.99.149.67:3000${mobilePicture}` }}
//                   style={styles.image}
//                   resizeMode="contain"
//                 />
//               </View>
//             ) : (
//               <Text>No mobile picture found</Text>
//             )}
//           </View>

//           <View style={styles.formContainer}>
//             <Text style={styles.sectionTitle}>Resume</Text>
//             {resume ? (
//               <View style={styles.imageContainer}>
//                 <Text>Selected Resume:</Text>
//                 <Image
//                   source={{ uri: `http://103.99.149.67:3000${resume}` }}
//                   style={styles.image}
//                   resizeMode="contain"
//                 />
//               </View>
//             ) : (
//               <Text>No resume found</Text>
//             )}
//           </View>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   formContainer: { marginBottom: 20 },
//   sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   image: { width: 200, height: 200, marginTop: 10 },
//   imageContainer: { marginBottom: 20 },
// });

// export default Uploads;
