import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";

export default function PersonalDetailsForm() {
  const [personalDetails, setPersonalDetails] = useState({
    AppName: "",
    FatherName: "",
    DOB: "",
    Gender: "",
    BloodGrp: "",
    Martialstatus: "",
    MarriageDate: "",
    Religion: "",
    CasteId: "",
    Nativity: "",
    ResAddress1: "",
    ResCountryId: "",
    ResStateId: "",
    ResDistrictId: "",
    ResTalukId: "",
    ResCityId: "",
    ResPincode: "",
    ResPhoneNo: "",
    PerAddress1: "",
    PerCountryId: "",
    PerStateId: "",
    PerDistrictId: "",
    PerTalukId: "",
    PerCityId: "",
    PerPincode: "",
    PerPhoneNo: "",
    LandMark: "",
    EmailId: "",
    PANNO: "",
    AadharNo: "",
  });
  const Navigation = useNavigation();
  const [showMarriageDateInput, setShowMarriageDateInput] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [religion, setReligion] = useState([]);
  const [caste, setCaste] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedCaste, setSelectedCaste] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluk, setSelectedTaluk] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [presentCountries, setPresentCountries] = useState([]);
  const [presentStates, setPresentStates] = useState([]);
  const [presentDistricts, setPresentDistricts] = useState([]);
  const [presentTaluks, setPresentTaluks] = useState([]);
  const [presentCities, setPresentCities] = useState([]);
  const [selectedPresentCountry, setSelectedPresentCountry] = useState("");
  const [selectedPresentState, setSelectedPresentState] = useState("");
  const [selectedPresentDistrict, setSelectedPresentDistrict] = useState("");
  const [selectedPresentTaluk, setSelectedPresentTaluk] = useState("");
  const [selectedPresentCity, setSelectedPresentCity] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkAuthentication();
    fetchCountries();
    fetchReligion();
    fetchPresentCountries();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      fetchTaluksByDistrict(selectedDistrict);
    }
  },
   [selectedDistrict]);

  useEffect(() => {
    if (selectedPresentDistrict) {
      fetchPresentTaluksByDistrict(selectedPresentDistrict);
    }
  },
   [selectedPresentDistrict]);


  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("AppId");
      if (!token) {
        console.log(
          "User is not authenticated. Redirecting to login screen..."
        );
        Navigation.navigate("Login");
      } else {
        console.log("User is authenticated.");
        setIsLoggedIn(true);
        setToken(token);
      }
    } catch (error) {
      console.error("Error checking authentication:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const token = "your_generated_token_here";
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    Navigation.navigate("Login");
  };




  /////////////////////////////////////////
  const fetchCountries = () => {
    axios
      .get("http://10.0.2.2:3000/api/v1/prsl/getAllCountries")
      .then((response) => {
        setCountries(response.data);
     
      
      })
      .catch((error) => console.error("Error fetching countries:", error));
  };

  const fetchStatesByCountry = (countryId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/states/${countryId}`)
      .then((response) => {
        setStates(response.data);
     
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  const fetchDistrictsByState = (stateId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/districts/${stateId}`)
      .then((response) => {
        setDistricts(response.data);
    
      })
      .catch((error) => console.error("Error fetching districts:", error));
  };

  const fetchTaluksByDistrict = (districtId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/taluk/${districtId}`)
      .then((response) => {
        const formattedTaluks = response.data.map((taluk) => ({
          TalukId: taluk.TalukId,
          TalukName: taluk.TalukName,
        }));
        setTaluks(formattedTaluks);
      
      })
      .catch((error) => console.error("Error fetching Taluks:", error));
  };

  const fetchCitiesByTaluk = (talukId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/city/${talukId}`)
      .then((response) => {
        setCities(response.data);
       
      })
      .catch((error) => console.error("Error fetching Cities:", error));
  };


  //////////////////////////////////////////////////
  const fetchPresentCountries = () => {
    console.log(setPresentCountries,"dfdfdfdf")
    axios
      .get("http://10.0.2.2:3000/api/v1/prsl/presentCountries")
      .then((response) => {
        // Assuming the response.data is an array of country objects
        setPresentCountries(response.data);
      })
      .catch((error) => console.error("Error fetching present countries:", error));
  };
  

  const fetchPresentStatesByCountry = (countryId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/PresentState/${countryId}`)
      .then((response) => {
        setPresentStates(response.data);
    
      })
      .catch((error) => console.error("Error fetching states:", error));
  };
  const fetchPresentDistrictsByState = (stateId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/districts/${stateId}`)
      .then((response) => {
        setPresentDistricts(response.data);
       
      })
      .catch((error) => console.error("Error fetching districts:", error));
  };


  const fetchPresentTaluksByDistrict = (districtId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/taluk/${districtId}`)
      .then((response) => {
        const formattedTaluks = response.data.map((taluk) => ({
          TalukId: taluk.TalukId,
          TalukName: taluk.TalukName,
        }));
        setPresentTaluks(formattedTaluks);
    
      })
      .catch((error) => console.error("Error fetching Taluks:", error));
  };

  const fetchPresentCitiesByTaluk = (talukId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/city/${talukId}`)
      .then((response) => {
        setPresentCities(response.data);
        
      })
      .catch((error) => console.error("Error fetching Cities:", error));
  };
        
  const handleChange = (field, value) => {
    setPersonalDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };
  
  
  
  const handlePickerChange = (field, value) => {
    setPersonalDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };      
  
  
  
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://10.0.2.2:3000/api/v1/prsl/updatePersonalDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(personalDetails),
        }
      );
      if (response.status === 404) {
        console.error("Server error: 404");
        Alert.alert(
          "Error",
          "The requested resource was not found on the server."
        );
      } else if (response.ok) {
        const data = await response.json();
        console.log("Personal details updated successfully:", data);
       
      } else {
        console.error("Server error:", response.status, response.statusText);
        Alert.alert(
          "Error",
          "An error occurred while submitting the form. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error handling form submission:", error.message);
      Alert.alert(
        "Error",
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (date) {
      const selectedDate = new Date(date);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - selectedDate.getFullYear();
      if (
        currentDate.getMonth() < selectedDate.getMonth() ||
        (currentDate.getMonth() === selectedDate.getMonth() &&
          currentDate.getDate() < selectedDate.getDate())
      ) {
        personalDetails.age = age - 1; // Remove this line
      } else {
        personalDetails.age = age; // Remove this line
      }
      personalDetails.DOB = selectedDate.toISOString().split("T")[0];
      setPersonalDetails({ ...personalDetails }); // Update the DOB field only
    }
    hideDatePicker();
  };

  const handleConfirmDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setPersonalDetails({
      ...personalDetails,
      marriageDate: formattedDate,
    });
    hideDatePicker();
  };

  const fetchReligion = () => {
    axios
      .get("http://10.0.2.2:3000/api/v1/prsl/getReligion")
      .then((response) => {
        setReligion(response.data);
      })
      .catch((error) => console.error("Error fetching Religion:", error));
  };

  const fetchCasteByReligion = (religion_gid) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/caste/${religion_gid}`)
      .then((response) => {
        setCaste(response.data); // Set the caste state with the fetched caste data
      })
      .catch((error) => console.error("Error fetching Castes:", error));
  };

  useEffect(() => {
    if (selectedReligion) {
      fetchCasteByReligion(selectedReligion); // Fetch castes when selected religion changes
    }
  }, [selectedReligion]);

  const handleChangeReligion = (field, value) => {
    if (field === "Religion") {
      setSelectedReligion(value); // Update selected religion state
      setPersonalDetails((prevDetails) => ({
        ...prevDetails,
        Religion: value, // Update only the Religion field in personalDetails state
      }));
    } else if (field === "CasteId") {
      setSelectedCaste(value); // Update selected caste state
      setPersonalDetails((prevDetails) => ({
        ...prevDetails,
        CasteId: value, // Update only the CasteId field in personalDetails state
      }));
    } else {
      setPersonalDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value, // Update other fields without affecting religion and caste
      }));
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Details</Text>
      <View style={styles.formRow}>
        <View style={styles.formColumn}>
        <TextInput
            style={styles.input}
            placeholder="Name"
               value={personalDetails.AppName}
              onChangeText={(value) => handleChange("AppName", value)}
                      />

          <TextInput
            style={styles.input}
            placeholder="Father's Name"
            value={personalDetails.FatherName}
            onChangeText={(value) => handleChange("FatherName", value)}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={personalDetails.DOB}
              onChangeText={(value) => handleChange("DOB", value)}
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
            value={personalDetails.age ? personalDetails.age.toString() : ""}
            onChangeText={(value) => handleChange("age", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={personalDetails.Gender}
            onValueChange={(itemValue) => handleChange("Gender", itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Female" value="F" />
            <Picker.Item label="Others" value="O" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="BloodGroup"
          value={personalDetails.BloodGrp}
          onChangeText={(Text) => handleChange("BloodGrp", Text)}
        />
      </View>
      <View style={styles.formColumn}>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={personalDetails.Martialstatus}
            onValueChange={(itemValue) => {
              handleChange("Martialstatus", itemValue);
              setShowMarriageDateInput(itemValue === "Married");
            }}
          >
            <Picker.Item label="Marital Status" value="" />
            <Picker.Item label="Single" value="S" />
            <Picker.Item label="Married" value="M" />
            <Picker.Item label="Divorced" value="D" />
          </Picker>
        </View>
        {showMarriageDateInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Date of Marriage (YYYY-MM-DD)"
              value={personalDetails.MarriageDate}
              onChangeText={(value) => handleChange("MarriageDate", value)}
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
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text>Select Religion:</Text>
          <Picker
            selectedValue={selectedReligion}
            onValueChange={(itemValue) => {
              setSelectedReligion(itemValue);
              setSelectedCaste("");
              fetchCasteByReligion(itemValue);
              setPersonalDetails({ ...personalDetails, Religion: itemValue });
            }}
          >
            <Picker.Item label="Select Religion" value="" />
            {religion.map((religion, index) => (
              <Picker.Item
                key={`${religion.religion_gid}_${index}`}
                label={religion.religion_name}
                value={religion.religion_gid}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text>Select Caste:</Text>
          <Picker
            selectedValue={selectedCaste}
            onValueChange={(itemValue) => {
              setSelectedCaste(itemValue);
              setPersonalDetails({
                ...personalDetails,
                CasteId: itemValue,
              }); // Update personal details state
            }}
            enabled={caste.length > 0} // Disable picker if caste data is not fetched
          >
            <Picker.Item label="Select Caste" value="" />
            {caste.map(
              (
                casteItem,
                index // Corrected variable name from city to casteItem
              ) => (
                <Picker.Item
                  key={`${casteItem.caste_gid}_${index}`}
                  label={casteItem.caste_name} // Corrected property name to caste_name
                  value={casteItem.caste_gid} // Corrected property name to caste_gid
                />
              )
            )}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Native"
          value={personalDetails.Nativity}
          onChangeText={(value) => handleChange("Nativity", value)}
        />
        {/* Render other personal details text inputs */}
      </View>

      {/* Residential Address */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Residential Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={personalDetails.ResAddress1}
          onChangeText={(value) => handleChange("ResAddress1", value)}
        />
        <Text>Select Country:</Text>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => {
            setSelectedCountry(itemValue);
            setSelectedState("");
            setSelectedDistrict("");
            setSelectedTaluk("");
            setSelectedCity("");
            fetchStatesByCountry(itemValue);
            setPersonalDetails({ ...personalDetails, ResCountryId: itemValue });
          }}
        >
          <Picker.Item label="Select Country" value="" />
          {countries.map((country, index) => (
            <Picker.Item
              key={`${country.country_gid}_${index}`}
              label={country.country_name}
              value={country.country_gid}
            />
          ))}
        </Picker>

        {/* Repeat this pattern for other address fields */}
        {/* For brevity, I'll just show one */}

        <View style={styles.inputContainer}>
          <Text>Select State:</Text>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => {
              setSelectedState(itemValue);
              setSelectedDistrict("");
              setSelectedTaluk("");
              setSelectedCity("");
              fetchDistrictsByState(itemValue);
              setPersonalDetails({ ...personalDetails, ResStateId: itemValue });
            }}
          >
            <Picker.Item label="Select State" value="" />
            {states.map((state, index) => (
              <Picker.Item
                key={`${state.state_gid}_${index}`}
                label={state.state_name}
                value={state.state_gid}
              />
            ))}
          </Picker>

          <Text>Select District:</Text>
          <Picker
            selectedValue={selectedDistrict}
            onValueChange={(itemValue) => {
              setSelectedDistrict(itemValue);
              fetchTaluksByDistrict(itemValue); // Fetch taluks based on selected district
              setPersonalDetails({
                ...personalDetails,
                ResDistrictId: itemValue,
              }); // Update personal details state
            }}
          >
            <Picker.Item label="Select District" value="" />
            {districts.map((district, index) => (
              <Picker.Item
                key={`${district.DistrictId}_${index}`}
                label={district.Districtname}
                value={`${district.DistrictId}`}
              />
            ))}
          </Picker>
          <View style={styles.inputContainer}>
            <Text>Select Taluk:</Text>
            <Picker
              selectedValue={selectedTaluk}
              onValueChange={(itemValue) => {
                setSelectedTaluk(itemValue);
                fetchCitiesByTaluk(itemValue); // Call fetchCitiesByTaluk when selected taluk changes
                setPersonalDetails({
                  ...personalDetails,
                  ResTalukId: itemValue,
                }); // Update personal details state
              }}
            >
              <Picker.Item label="Select Taluk" value="" />
              {taluks.map((taluk, index) => (
                <Picker.Item
                  key={`${taluk.TalukId}_${index}`}
                  label={taluk.TalukName}
                  value={taluk.TalukId}
                />
              ))}
            </Picker>

            <Text>Select City:</Text>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue) => {
                setSelectedCity(itemValue);
                setPersonalDetails({
                  ...personalDetails,
                  ResCityId: itemValue,
                }); // Update personal details state
              }}
              enabled={cities.length > 0} // Disable picker if cities are not fetched
            >
              <Picker.Item label="Select City" value="" />
              {cities.map((city, index) => (
                <Picker.Item
                  key={`${city.city_gid}_${index}`}
                  label={city.city_name}
                  value={city.city_gid}
                />
              ))}
            </Picker>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          keyboardType="numeric"
          value={personalDetails.ResPincode}
          onChangeText={(value) => handleChange("ResPincode", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone No"
          keyboardType="phone-pad"
          value={personalDetails.ResPhoneNo}
          onChangeText={(value) => handleChange("ResPhoneNo", value)}
        />
      </View>

      {/* Present Address */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Present Address</Text>
        {/* <View style={styles.switchContainer}>
          {/* <Text style={styles.switchLabel}>Same as Residential Address</Text> */}
        {/* <Switch
            value={personalDetails.SameAsPresentAddress}
            onValueChange={(value) =>
              handleChange("SameAsPresentAddress", value)
            }
          /> */}
        {/* </View> */}
        {!personalDetails.SameAsPresentAddress && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={personalDetails.PerAddress1}
              onChangeText={(value) => handleChange("PerAddress1", value)}
            />
            <Text>Select Country:</Text>
            <Picker
  selectedValue={selectedPresentCountry}
  onValueChange={(itemValue) => {
    setSelectedPresentCountry(itemValue); // Update selected country state
    fetchPresentStatesByCountry(itemValue); // Fetch states based on selected country
    setPersonalDetails({
      ...personalDetails,
      PerCountryId: itemValue,
    }); 
  }}
>

  <Picker.Item label="Select Country" value="" />
                {presentCountries.map((country, index) => (
                  <Picker.Item
                  key={`${country.country_gid}_${index}`}
                  label={country.country_name}
                  value={country.country_gid}
                  />
                ))}
              </Picker>
            {/* Repeat this pattern for other address fields */}
            {/* For brevity, I'll just show one */}

            <View style={styles.inputContainer}>
              <Text>Select State:</Text>
              <Picker
        selectedValue={selectedPresentState}
  onValueChange={(itemValue) => {
    setSelectedPresentState(itemValue); // Update selected country state
    fetchPresentDistrictsByState(itemValue); // Fetch states based on selected country
    setPersonalDetails({
      ...personalDetails,
      PerStateId: itemValue,
    }); 
  }}
>
                <Picker.Item label="Select State" value="" />
                {presentStates.map((state, index) => (
                  <Picker.Item
                    key={`${state.state_gid}_${index}`}
                    label={state.state_name}
                    value={state.state_gid}
                  />
                ))}
              </Picker>

              <Text>Select District:</Text>
              <Picker
        selectedValue={selectedPresentDistrict}
  onValueChange={(itemValue) => {
    setSelectedPresentDistrict(itemValue); // Update selected country state
    fetchPresentTaluksByDistrict(itemValue); // Fetch states based on selected country
    setPersonalDetails({
      ...personalDetails,
      PerDistrictId: itemValue,
    }); 
  }}
>
                <Picker.Item label="Select District" value="" />
                {presentDistricts.map((district, index) => (
                  <Picker.Item
                    key={`${district.DistrictId}_${index}`}
                    label={district.Districtname}
                    value={`${district.DistrictId}`}
                  />
                ))}
              </Picker>
              <View style={styles.inputContainer}>
                <Text>Select Taluk:</Text>
                <Picker
        selectedValue={selectedPresentTaluk}
  onValueChange={(itemValue) => {
    setSelectedPresentTaluk(itemValue); // Update selected country state
    fetchPresentCitiesByTaluk(itemValue); // Fetch states based on selected country
    setPersonalDetails({
      ...personalDetails,
      PerTalukId: itemValue,
    }); 
  }}
>
                  <Picker.Item label="Select Taluk" value="" />
                  {presentTaluks.map((taluk, index) => (
                    <Picker.Item
                      key={`${taluk.TalukId}_${index}`}
                      label={taluk.TalukName}
                      value={taluk.TalukId}
                    />
                  ))}
                </Picker>

                <Text>Select City:</Text>
                <Picker
                  selectedValue={selectedPresentCity}
                  onValueChange={(itemValue) => {
                    setSelectedPresentCity(itemValue);
                    setPersonalDetails({
                      ...personalDetails,
                      PerCityId: itemValue,
                    }); 
                  }}
                  enabled={presentCities.length > 0} // Disable picker if cities are not fetched
                >
                  <Picker.Item label="Select City" value="" />
                  {presentCities.map((city, index) => (
                    <Picker.Item
                      key={`${city.city_gid}_${index}`}
                      label={city.city_name}
                      value={city.city_gid}
                    />
                  ))}
                </Picker> 
             </View> 
            </View>

            <TextInput
              style={styles.input}
              placeholder="Pincode"
              keyboardType="numeric"
              value={personalDetails.PerPincode}
              onChangeText={(value) => handleChange("PerPincode", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone No"
              keyboardType="phone-pad"
              value={personalDetails.PerPhoneNo}
              onChangeText={(value) => handleChange("PerPhoneNo", value)}
            />
          </View>
        )}
      </View>

      {/* Other Details */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Other Details</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Land Mark"
            value={personalDetails.LandMark}
            onChangeText={(value) => handleChange("LandMark", value)}
          />
          <TextInput style={styles.input} placeholder="Mobile No" />
          <TextInput style={styles.input} placeholder="Alternate No" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={personalDetails.EmailId}
            onChangeText={(value) => handleChange("EmailId", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Pan No"
            value={personalDetails.PANNO}
            onChangeText={(value) => handleChange("PANNO", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Aadhar No"
            value={personalDetails.AadharNo}
            onChangeText={(value) => handleChange("AadharNo", value)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save and Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: 16, // Adjusted for better visibility
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});