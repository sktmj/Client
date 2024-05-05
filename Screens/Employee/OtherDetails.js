import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherDetails = () => {
  const [currentSalary, setCurrentSalary] = useState("");
  const [expectSalary, setExpectSalary] = useState("");
  const [knowCompany, setKnowCompany] = useState("");
  const [isCompWrkHere, setIsCompWrkHere] = useState(false);
  const [refPerName, setRefPerName] = useState("");
  const [refPerAdd, setRefPerAdd] = useState("");
  const [refPerPhNo, setRefPerPhNo] = useState("");
  const [familyReason, setFamilyReason] = useState(false);
  const [earnMoney, setEarnMoney] = useState(false);
  const [gainExp, setGainExp] = useState(false);
  const [socialSts, setSocialSts] = useState(false);
  const [betterLife, setBetterLife] = useState(false);
  const [wrkInt, setWrkInt] = useState(false);
  const [compBrand, setCompBrand] = useState(false);
  const [othReason, setOthReason] = useState(false);
  const [expDOJ, setExpDOJ] = useState("");
  const [isAccNeed, setIsAccNeed] = useState(false);
  const [sectionTrns, setSectionTrns] = useState(false);
  const [jobApplied, setJobApplied] = useState("");
  const [factoryId, setFactoryId] = useState("");
  const [LocationOptions, setLocationOptions] = useState([]);
  const [nearByName1, setNearByName1] = useState("");
  const [nearByAdd1, setNearByAdd1] = useState("");
  const [nearByPin1, setNearByPin1] = useState("");
  const [nearByPhNo1, setNearByPhNo1] = useState("");
  const [nearByName2, setNearByName2] = useState("");
  const [nearByAdd2, setNearByAdd2] = useState("");
  const [nearByPin2, setNearByPin2] = useState("");
  const [nearByPhNo2, setNearByPhNo2] = useState("");
  const [nearByTaluk2, setNearByTaluk2] = useState("");
  const [selectedCountry1, setSelectedCountry1] = useState("");
  const [selectedState1, setSelectedState1] = useState("");
  const [selectedDistrict1, setSelectedDistrict1] = useState("");
  const [selectedTaluk1, setSelectedTaluk1] = useState("");
  const [selectedCity1, setSelectedCity1] = useState("");
  const [countries1, setCountries1] = useState([]);
  const [states1, setStates1] = useState([]);
  const [districts1, setDistricts1] = useState([]);
  const [taluks1, setTaluks1] = useState([]);
  const [cities1, setCities1] = useState([]);
  const [selectedCountry2, setSelectedCountry2] = useState("");
  const [selectedState2, setSelectedState2] = useState("");
  const [selectedDistrict2, setSelectedDistrict2] = useState("");
  const [selectedTaluk2, setSelectedTaluk2] = useState("");
  const [selectedCity2, setSelectedCity2] = useState("");
  const [countries2, setCountries2] = useState([]);
  const [states2, setStates2] = useState([]);
  const [districts2, setDistricts2] = useState([]);
  const [taluks2, setTaluks2] = useState([]);
  const [cities2, setCities2] = useState([]);
  const [showRefPersonDetails, setShowRefPersonDetails] = useState(false);  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    fetchLocation();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry1) {
      fetchStatesByCountry(selectedCountry1);
    }
    if (selectedCountry2) {
      fetchStatesByCountry(selectedCountry2);
    }
  }, [selectedCountry1, selectedCountry2]);


  useEffect(() => {
    if (selectedState1) {
      fetchDistrictsByState(selectedState1);
    }
    if (selectedState2) {
      fetchDistrictsByState(selectedState2);
    }
  }, [selectedState1, selectedState2]);

  useEffect(() => {
    if (selectedDistrict1) {
      fetchTaluksByDistrict(selectedDistrict1);
    }
    if (selectedDistrict2) {
      fetchTaluksByDistrict(selectedDistrict2);
    }
  }, [selectedDistrict1, selectedDistrict2]);

  useEffect(() => {
    if (selectedTaluk1) {
      fetchCitiesByTaluk(selectedTaluk1);
    }
    if (selectedTaluk2) {
      fetchCitiesByTaluk(selectedTaluk2);
    }
  }, [selectedTaluk1, selectedTaluk2]);

  const fetchLocation = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:3000/api/v1/other/location");
      setLocationOptions(response.data);
    } catch (error) {
      console.error("Error fetching location: ", error.message);
    }
  };

  const fetchCountries = () => {
    axios
      .get("http://10.0.2.2:3000/api/v1/prsl/getAllCountries")
      .then((response) => {
        setCountries1(response.data);
        setCountries2(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  };

  const fetchStatesByCountry = (countryId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/states/${countryId}`)
      .then((response) => {
        setStates1(response.data);
        setStates2(response.data);
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  const fetchDistrictsByState = (stateId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/districts/${stateId}`)
      .then((response) => {
        setDistricts1(response.data);
        setDistricts2(response.data);
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
        setTaluks1(formattedTaluks);
        setTaluks2(formattedTaluks);
      })
      .catch((error) => console.error("Error fetching Taluks:", error));
  };

  // Function to fetch cities by taluk
  const fetchCitiesByTaluk = (talukId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/city/${talukId}`)
      .then((response) => {
        setCities1(response.data);
        setCities2(response.data);
      })
      .catch((error) => console.error("Error fetching Cities:", error));
  };

  const handleDateConfirm = (date) => {
    setExpDOJ(date.toISOString());
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = {
        currentSalary,
        expectSalary,
        knowCompany,
        isCompWrkHere,
        refPerName,
        refPerAdd,
        refPerPhNo,
        familyReason,
        earnMoney,
        gainExp,
        socialSts,
        betterLife,
        wrkInt,
        compBrand,
        othReason,
        expDOJ,
        isAccNeed,
        sectionTrns,
        jobApplied,
        factoryId,
        nearByName1,
        nearByAdd1,
        nearByCity1:selectedCity1,
        nearByDistrict1:selectedDistrict1,
        nearByState1:selectedState1,
        nearByCntry1:selectedCountry1,
        nearByPin1,
        nearByPhNo1,
        nearByTaluk1:selectedTaluk1,
        nearByName2,
        nearByAdd2,
        nearByCity2:selectedCity2,
        nearByDistrict2:selectedDistrict2,
        nearByState2:selectedState2,
        nearByCntry2:selectedCountry2,
        nearByPin2,
        nearByPhNo2,
        nearByTaluk2:selectedTaluk2
      };
      
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
  
      await axios.post("http://10.0.2.2:3000/api/v1/other/others", data, { headers });
      Alert.alert("Success", "Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error.message);
      Alert.alert("Error", "Failed to submit data. Please try again.");
    }
  };
  
  return (
    <ScrollView style={styles.container}>
    <Text style={styles.sectionTitle}>Personal Details</Text>
    <View style={styles.formRow}>
      <View style={styles.formColumn}>
        <TextInput
          style={styles.input}
          placeholder="currentsalary"
          value={currentSalary}
          onChangeText={setCurrentSalary}
        />
        <TextInput
          style={styles.input}
          placeholder="Expectation Salary"
          value={expectSalary}
          onChangeText={setExpectSalary}
        />
         <TextInput
          style={styles.input}
          placeholder="How did you know about our company"
          value={knowCompany}
          onChangeText={setKnowCompany}
        />
       
         <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsCompWrkHere(!isCompWrkHere)}
          >
            <Icon name={isCompWrkHere ? "check-square-o" : "square-o"} size={20} color="black" />
            <Text style={{ marginLeft: 8 }}>Any Friends/Relative Working Here?</Text>
          </TouchableOpacity>
          {/* Only show Job Reference Person Details section if the checkbox is checked */}
          {isCompWrkHere && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Job Reference Person Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={refPerName}
                onChangeText={setRefPerName}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={refPerAdd}
                onChangeText={setRefPerAdd}
              />
               <TextInput
                style={styles.input}
                placeholder="Phone No"
                value={refPerPhNo}
                onChangeText={setRefPerPhNo}
              />

             
            </View>
          )}
<View style={styles.sectionContainer}>
  <Text style={styles.sectionTitle}>Reason for Joining</Text>

  {/* First row of checkboxes */}
  <View style={styles.checkboxContainer}>
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setFamilyReason(!familyReason)}
    >
      <Icon name={familyReason ? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Family Situation</Text>
    </TouchableOpacity>

    {/* Add some margin between checkboxes */}
    <View style={{ marginLeft: 10,marginTop:30 }} />

    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setEarnMoney(!earnMoney)}
    >
      <Icon name={earnMoney ? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Earn Money</Text>
    </TouchableOpacity>

    {/* Add some margin between checkboxes */}
    <View style={{ marginLeft: 10 ,marginTop:30 }} />

    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setGainExp(!gainExp)}
    >
      <Icon name={gainExp ? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Gain Experience</Text>
    </TouchableOpacity>
  </View>

  {/* Second row of checkboxes */}
  <View style={styles.checkboxContainer}>
    {/* Add some margin between rows */}
    <View style={{ marginTop: 10,marginTop:30  }} />

    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setSocialSts(!socialSts)}
    >
      <Icon name={socialSts ? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Social Status</Text>
    </TouchableOpacity>

    {/* Add some margin between checkboxes */}
    <View style={{ marginLeft: 10 ,marginTop:30 }} />

    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setBetterLife(!betterLife)}
    >
      <Icon name={betterLife ? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Better Life</Text>
    </TouchableOpacity>

    {/* Add some margin between checkboxes */}
    <View style={{ marginLeft: 10 ,marginTop:30 }} />

    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setWrkInt(!wrkInt)}
    >
      <Icon name={wrkInt ? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Work Interest</Text>
    </TouchableOpacity>
  </View>

  {/* Third row of checkboxes */}
  <View style={styles.checkboxContainer}>
    {/* Add some margin between rows */}
    <View style={{ marginTop: 10,marginTop:30  }} />

    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setCompBrand(!compBrand)}
    >
      <Icon name={compBrand ? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Company Brand</Text>
    </TouchableOpacity>

    {/* Add some margin between checkboxes */}
    <View style={{ marginLeft: 10,marginTop:30  }} />

    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setOthReason(!othReason)}
    >
      <Icon name={othReason ? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Other Reason</Text>
    </TouchableOpacity>
  </View>

  {/* Add some margin between rows */}
  <View style={{ marginTop: 10 ,marginTop:30 }} />
  
  {/* Styling for "I'm Fresher" text */}
  <Text style={{ marginLeft: 10,  fontSize: 16 }}>
    Expecting Joining date
  </Text>

  <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Expecting Joining Date (YYYY-MM-DD)"
              value={expDOJ}
              onChangeText={setExpDOJ}
            />
            <TouchableOpacity
              style={styles.calendarIcon}
              onPress={showDatePicker}
            >
              <FontAwesome name="calendar" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Date picker */}
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          
        </View>
        <View style={styles.checkboxContainer}>
    {/* Add some margin between rows */}
    <View style={{ marginTop: 10,marginTop:30  }} />

    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setIsAccNeed(!isAccNeed)}
    >
      <Icon name={isAccNeed? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Is Accomadation Needed?</Text>
    </TouchableOpacity>

    {/* Add some margin between checkboxes */}
    <View style={{ marginLeft: 10,marginTop:30  }} />

    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setSectionTrns(!sectionTrns)}
    >
      <Icon name={sectionTrns ? "check-square-o" : "square-o"} size={20} color="black" />
      <Text style={styles.checkboxText}>Accepts Section Transfer?</Text>
    </TouchableOpacity>
  </View>
  {/* <Text style={{ marginLeft: 10,  fontSize: 16 }}>
   Job Applied For:
  </Text> */}
  <View style={{marginTop:30}}>
  <TextInput
                style={styles.input}
                placeholder="Job Applied For:"
                value={jobApplied}
                onChangeText={setJobApplied}
              />

<Text style={{ marginLeft: 10,  fontSize: 16 }}>
   Select Location: 
  </Text>
        <Picker
                selectedValue={factoryId}
                onValueChange={(itemValue, itemIndex) =>
                  setFactoryId(itemValue)
                }
              >
                <Picker.Item label="Select Location" value="" />
                {LocationOptions.map((option, index) => (
                  <Picker.Item  
                    key={`${option.FactoryId}_${index}`}
                    label={option.FactoryName}
                    value={option.FactoryId}
                  />
                ))}
              </Picker>
           


           
  <Text style={styles.sectionTitle}>Any Two Persons Details(Except Relatives)</Text>
  <TextInput
                style={styles.input}
                placeholder="Name:"
                value={nearByName1}
                onChangeText={setNearByName1}
              />
                <TextInput
                style={styles.input}
                placeholder="Address:"
                value={nearByAdd1}
                onChangeText={setNearByAdd1}
              />
  <Text>Select Country:</Text>
  <Picker
        selectedValue={selectedCountry1}
        onValueChange={(itemValue) => {
          setSelectedCountry1(itemValue);
          fetchStatesByCountry(itemValue, setStates1);
        }}
      >
        <Picker.Item label="Select Country" value="" />
        {countries1.map((country, index) => (
          <Picker.Item
            key={`${country.country_gid}_${index}`}
            label={country.country_name}
            value={country.country_gid}
          />
        ))}
      </Picker>
      {/* State */}
      <Picker
        selectedValue={selectedState1}
        onValueChange={(itemValue) => {
          setSelectedState1(itemValue);
          fetchDistrictsByState(itemValue, setDistricts1);
        }}
      >
        {/* State options */}
      </Picker>
      {/* District */}
      <Picker
        selectedValue={selectedDistrict1}
        onValueChange={(itemValue) => {
          setSelectedDistrict1(itemValue);
          fetchTaluksByDistrict(itemValue, setTaluks1);
        }}
      >
        {/* District options */}
      </Picker>
      {/* Taluk */}
      <Picker
        selectedValue={selectedTaluk1}
        onValueChange={(itemValue) => {
          setSelectedTaluk1(itemValue);
          fetchCitiesByTaluk(itemValue, setCities1);
        }}
      >
        {/* Taluk options */}
      </Picker>
      {/* City */}
      <Picker
        selectedValue={selectedCity1}
        onValueChange={(itemValue) => {
          setSelectedCity1(itemValue);
        }}
      >
        {/* City options */}
      </Picker>

      {/* Second Person's Details */}
      <Text style={styles.sectionTitle}>Second Person's Details</Text>
      {/* Country */}
      <Picker
        selectedValue={selectedCountry2}
        onValueChange={(itemValue) => {
          setSelectedCountry2(itemValue);
          fetchStatesByCountry(itemValue, setStates2);
        }}
      >
        <Picker.Item label="Select Country" value="" />
        {countries2.map((country, index) => (
          <Picker.Item
            key={`${country.country_gid}_${index}`}
            label={country.country_name}
            value={country.country_gid}
          />
        ))}
      </Picker>
      {/* State */}
      <Picker
        selectedValue={selectedState2}
        onValueChange={(itemValue) => {
          setSelectedState2(itemValue);
          fetchDistrictsByState(itemValue, setDistricts2);
        }}
      >
        {/* State options */}
      </Picker>
      {/* District */}
      <Picker
        selectedValue={selectedDistrict2}
        onValueChange={(itemValue) => {
          setSelectedDistrict2(itemValue);
          fetchTaluksByDistrict(itemValue, setTaluks2);
        }}
      >
        {/* District options */}
      </Picker>
      {/* Taluk */}
      <Picker
        selectedValue={selectedTaluk2}
        onValueChange={(itemValue) => {
          setSelectedTaluk2(itemValue);
          fetchCitiesByTaluk(itemValue, setCities2);
        }}
      >
        {/* Taluk options */}
      </Picker>
      {/* City */}
      <Picker
        selectedValue={selectedCity2}
        onValueChange={(itemValue) => {
          setSelectedCity2(itemValue);
        }}
      >
        {/* City options */}
      </Picker>

        <TextInput
                style={styles.input}
                placeholder="Pin:"
                value={nearByPin2}
                onChangeText={setNearByPin2}
              />

        <TextInput
                style={styles.input}
                placeholder="Ph No:"
                value={nearByPhNo2}
                onChangeText={setNearByPhNo2}
              />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
  </View>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  formColumn: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 8,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  calendarIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});

export default OtherDetails;