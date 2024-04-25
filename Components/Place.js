import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const PlaceInputs = ({ updatePersonalDetails }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluk, setSelectedTaluk] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countryName, setCountryName] = useState(""); // Define countryName state

  useEffect(() => {
    fetchCountries();
  }, []);

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
        console.log("Fetched districts:", response.data);
        setDistricts(response.data);
      })
      .catch((error) => console.error("Error fetching districts:", error));
  };

  const fetchTaluksByDistrict = (districtId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/taluk/${districtId}`)
      .then((response) => {
        console.log("Fetched Taluks:", response.data);
        setTaluks(
          response.data.map((taluk) => ({
            taluk_gid: taluk.TalukId,
            taluk_name: taluk.TalukName,
          }))
        );
      })
      .catch((error) => console.error("Error fetching Taluks:", error));
  };

  const fetchCitiesByTaluk = (talukId) => {
    axios
      .get(`http://10.0.2.2:3000/api/v1/prsl/city/${talukId}`)
      .then((response) => {
        console.log("Fetched Cities:", response.data);
        setCities(response.data);
      })
      .catch((error) => console.error("Error fetching Cities:", error));
  };

  const handleCountryChange = (countryId) => {
    setSelectedCountry(countryId);
    const selectedCountry = countries.find(
      (country) => country.country_gid === countryId
    );
    setCountryName(selectedCountry ? selectedCountry.country_name : "");
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedTaluk("");
    setSelectedCity("");
    fetchStatesByCountry(countryId);
    updatePersonalDetails((prevDetails) => ({
      ...prevDetails,
      residentialAddress: {
        ...prevDetails.residentialAddress,
        country: countryId,
      },
    }));
  };

  const handleStateChange = (stateId) => {
    setSelectedState(stateId);
    setSelectedDistrict("");
    setSelectedTaluk("");
    setSelectedCity("");
    fetchDistrictsByState(stateId);
    updatePersonalDetails((prevDetails) => ({
      ...prevDetails,
      residentialAddress: {
        ...prevDetails.residentialAddress,
        state: stateId,
      },
    }));
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedTaluk("");
    setSelectedCity("");
    fetchTaluksByDistrict(districtId);
    updatePersonalDetails((prevDetails) => ({
      ...prevDetails,
      residentialAddress: {
        ...prevDetails.residentialAddress,
        district: districtId,
      },
    }));
  };

  const handleTalukChange = (talukId) => {
    setSelectedTaluk(talukId);
    setSelectedCity("");
    fetchCitiesByTaluk(talukId);
    updatePersonalDetails((prevDetails) => ({
      ...prevDetails,
      residentialAddress: {
        ...prevDetails.residentialAddress,
        taluk: talukId,
      },
    }));
  };

  return (
    <View>
      <Text>Select Country:</Text>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={(itemValue) => handleCountryChange(itemValue)}
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

      <Text>Select State:</Text>
      <Picker
        selectedValue={selectedState}
        onValueChange={(itemValue) => handleStateChange(itemValue)}
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
        onValueChange={(itemValue) => handleDistrictChange(itemValue)}
      >
        <Picker.Item label="Select District" value="" />
        {districts.map((district, index) => (
          <Picker.Item
            key={`${district.DistrictId}_${index}`}
            label={district.Districtname}
            value={district.DistrictId}
          />
        ))}
      </Picker>

      <Text>Select Taluk:</Text>
      <Picker
        selectedValue={selectedTaluk}
        onValueChange={(itemValue) => handleTalukChange(itemValue)}
      >
        <Picker.Item label="Select Taluk" value="" />
        {taluks.map((taluk, index) => (
          <Picker.Item
            key={`${taluk.taluk_gid}_${index}`}
            label={taluk.taluk_name}
            value={taluk.taluk_gid}
          />
        ))}
      </Picker>

      <Text>Select City:</Text>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(itemValue) => setSelectedCity(itemValue)}
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
  );
};

export default PlaceInputs;
