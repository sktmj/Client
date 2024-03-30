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

const OtherDetails = () => {
  const [formData, setFormData] = useState({
    salaryBefore: "",
    expectedSalary: "",
    howDidYouKnow: "",
    anyFriendOrRelative: false,
    jobRefPerson: {
      name: "",
      address: "",
      phoneNumber: "",
    },
    reasonForJoining: {
      familyReason: false,
      earningMoney: false,
      gainExperience: false,
      socialStatus: false,
      workInterest: false,
      companyBrand: false,
      betterLife: false,
      otherReason: false,
    },
    expectation: {
      expectedJoiningDate: "",
      isAccommodationNeeded: false,
      acceptSectionTransfer: false,
      jobAppliedFor: "",
      location: "",
    },
    personDetails1: {
      name: "",
      address: "",
      country: "",
      state: "",
      district: "",
      taluk: "",
      city: "",
      pincode: "",
      phoneNumber: "",
    },
    personDetails2: {
      name: "",
      address: "",
      country: "",
      state: "",
      district: "",
      taluk: "",
      city: "",
      pincode: "",
      phoneNumber: "",
    },
  });

  const Navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name) => {
    setFormData({ ...formData, [name]: !formData[name] });
  };

  const handleNestedChange = (parent, name, value) => {
    setFormData({
      ...formData,
      [parent]: { ...formData[parent], [name]: value },
    });
  };

  const handleNestedCheckboxChange = (parent, name) => {
    setFormData({
      ...formData,
      [parent]: { ...formData[parent], [name]: !formData[parent][name] },
    });
  };

  const saveAndProceed = () => {
    Navigation.navigate("Uploads");
    console.log(formData, "diosfhsdhfsdh");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Other Details Form</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Before/Current Salary"
            value={formData.salaryBefore}
            onChangeText={(text) => handleChange("salaryBefore", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Expected Salary"
            value={formData.expectedSalary}
            onChangeText={(text) => handleChange("expectedSalary", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="How did you know about our company?"
            value={formData.howDidYouKnow}
            onChangeText={(text) => handleChange("howDidYouKnow", text)}
          />
          <View style={styles.checkboxContainer}>
            <Text>Any friend or relatives work here?</Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.anyFriendOrRelative && styles.checked,
              ]}
              onPress={() => handleCheckboxChange("anyFriendOrRelative")}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Job Reference Person Details</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.jobRefPerson.name}
            onChangeText={(text) =>
              handleNestedChange("jobRefPerson", "name", text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.jobRefPerson.address}
            onChangeText={(text) =>
              handleNestedChange("jobRefPerson", "address", text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.jobRefPerson.phoneNumber}
            onChangeText={(text) =>
              handleNestedChange("jobRefPerson", "phoneNumber", text)
            }
          />
        </View>

        <Text style={styles.sectionTitle}>Reason for Joining</Text>
        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.reasonForJoining.familyReason && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange("reasonForJoining", "familyReason")
              }
            />
            <Text>Family Reason</Text>

            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.reasonForJoining.earningMoney && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange("reasonForJoining", "earningMoney")
              }
            />
            <Text>Earning Money</Text>

            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.reasonForJoining.gainExperience && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange("reasonForJoining", "gainExperience")
              }
            />
            <Text>Gain Experience</Text>
          </View>
          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.reasonForJoining.socialStatus && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange("reasonForJoining", "socialStatus")
              }
            />
            <Text>Social Status</Text>

            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.reasonForJoining.workInterest && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange("reasonForJoining", "workInterest")
              }
            />
            <Text>WorkInterest</Text>

            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.reasonForJoining.companyBrand && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange("reasonForJoining", "companyBrand")
              }
            />
            <Text>Company Brand</Text>
          </View>
          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.reasonForJoining.betterLife && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange("reasonForJoining", "betterLife")
              }
            />
            <Text>Better Life</Text>

            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.reasonForJoining.otherReason && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange("reasonForJoining", "otherReason")
              }
            />
            <Text>Other Reason</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Expectation</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Expected Joining Date"
            value={formData.expectation.expectedJoiningDate}
            onChangeText={(text) =>
              handleNestedChange("expectation", "expectedJoiningDate", text)
            }
          />

          <View style={styles.checkboxRow}>
            <Text>Accommodation Needed?</Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.expectation.isAccommodationNeeded && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange(
                  "expectation",
                  "isAccommodationNeeded"
                )
              }
            />

            <Text>Accept Section Transfer?</Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                formData.expectation.acceptSectionTransfer && styles.checked,
              ]}
              onPress={() =>
                handleNestedCheckboxChange(
                  "expectation",
                  "acceptSectionTransfer"
                )
              }
            />
          </View>

          <View style={styles.checkboxContainer}></View>
          <View style={styles.checkboxContainer}></View>

          <TextInput
            style={styles.input}
            placeholder="Job Applied For"
            value={formData.expectation.jobAppliedFor}
            onChangeText={(text) =>
              handleNestedChange("expectation", "jobAppliedFor", text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={formData.expectation.location}
            onChangeText={(text) =>
              handleNestedChange("expectation", "location", text)
            }
          />
        </View>

        {/* ///////////////////////////////////////////////////////////////// */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>
            Any two person Details(Expect Relatives)
          </Text>
          <Text style={styles.sectionTitle}>Person Details 1</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.personDetails1.name}
              onChangeText={(text) =>
                handleChange("personDetails1", "name", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={formData.personDetails1.address}
              onChangeText={(text) =>
                handleChange("personDetails1", "address", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={formData.personDetails1.country}
              onChangeText={(text) =>
                handleChange("personDetails1", "country", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={formData.personDetails1.state}
              onChangeText={(text) =>
                handleChange("personDetails1", "state", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="District"
              value={formData.personDetails1.district}
              onChangeText={(text) =>
                handleChange("personDetails1", "district", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Taluk"
              value={formData.personDetails1.taluk}
              onChangeText={(text) =>
                handleChange("personDetails1", "taluk", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={formData.personDetails1.city}
              onChangeText={(text) =>
                handleChange("personDetails1", "city", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              value={formData.personDetails1.pincode}
              onChangeText={(text) =>
                handleChange("personDetails1", "pincode", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.personDetails1.phoneNumber}
              onChangeText={(text) =>
                handleChange("personDetails1", "phoneNumber", text)
              }
            />
          </View>

          <Text style={styles.sectionTitle}>Person Details 2</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.personDetails2.name}
              onChangeText={(text) =>
                handleChange("personDetails2", "name", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={formData.personDetails2.address}
              onChangeText={(text) =>
                handleChange("personDetails2", "address", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={formData.personDetails2.country}
              onChangeText={(text) =>
                handleChange("personDetails2", "country", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={formData.personDetails2.state}
              onChangeText={(text) =>
                handleChange("personDetails2", "state", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="District"
              value={formData.personDetails2.district}
              onChangeText={(text) =>
                handleChange("personDetails2", "district", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Taluk"
              value={formData.personDetails2.taluk}
              onChangeText={(text) =>
                handleChange("personDetails2", "taluk", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={formData.personDetails2.city}
              onChangeText={(text) =>
                handleChange("personDetails2", "city", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              value={formData.personDetails2.pincode}
              onChangeText={(text) =>
                handleChange("personDetails2", "pincode", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.personDetails2.phoneNumber}
              onChangeText={(text) =>
                handleChange("personDetails2", "phoneNumber", text)
              }
            />
          </View>
        </View>

        {/* ///////////////////////////////////////////////////////// */}

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
  inputGroup: {
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
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#333",
  },
  checkboxGroup: {
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#059A5F",
    padding: 30,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    padding: "10",
  },
});

export default OtherDetails;
