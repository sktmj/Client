import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const start = () => {
  const [QualId, setQualId] = useState('');
  const [ColName, setColName] = useState('');
  const [YearPass, setYearPass] = useState('');
  const [Percentage, setPercentage] = useState('');
  const [Degree, setDegree] = useState('');
  const [LastDegree, setLastDegree] = useState('');
  const [Location, setLocation] = useState('');
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthentication();

  }, []);
  const checkAuthentication = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (!storedToken) {
        console.log("User is not authenticated. Redirecting to login screen...");
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
  const handleSubmit = async () => {
    try {
       console.log(token,"sssssss")
      const response = await fetch('http://103.99.149.67:3000/api/v1/Qlf/InsertQlCT', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          QualId,
          ColName,
          YearPass,
          Percentage,
          Degree,
          LastDegree,
          Location
        })
      });
      const data = await response.json();
      if (response.ok) {
        // Handle success response
        Alert.alert('Success', data.message);
      } else {
        // Handle error response
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Internal server error. Please try again later.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Qualification ID"
        value={QualId}
        onChangeText={setQualId}
      />
      <TextInput
        placeholder="College Name"
        value={ColName}
        onChangeText={setColName}
      />
      <TextInput
        placeholder="Year of Passing"
        value={YearPass}
        onChangeText={setYearPass}
      />
      <TextInput
        placeholder="Percentage"
        value={Percentage}
        onChangeText={setPercentage}
      />
      <TextInput
        placeholder="Degree"
        value={Degree}
        onChangeText={setDegree}
      />
      <TextInput
        placeholder="Last Degree"
        value={LastDegree}
        onChangeText={setLastDegree}
      />
      <TextInput
        placeholder="Location"
        value={Location}
        onChangeText={setLocation}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default start;
