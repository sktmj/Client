import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
const FamilyDetails = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [familyDetails, setFamilyDetails] = useState([
    { FamilyId: '', relation: '', name: '', age: '', work: '', monthSalary: '', phoneNo: '' }
  ]);
  const [languages, setLanguages] = useState([]);
  const [languageSections, setLanguageSections] = useState([
    { LanId: '', LanSpeak: 'N', LanRead: 'N', LanWrite: 'N' } // Set default values to 'N'
  ]);

  const handleAddFamily = () => {
    setFamilyDetails([...familyDetails, { FamilyId: '', relation: '', name: '', age: '', work: '', monthSalary: '', phoneNo: '' }]);
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
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (token) {
      fetchFamilyDetails();
      fetchLanguageDetails();
    }
  }, [token]);
  

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
  };

  const handleAddLanguage = () => {
    setLanguageSections([...languageSections, { LanId: '', LanSpeak: 'N', LanRead: 'N', LanWrite: 'N' }]);
  };

  const handleDeleteLanguage = (index) => {
    const updatedLanguageSections = languageSections.filter((_, i) => i !== index);
    setLanguageSections(updatedLanguageSections);
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    setIsSubmitting(true);
  
    try {
      // Separate the entries into new and existing
      const newFamilies = familyDetails.filter(family => !family.FamilyId);
      const existingFamilies = familyDetails.filter(family => family.FamilyId);
      const newLanguages = languageSections.filter(language => !language.AppLanId);
      const existingLanguages = languageSections.filter(language => language.AppLanId);
  
      // Handle new family entries
      const newFamilyResponses = await Promise.all(newFamilies.map(async (family) => {
        return await axios.post(
          "http://10.0.2.2:3000/api/v1/fam/family",
          {
            Relation: family.relation,
            Name: family.name,
            Age: family.age,
            Work: family.work,
            MonthSalary: family.monthSalary,
            PhoneNo: family.phoneNo
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
      }));
  
      const familySuccess = newFamilyResponses.every(response => response.data.success);
  
      // Handle existing family entries
      const updateFamilyResponses = await Promise.all(existingFamilies.map(async (family) => {
        return await axios.put(
          "http://10.0.2.2:3000/api/v1/fam/updatefam",
          {
            FamilyId: family.FamilyId,
            Relation: family.relation,
            Name: family.name,
            Age: family.age,
            Work: family.work,
            MonthSalary: family.monthSalary,
            PhoneNo: family.phoneNo
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
      }));
  
      const updateFamilySuccess = updateFamilyResponses.every(response => response.data.success);
  
      if (familySuccess && updateFamilySuccess) {
        const familyIds = newFamilyResponses.map(response => response.data.FamilyId);
        await AsyncStorage.setItem('FamilyIds', JSON.stringify(familyIds));
  
        // Handle new language entries
        const newLanguageResponses = await Promise.all(newLanguages.map(async (language) => {
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
  
        const languageSuccess = newLanguageResponses.every(response => response.data.success);
  
        // Handle existing language entries
        const updateLanguageResponses = await Promise.all(existingLanguages.map(async (language) => {
          return await axios.put(
            "http://10.0.2.2:3000/api/v1/fam/updateLan",
            {
              AppLanId: language.AppLanId,
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
  
        const updateLanguageSuccess = updateLanguageResponses.every(response => response.data.success);
  
        if (languageSuccess && updateLanguageSuccess) {
          const addedLanguageIds = newLanguageResponses.map(response => response.data.AppLanId);
          await AsyncStorage.setItem("addedLanguageIds", JSON.stringify(addedLanguageIds));
  
          Alert.alert("Success", "Family and Language details added and updated successfully");
        } else {
          Alert.alert("Error", "Failed to add or update language details");
        }
      } else {
        Alert.alert("Error", "Failed to add or update family details");
      }
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert("Error", "Failed to add data");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const fetchFamilyDetails = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:3000/api/v1/fam/getFam",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        const fetchedFamily = response.data.data.map((family) => ({
          FamilyId: family.FamilyId,
          relation: family.Relation,
          name: family.Name,
          age: family.Age.toString(),
          work: family.Work,
          monthSalary: family.MonthSalary.toString(),
          phoneNo: family.PhoneNo
        }));
        setFamilyDetails(fetchedFamily);
      }
    } catch (error) {
      console.error("Error fetching FamilyDetails:", error.message);
    }
  };
  
  const handleUpdatefamily = async (index) => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    setIsSubmitting(true);
    try {
      const family = familyDetails[index];
      const response = await axios.put(
        "http://10.0.2.2:3000/api/v1/fam/updatefam",
        {
          FamilyId: family.FamilyId, // Include FamilyId for update
          Relation: family.relation,
          Name: family.name,
          Age: family.age,
          Work: family.work,
          MonthSalary: family.monthSalary,
          PhoneNo: family.phoneNo
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update family");
      }

      Alert.alert("Success", "Family updated successfully");
      setFormChanged(false); // Reset form change tracking
    } catch (error) {
      console.error("Error updating Family:", error.message);
      Alert.alert("Error", "Failed to update Family");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchLanguageDetails = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:3000/api/v1/fam/getLan",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        const fetchedLanguage = response.data.data.map((language) => ({
          AppLanId: language.AppLanId,
          LanId: language.LanId,
          LanSpeak: language.LanSpeak,
          LanRead: language.LanRead,
          LanWrite: language.LanWrite
        }));
        setLanguageSections(fetchedLanguage);
      }
    } catch (error) {
      console.error("Error fetching LanguageDetails:", error.message);
    }
  };

  const handleUpdateLanguage = async (index) => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    setIsSubmitting(true);
    try {
      const language = languageSections[index];
      const response = await axios.put(
        "http://10.0.2.2:3000/api/v1/fam/updateLan",
        {
          AppLanId:language.AppLanId,
          LanId: language.LanId,
          LanSpeak: language.LanSpeak,
          LanRead: language.LanRead,
          LanWrite: language.LanWrite
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update Languages");
      }

      Alert.alert("Success", "Languages updated successfully");
      setFormChanged(false); // Reset form change tracking
    } catch (error) {
      console.error("Error updating Languages:", error.message);
      Alert.alert("Error", "Failed to update Languages");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Family Details</Text>
      {familyDetails.map((family, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.text}>Select relation :</Text>
          <Picker
            style={styles.input}
            selectedValue={family.relation}
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
          <Text style={styles.text}>Name :</Text>
          <TextInput
            style={styles.input}
            placeholder="name"
            value={family.name}
            onChangeText={(value) => handleInputChange(index, 'name', value)}
          />
          <Text style={styles.text}>Age :</Text>
          <TextInput
            style={styles.input}
            placeholder="age"
            value={family.age}
            onChangeText={(value) => handleInputChange(index, 'age', value)}
          />
          <Text style={styles.text}>Work:</Text>
          <TextInput
            style={styles.input}
            placeholder="work"
            value={family.work}
            onChangeText={(value) => handleInputChange(index, 'work', value)}
          />
          <Text style={styles.text}>Monthly Salary :</Text>
          <TextInput
            style={styles.input}
            placeholder="monthSalary"
            value={family.monthSalary}
            onChangeText={(value) => handleInputChange(index, 'monthSalary', value)}
          />
          <Text style={styles.text}>Phone No :</Text>
          <TextInput
            style={styles.input}
            placeholder="PhoneNO"
            value={family.phoneNo}
            onChangeText={(value) => handleInputChange(index, 'phoneNo', value)}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => handleUpdatefamily(index)}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteFamily(index)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddFamily}>
        <Text style={styles.buttonText}>Add Family</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Language Details</Text>
      {languageSections.map((language, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.text}>Select language :</Text>
          <Picker
            selectedValue={language.LanId}
            onValueChange={(itemValue) => handleLanguageChange(index, 'LanId', itemValue)}
          >
            <Picker.Item label="Select Language" value="" />
            {languages.map((lang) => (
              <Picker.Item key={lang.LanguageId.toString()} label={lang.Languaguename} value={lang.LanguageId} />
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
            <TouchableOpacity style={styles.addButton} onPress={()=>handleUpdateLanguage(index)}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
       <TouchableOpacity style={styles.addButton} onPress={handleAddLanguage}>
              <Text style={styles.buttonText}>Add Language</Text>
            </TouchableOpacity>
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
    backgroundColor: "#059A5F",
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
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  }
});

export default FamilyDetails;
