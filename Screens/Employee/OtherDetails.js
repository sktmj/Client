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
  const [nearByCity1, setNearByCity1] = useState("");
  const [nearByDistrict1, setNearByDistrict1] = useState("");
  const [nearByState1, setNearByState1] = useState("");
  const [nearByCntry1, setNearByCntry1] = useState("");
  const [nearByPin1, setNearByPin1] = useState("");
  const [nearByPhNo1, setNearByPhNo1] = useState("");
  const [nearByTaluk1, setNearByTaluk1] = useState("");
  const [nearByName2, setNearByName2] = useState("");
  const [nearByAdd2, setNearByAdd2] = useState("");
  const [nearByCity2, setNearByCity2] = useState("");
  const [nearByDistrict2, setNearByDistrict2] = useState("");
  const [nearByState2, setNearByState2] = useState("");
  const [nearByCntry2, setNearByCntry2] = useState("");
  const [nearByPin2, setNearByPin2] = useState("");
  const [nearByPhNo2, setNearByPhNo2] = useState("");
  const [nearByTaluk2, setNearByTaluk2] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [cities, setCities] = useState([]);
  const [showRefPersonDetails, setShowRefPersonDetails] = useState(false);  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    fetchLocation();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (nearByDistrict1) {
      fetchTaluksByDistrict(nearByDistrict1);
    }
  }, [nearByDistrict1]);

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

  // Function to fetch cities by taluk
  const fetchCitiesByTaluk = (talukId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/city/${talukId}`)
      .then((response) => {
        setCities(response.data);
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
        nearByCity1,
        nearByDistrict1,
        nearByState1,
        nearByCntry1,
        nearByPin1,
        nearByPhNo1,
        nearByTaluk1,
        nearByName2,
        nearByAdd2,
        nearByCity2,
        nearByDistrict2,
        nearByState2,
        nearByCntry2,
        nearByPin2,
        nearByPhNo2,
        nearByTaluk2,
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
          selectedValue={nearByCntry1}
          onValueChange={(itemValue) => {
            setNearByCntry1(itemValue);
            setNearByState1('');
            setNearByDistrict1('');
            setNearByTaluk1('');
            setNearByCity1('');
            fetchStatesByCountry(itemValue);
          }}>
          <Picker.Item label="Select Country" value="" />
          {countries.map((country, index) => (
            <Picker.Item
              key={`${country.country_gid}_${index}`}
              label={country.country_name}
              value={country.country_gid}
            />
          ))}
        </Picker>

        <View>
          <Text>Select State:</Text>
          <Picker
            selectedValue={nearByState1}
            onValueChange={(itemValue) => {
              setNearByState1(itemValue);
              setNearByDistrict1('');
              setNearByTaluk1('');
              setNearByCity1('');
              fetchDistrictsByState(itemValue);
            }}>
            <Picker.Item label="Select State" value="" />
            {states.map((state, index) => (
              <Picker.Item
                key={`${state.state_gid}_${index}`}
                label={state.state_name}
                value={state.state_gid}
              />
            ))}
          </Picker>
        </View>

        <View>
          <Text>Select District:</Text>
          <Picker
            selectedValue={nearByDistrict1}
            onValueChange={(itemValue) => {
              setNearByDistrict1(itemValue);
              setNearByTaluk1('');
              setNearByCity1('');
              fetchTaluksByDistrict(itemValue);
            }}>
            <Picker.Item label="Select District" value="" />
            {districts.map((district, index) => (
              <Picker.Item
                key={`${district.district_gid}_${index}`}
                label={district.district_name}
                value={district.district_gid}
              />
            ))}
          </Picker>
        </View>

        <View>
        <Text>Select Taluk:</Text>
        <Picker
            selectedValue={nearByTaluk1}
            onValueChange={(itemValue) => {
              setNearByTaluk1(itemValue);
              setNearByCity1('');
              fetchCitiesByTaluk(itemValue);
            }}>
            <Picker.Item label="Select Taluk" value="" />
              {taluks.map((taluk, index) => (
                <Picker.Item
                  key={`${taluk.TalukId}_${index}`}
                  label={taluk.TalukName}
                  value={taluk.TalukId}
                />
              ))}
            </Picker>
      </View>
      <View>
        <Text>Select City:</Text>
        <Picker
          selectedValue={nearByCity1}
          onValueChange={(itemValue) => setNearByCity1(itemValue)}
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

        <TextInput
                style={styles.input}
                placeholder="Pin:"
                value={nearByPin1}
                onChangeText={setNearByPin1}
              />

        <TextInput
                style={styles.input}
                placeholder="Ph No:"
                value={nearByPhNo1}
                onChangeText={setNearByPhNo1}
              />

 <Text style={styles.sectionTitle}>2nd Persons Details:</Text>
  <TextInput
                style={styles.input}
                placeholder="Name:"
                value={nearByName2}
                onChangeText={setNearByName2}
              />
                <TextInput
                style={styles.input}
                placeholder="Address:"
                value={nearByAdd2}
                onChangeText={setNearByAdd2}
              />
  <Text>Select Country:</Text>
        <Picker
          selectedValue={nearByCntry2}
          onValueChange={(itemValue) => {
            setNearByCntry2(itemValue);
            setNearByState2('');
            setNearByDistrict2('');
            setNearByTaluk2('');
            setNearByCity2('');
            fetchStatesByCountry(itemValue);
          }}>
          <Picker.Item label="Select Country" value="" />
          {countries.map((country, index) => (
            <Picker.Item
              key={`${country.country_gid}_${index}`}
              label={country.country_name}
              value={country.country_gid}
            />
          ))}
        </Picker>

        <View>
          <Text>Select State:</Text>
          <Picker
            selectedValue={nearByState2}
            onValueChange={(itemValue) => {
              setNearByState2(itemValue);
              setNearByDistrict2('');
              setNearByTaluk2('');
              setNearByCity2('');
              fetchDistrictsByState(itemValue);
            }}>
            <Picker.Item label="Select State" value="" />
            {states.map((state, index) => (
              <Picker.Item
                key={`${state.state_gid}_${index}`}
                label={state.state_name}
                value={state.state_gid}
              />
            ))}
          </Picker>
        </View>

        <View>
          <Text>Select District:</Text>
          <Picker
            selectedValue={nearByDistrict2}
            onValueChange={(itemValue) => {
              setNearByDistrict2(itemValue);
              setNearByTaluk2('');
              setNearByCity2('');
              fetchTaluksByDistrict(itemValue);
            }}>
            <Picker.Item label="Select District" value="" />
            {districts.map((district, index) => (
              <Picker.Item
                key={`${district.district_gid}_${index}`}
                label={district.district_name}
                value={district.district_gid}
              />
            ))}
          </Picker>
        </View>

        <View>
          <Text>Select Taluk:</Text>
          <Picker
            selectedValue={nearByTaluk2}
            onValueChange={(itemValue) => {
              setNearByTaluk2(itemValue);
              setNearByCity2('');
              fetchCitiesByTaluk(itemValue);
            }}>
            <Picker.Item label="Select Taluk" value="" />
            {taluks.map((taluk, index) => (
              <Picker.Item
                key={`${taluk.taluk_gid}_${index}`}
                label={taluk.taluk_name}
                value={taluk.taluk_gid}
              />
            ))}
          </Picker>
        </View>

        <View>
          <Text>Select City:</Text>
          <Picker
            selectedValue={nearByCity2}
            onValueChange={(itemValue) => setNearByCity2(itemValue)}>
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