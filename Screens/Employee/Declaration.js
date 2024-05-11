import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert,StyleSheet  } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';


const CustomCheckBox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
    <View style={styles.checkbox}>
      {checked && <Icon name="check-square-o" size={24} color="green" />}
      {!checked && <Icon name="square-o" size={24} color="green" />}
    </View>
    <Text style={styles.checkboxText}>I agree to the declaration</Text>
  </TouchableOpacity>
  );
};


const DeclarationComponent = () => {
  const [declaration, setDeclaration] = useState(false);
  const [goal, setGoal] = useState('');
  const [roleModel, setRoleModel] = useState('');
  const [roleModelWhy, setRoleModelWhy] = useState('');
  const [ourJobDtl, setOurJobDtl] = useState('');
  const [knownJobPlus, setKnownJobPlus] = useState('');
  const [knownJobMinus, setKnownJobMinus] = useState('');
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  useEffect(()=>{
    checkAuthentication();
  },[])

  const checkAuthentication = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("AppId");
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
  const handleDeclarationChange = () => {
    setDeclaration(!declaration);
  };
  const handleUpdateDeclaration = async () => {
    try {
      const response = await fetch(
        "http://10.0.2.2:3000/api/v1/prsl/declaration", // Correct endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Declaration: declaration,
            Goal: goal,
            RoleModel: roleModel,
            RoleModelWhy: roleModelWhy,
            OurJobDtl: ourJobDtl,
            KnownJobPlus: knownJobPlus,
            KnownJobMinus: knownJobMinus,
          }),
        }
      );
  
      const responseData = await response.json(); // Parse response data
  
      if (responseData.success) {
        Alert.alert("Success", "Declaration updated successfully");
        // Additional actions after successful update
      } else {
        Alert.alert("Error", responseData.message);
      }
    } catch (error) {
      console.error("Error updating declaration:", error.message);
      Alert.alert("Error", "Failed to update declaration");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Goal"
        value={goal}
        onChangeText={setGoal}
      />
      <TextInput
        style={styles.input}
        placeholder="Role Model"
        value={roleModel}
        onChangeText={setRoleModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Role Model Why"
        value={roleModelWhy}
        onChangeText={setRoleModelWhy}
      />
      <TextInput
        style={styles.input}
        placeholder="Our Job Details"
        value={ourJobDtl}
        onChangeText={setOurJobDtl}
      />
      <TextInput
        style={styles.input}
        placeholder="Known Job Plus"
        value={knownJobPlus}
        onChangeText={setKnownJobPlus}
      />
      <TextInput
        style={styles.input}
        placeholder="Known Job Minus"
        value={knownJobMinus}
        onChangeText={setKnownJobMinus}
      />
      <CustomCheckBox checked={declaration} onPress={handleDeclarationChange} />
      <TouchableOpacity onPress={handleUpdateDeclaration}>
        <View style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DeclarationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"flex-start" ,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 2,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
   width:400
  },
});