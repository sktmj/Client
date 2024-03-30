import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const FamilyDetails = () => {
  const [familyDetails, setFamilyDetails] = useState([
    {
      id: 1,
      relationship: "",
      name: "",
      age: "",
      work: "",
      salary: "",
      contactNo: "",
    },
  ]);

  const [languages, setLanguages] = useState([
    {
      id: 1,
      language: "",
      speak: false,
      read: false,
      write: false,
    },
  ]);

  const addFamily = () => {
    const newId = familyDetails.length + 1;
    setFamilyDetails([
      ...familyDetails,
      {
        id: newId,
        relationship: "",
        name: "",
        age: "",
        work: "",
        salary: "",
        contactNo: "",
      },
    ]);
  };

  const Navigation = useNavigation();

  const removeFamily = (id) => {
    const updatedFamily = familyDetails.filter(
      (familyDetail) => familyDetail.id !== id
    );
    setFamilyDetails(updatedFamily);
  };

  const addLanguage = () => {
    const newId = languages.length + 1;
    setLanguages([
      ...languages,
      {
        id: newId,
        language: "",
        speak: false,
        read: false,
        write: false,
      },
    ]);
  };

  const removeLanguage = (id) => {
    const updatedLanguages = languages.filter((lang) => lang.id !== id);
    setLanguages(updatedLanguages);
  };

  const handleChange = (id, field, value) => {
    const updatedFamily = familyDetails.map((familyDetail) =>
      familyDetail.id === id
        ? { ...familyDetail, [field]: value }
        : familyDetail
    );
    setFamilyDetails(updatedFamily);
  };

  const handleLanguageChange = (id, field, value) => {
    const updatedLanguages = languages.map((lang) =>
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    setLanguages(updatedLanguages);
  };

  const saveAndProceed = () => {
    Navigation.navigate("OtherDetails");
    console.log(familyDetails);
    console.log(languages);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Family Details Form</Text>
        {familyDetails.map((familyDetail) => (
          <View key={familyDetail.id} style={styles.memberContainer}>
            <Text style={styles.memberLabel}>
              Family Member {familyDetail.id}
            </Text>
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                placeholder="Relationship"
                value={familyDetail.relationship}
                onChangeText={(value) =>
                  handleChange(familyDetail.id, "relationship", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={familyDetail.name}
                onChangeText={(value) =>
                  handleChange(familyDetail.id, "name", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Age"
                value={familyDetail.age}
                onChangeText={(value) =>
                  handleChange(familyDetail.id, "age", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Work"
                value={familyDetail.work}
                onChangeText={(value) =>
                  handleChange(familyDetail.id, "work", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Salary"
                value={familyDetail.salary}
                onChangeText={(value) =>
                  handleChange(familyDetail.id, "salary", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Contact No"
                value={familyDetail.contactNo}
                onChangeText={(value) =>
                  handleChange(familyDetail.id, "contactNo", value)
                }
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFamily(familyDetail.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addFamily}>
          <Text style={styles.addButtonText}>+ Add Family Member</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Language Details Form</Text>
        {languages.map((lang) => (
          <View key={lang.id} style={styles.languageContainer}>
            <Text style={styles.memberLabel}>Language {lang.id}</Text>
            <TextInput
              style={styles.input}
              placeholder="Language"
              value={lang.language}
              onChangeText={(value) =>
                handleLanguageChange(lang.id, "language", value)
              }
            />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, lang.speak && styles.checked]}
                onPress={() =>
                  handleLanguageChange(lang.id, "speak", !lang.speak)
                }
              />
              <Text style={styles.checkboxLabel}>Speak</Text>
              <TouchableOpacity
                style={[styles.checkbox, lang.read && styles.checked]}
                onPress={() =>
                  handleLanguageChange(lang.id, "read", !lang.read)
                }
              />
              <Text style={styles.checkboxLabel}>Read</Text>
              <TouchableOpacity
                style={[styles.checkbox, lang.write && styles.checked]}
                onPress={() =>
                  handleLanguageChange(lang.id, "write", !lang.write)
                }
              />
              <Text style={styles.checkboxLabel}>Write</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeLanguage(lang.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addLanguage}>
          <Text style={styles.addButtonText}>+ Add Language</Text>
        </TouchableOpacity>

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  memberContainer: {
    marginBottom: 20,
  },
  memberLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  input: {
    width: "48%", // Adjust as needed
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 5,
  },
  checked: {
    backgroundColor: "#333",
  },
  checkboxLabel: {
    marginRight: 15,
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

export default FamilyDetails;
