import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  CheckBox,
  Switch,
} from "react-native";

export default function PersonalDetailsForm() {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    fatherName: "",
    dob: "",
    age: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    marriageDate: "",
    region: "",
    caste: "",
    native: "",
    residentialAddress: {
      address: "",
      country: "",
      state: "",
      district: "",
      taluk: "",
      city: "",
      pincode: "",
    },
    presentAddress: {
      address: "",
      country: "",
      state: "",
      district: "",
      taluk: "",
      city: "",
      pincode: "",
    },
    otherDetails: {
      landmark: "",
      mobileNO: "",
      alternateNo: "",
      email: "",
      panNo: "",
      aadharNo: "",
    },
    sameAsPresentAddress: false,
  });

  const Navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleChange = (field, value) => {
    setPersonalDetails({ ...personalDetails, [field]: value });
  };

  const handleSubmit = () => {
    Navigation.navigate("AcademicDetails");
    console.log(personalDetails);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setPersonalDetails({
      ...personalDetails,
      dob: date.toISOString().split("T")[0], // Format the selected date
    });
    hideDatePicker();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Details</Text>
      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={personalDetails.name}
            onChangeText={(value) => handleChange("name", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Father's Name"
            value={personalDetails.fatherName}
            onChangeText={(value) => handleChange("fatherName", value)}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={personalDetails.dob}
              onChangeText={(value) => handleChange("dob", value)}
            />
            <TouchableOpacity
              style={styles.calendarIcon}
              onPress={showDatePicker}
            >
              <FontAwesome name="calendar" size={24} color="black" />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={personalDetails.age}
            onChangeText={(value) => handleChange("age", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={personalDetails.gender}
            onChangeText={(value) => handleChange("gender", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Blood Group"
            value={personalDetails.bloodGroup}
            onChangeText={(value) => handleChange("bloodGroup", value)}
          />
        </View>
        <View style={styles.formColumn}>
          <TextInput
            style={styles.input}
            placeholder="Marital Status"
            value={personalDetails.maritalStatus}
            onChangeText={(value) => handleChange("maritalStatus", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Marriage Date (YYYY-MM-DD)"
            value={personalDetails.marriageDate}
            onChangeText={(value) => handleChange("marriageDate", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Region"
            value={personalDetails.region}
            onChangeText={(value) => handleChange("region", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Caste"
            value={personalDetails.caste}
            onChangeText={(value) => handleChange("caste", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Native"
            value={personalDetails.native}
            onChangeText={(value) => handleChange("native", value)}
          />
          {/* Render other personal details text inputs */}
        </View>
        <View style={styles.formColumn}>
          {/* Render remaining personal details text inputs */}
        </View>
      </View>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Residential Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={personalDetails.residentialAddress.address}
          onChangeText={(value) =>
            handleChange("residentialAddress", {
              ...personalDetails.residentialAddress,
              address: value,
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={personalDetails.residentialAddress.country}
          onChangeText={(value) =>
            handleChange("residentialAddress", {
              ...personalDetails.residentialAddress,
              country: value,
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={personalDetails.residentialAddress.state}
          onChangeText={(value) =>
            handleChange("residentialAddress", {
              ...personalDetails.residentialAddress,
              state: value,
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="District"
          value={personalDetails.residentialAddress.district}
          onChangeText={(value) =>
            handleChange("residentialAddress", {
              ...personalDetails.residentialAddress,
              district: value,
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Taluk"
          value={personalDetails.residentialAddress.taluk}
          onChangeText={(value) =>
            handleChange("residentialAddress", {
              ...personalDetails.residentialAddress,
              taluk: value,
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={personalDetails.residentialAddress.city}
          onChangeText={(value) =>
            handleChange("residentialAddress", {
              ...personalDetails.residentialAddress,
              city: value,
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          keyboardType="numeric"
          value={personalDetails.residentialAddress.pincode}
          onChangeText={(value) =>
            handleChange("residentialAddress", {
              ...personalDetails.residentialAddress,
              pincode: value,
            })
          }
        />
      </View>
      {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Present Address</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Same as Residential Address</Text>
          <Switch
            value={personalDetails.sameAsPresentAddress}
            onValueChange={(value) =>
              handleChange("sameAsPresentAddress", value)
            }
          />
        </View>
        {!personalDetails.sameAsPresentAddress && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={personalDetails.presentAddress.address}
              onChangeText={(value) =>
                handleChange("presentAddress", {
                  ...personalDetails.presentAddress,
                  address: value,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={personalDetails.presentAddress.country}
              onChangeText={(value) =>
                handleChange("presentAddress", {
                  ...personalDetails.presentAddress,
                  country: value,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={personalDetails.presentAddress.state}
              onChangeText={(value) =>
                handleChange("presentAddress", {
                  ...personalDetails.presentAddress,
                  state: value,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="District"
              value={personalDetails.presentAddress.district}
              onChangeText={(value) =>
                handleChange("presentAddress", {
                  ...personalDetails.presentAddress,
                  district: value,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Taluk"
              value={personalDetails.presentAddress.taluk}
              onChangeText={(value) =>
                handleChange("presentAddress", {
                  ...personalDetails.presentAddress,
                  taluk: value,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={personalDetails.presentAddress.city}
              onChangeText={(value) =>
                handleChange("presentAddress", {
                  ...personalDetails.presentAddress,
                  city: value,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              keyboardType="numeric"
              value={personalDetails.presentAddress.pincode}
              onChangeText={(value) =>
                handleChange("presentAddress", {
                  ...personalDetails.presentAddress,
                  pincode: value,
                })
              }
            />
          </View>
        )}
      </View>

      {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Other Details</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Land Mark"
            value={personalDetails.otherDetails.landmark}
            onChangeText={(value) =>
              handleChange("otherDetails", {
                ...personalDetails.otherDetails,
                landmark: value,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile No"
            value={personalDetails.otherDetails.mobileNo}
            onChangeText={(value) =>
              handleChange("otherDetails", {
                ...personalDetails.otherDetails,
                mobileNo: value,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Alternate No"
            value={personalDetails.otherDetails.alternateNo}
            onChangeText={(value) =>
              handleChange("otherDetails", {
                ...personalDetails.otherDetails,
                alternateNo: value,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={personalDetails.otherDetails.email}
            onChangeText={(value) =>
              handleChange("otherDetails", {
                ...personalDetails.otherDetails,
                email: value,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Pan No"
            value={personalDetails.otherDetails.panNo}
            onChangeText={(value) =>
              handleChange("otherDetails", {
                ...personalDetails.otherDetails,
                panNo: value,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Aadhar No"
            value={personalDetails.otherDetails.aadharNo}
            onChangeText={(value) =>
              handleChange("otherDetails", {
                ...personalDetails.otherDetails,
                aadharNo: value,
              })
            }
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save and Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#0074D9",
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#059A5F",
    paddingVertical: 12,
    borderRadius: 8,
    paddingBottom: 30, // Adjust this value as needed
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
    position: "relative", // Add this to position the calendar icon
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#059A5F",
    paddingVertical: 12,
    borderRadius: 8,
    paddingBottom: 30, // Adjust this value as needed
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  calendarIcon: {
    position: "absolute",
    top: 12, // Adjust as needed to align vertically
    right: 10, // Adjust as needed to align horizontally
  },
});
