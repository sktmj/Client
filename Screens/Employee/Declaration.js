import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const Declaration = () => {
  const [formData, setFormData] = useState({
    thoughtsAboutChennaiSilks: "",
    futureGoal: "",
    effectiveJob: "",
    lessEffectiveJob: "",
    roleModel: "",
    whyRoleModel: "",
    agreed: false,
  });

  const Navigation = useNavigation();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, agreed: !formData.agreed });
  };

  const saveAndProceed = () => {
    if (formData.agreed) {
      // Save the form data and proceed
      console.log("Form data saved:", formData);
      Navigation.navigate("PersonalDetails");
    } else {
      alert("Please agree to the declaration to proceed.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Declaration Form</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Thoughts About The Chennai Silks Groups?"
          value={formData.thoughtsAboutChennaiSilks}
          onChangeText={(text) =>
            handleInputChange("thoughtsAboutChennaiSilks", text)
          }
          multiline
          numberOfLines={3}
        />
        <TextInput
          style={styles.input}
          placeholder="Future Goal?"
          value={formData.futureGoal}
          onChangeText={(text) => handleInputChange("futureGoal", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="In which Job You Will be more effective?"
          value={formData.effectiveJob}
          onChangeText={(text) => handleInputChange("effectiveJob", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="In which Job You Will be less effective?"
          value={formData.lessEffectiveJob}
          onChangeText={(text) => handleInputChange("lessEffectiveJob", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Role Model?"
          value={formData.roleModel}
          onChangeText={(text) => handleInputChange("roleModel", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Why?"
          value={formData.whyRoleModel}
          onChangeText={(text) => handleInputChange("whyRoleModel", text)}
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, formData.agreed && styles.checked]}
            onPress={handleCheckboxChange}
          />
          <Text style={styles.checkboxText}>
            I agree that all information entered above are true for the job
            applied in The KTM Jewellery Ltd.
          </Text>
        </View>
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxText: {
    flex: 1,
    fontSize: 16,
  },
  checked: {
    backgroundColor: "#333",
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

export default Declaration;
