import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library



const FamilyDetails = () => {
  const [familyDetails, setFamilyDetails] = useState([
    { relation: '', name: '', age: '', work: '', monthSalary: '', phoneNo: '' }
  ]);
  const [languages, setLanguages] = useState([]);
  const [languageSections, setLanguageSections] = useState([
    { LanId: '', LanSpeak: 'N', LanRead: 'N', LanWrite: 'N' } // Set default values to 'N'
  ]);

  const handleAddFamily = () => {
    setFamilyDetails([...familyDetails, { relation: '', name: '', age: '', work: '', monthSalary: '', phoneNo: '' }]);
  };

  const handleDeleteFamily = (index) => {
    if (familyDetails.length > 1) {
      const updatedFamilyDetails = familyDetails.filter((_, i) => i !== index);
      setFamilyDetails(updatedFamilyDetails);
    } else {
      Alert.alert("Error", "Cannot delete all family details.");
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleInputChange = (index, key, value) => {
    const updatedFamilyDetails = [...familyDetails];
    updatedFamilyDetails[index][key] = value;
    setFamilyDetails(updatedFamilyDetails);
  };

  const handleLanguageChange = (index, key, value) => {
    const updatedLanguageSections = [...languageSections];
    updatedLanguageSections[index][key] = value;
    setLanguageSections(updatedLanguageSections);
  };

  const fetchLanguages = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:3000/api/v1/fam/languages");
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching Languages:", error.message);
      Alert.alert("Error", "Failed to fetch Languages");
    }
  }

  const handleAddLanguage = () => {
    setLanguageSections([...languageSections, { LanId: '', LanSpeak: 'N', LanRead: 'N', LanWrite: 'N' }]);
  };

  const handleDeleteLanguage = (index) => {
    const updatedLanguageSections = languageSections.filter((_, i) => i !== index);
    setLanguageSections(updatedLanguageSections);
  };

  const handleSubmit = async () => {
    try {
      // Add Family Details
      const token = await AsyncStorage.getItem("token");
      const familyResponses = await Promise.all(familyDetails.map(async (detail) => {
        return await axios.post(
          "http://10.0.2.2:3000/api/v1/fam/family",
          {
            Relation: detail.relation,
            Name: detail.name,
            Age: detail.age,
            Work: detail.work,
            MonthSalary: detail.monthSalary,
            PhoneNo: detail.phoneNo
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
      }));

      // Check if family details were successfully added
      const familySuccess = familyResponses.every(response => response.data.success);

      if (familySuccess) {
        Alert.alert("Success", "Family details added successfully");
        // Add Language Details
        const languageResponses = await Promise.all(languageSections.map(async (language) => {
          return await axios.post(
            "http://10.0.2.2:3000/api/v1/fam/postLng",
            {
              LanId: language.LanId,
              LanSpeak: language.LanSpeak,
              LanRead: language.LanRead,
              LanWrite: language.LanWrite
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
          );
        }));

        // Check if language details were successfully added
        const languageSuccess = languageResponses.every(response => response.data.success);

        if (languageSuccess) {
          Alert.alert("Success", "Language details added successfully");
          // Navigate to next screen or perform any other action
        } else {
          Alert.alert("Error", "Failed to add language details");
        }
      } else {
        Alert.alert("Error", "Failed to add family details");
      }
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert("Error", "Failed to add data");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Family Details</Text>
      {familyDetails.map((detail, index) => (
        <View key={index} style={styles.inputContainer}>
          <Picker
            style={styles.input}
            selectedValue={detail.relation}
            onValueChange={(itemValue) => handleInputChange(index, 'relation', itemValue)}
          >
            <Picker.Item label="Select Relation" value="" />
            <Picker.Item label="Father" value="F" />
            <Picker.Item label="Mother" value="M" />
            <Picker.Item label="Sister" value="S" />
            <Picker.Item label="Brother" value="B" />
            <Picker.Item label="Spouse" value="W" />
            <Picker.Item label="Children" value="C" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="name"
            value={detail.name}
            onChangeText={(value) => handleInputChange(index, 'name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="age"
            value={detail.age}
            onChangeText={(value) => handleInputChange(index, 'age', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="work"
            value={detail.work}
            onChangeText={(value) => handleInputChange(index, 'work', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="monthSalary"
            value={detail.monthSalary}
            onChangeText={(value) => handleInputChange(index, 'monthSalary', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="PhoneNO"
            value={detail.phoneNo}
            onChangeText={(value) => handleInputChange(index, 'phoneNo', value)}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteFamily(index)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddFamily}>
              <Text style={styles.buttonText}>Add Family</Text>
            </TouchableOpacity>
          </View>

        </View>
      ))}
      <Text style={styles.sectionTitle}>Language Details</Text>
      {languageSections.map((language, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text>Select Language:</Text>
          <Picker
            selectedValue={language.LanId}
            onValueChange={(itemValue) => handleLanguageChange(index, 'LanId', itemValue)}
          >
            <Picker.Item label="Select Language" value="" />
            {languages.map((language) => (
              <Picker.Item  key={language.LanguageId.toString()} label={language.Languaguename} value={language.LanguageId} />
            ))}
          </Picker>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => handleLanguageChange(index, 'LanSpeak', language.LanSpeak === 'Y' ? 'N' : 'Y')}>
              <Icon
                name={language.LanSpeak === 'Y' ? 'check-square-o' : 'square-o'} // Use FontAwesome icons for checked and unchecked states
                size={24}
                color={language.LanSpeak === 'Y' ? 'green' : 'gray'} // Change the color based on checked state
              />
            </TouchableOpacity>
            <Text style={styles.checkboxText}>LanSpeak</Text>
            <TouchableOpacity onPress={() => handleLanguageChange(index, 'LanRead', language.LanRead === 'Y' ? 'N' : 'Y')}>
              <Icon
                name={language.LanRead === 'Y' ? 'check-square-o' : 'square-o'} // Use FontAwesome icons for checked and unchecked states
                size={24}
                color={language.LanRead === 'Y' ? 'green' : 'gray'} // Change the color based on checked state
              />
            </TouchableOpacity>
            <Text style={styles.checkboxText}>LanRead</Text>
            <TouchableOpacity onPress={() => handleLanguageChange(index, 'LanWrite', language.LanWrite === 'Y' ? 'N' : 'Y')}>
              <Icon
                name={language.LanWrite === 'Y' ? 'check-square-o' : 'square-o'} // Use FontAwesome icons for checked and unchecked states
                size={24}
                color={language.LanWrite === 'Y' ? 'green' : 'gray'} // Change the color based on checked state
              />
            </TouchableOpacity>
            <Text style={styles.checkboxText}>LanWrite</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteLanguage(index)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddLanguage}>
              <Text style={styles.buttonText}>Add Language</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#059A5F",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: "#0080FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 5,
    marginRight: 10,
  },
});

export default FamilyDetails;
