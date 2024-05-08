import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert,StyleSheet  } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';


const CustomCheckBox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.checkbox}>
        {checked && <Icon name="check-square-o" size={24} color="blue" />}
        {!checked && <Icon name="square-o" size={24} color="blue" />}
      </View>
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


  const handleDeclarationChange = () => {
    setDeclaration(!declaration);
  };
  const handleUpdateDeclaration = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
  
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
    <View style={{ flex: 1, justifyContent:"flex-start", alignItems: 'center' }}>

     
      <TextInput
        style={{ height: 40, width:400, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
        placeholder="Goal"
        value={goal}
        onChangeText={setGoal}
      />
      <TextInput
        style={{ height: 40, width:400, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
        placeholder="Role Model"
        value={roleModel}
        onChangeText={setRoleModel}
      />
      <TextInput
        style={{ height: 40, width:400, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
        placeholder="Role Model Why"
        value={roleModelWhy}
        onChangeText={setRoleModelWhy}
      />
      <TextInput
        style={{ height: 40, width:400, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
        placeholder="Our Job Details"
        value={ourJobDtl}
        onChangeText={setOurJobDtl}
      />
      <TextInput
        style={{ height: 40, width:400, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
        placeholder="Known Job Plus"
        value={knownJobPlus}
        onChangeText={setKnownJobPlus}
      />
      <TextInput
        style={{ height: 40, width:400, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10 }}
        placeholder="Known Job Minus"
        value={knownJobMinus}
        onChangeText={setKnownJobMinus}
      />
       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomCheckBox checked={declaration} onPress={handleDeclarationChange} />
        <Text> I agree to the declaration</Text>
      </View>
      <TouchableOpacity onPress={handleUpdateDeclaration}>
        <View style={{ backgroundColor: 'blue', padding: 10, marginTop: 20 }}>
          <Text style={{ color: 'white' }}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DeclarationComponent;


const styles = StyleSheet.create({
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
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
}); 
