import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker from @react-native-picker/picker
import axios from "axios";


// const handleChange = (field, value) => {
//   setPersonalDetails({ ...personalDetails, [field]: value });
// };

const StartScreen = () => {
  const [religion, setReligion] = useState("");
  const [castes, setCastes] = useState([]);
  const [selectedCaste, setSelectedCaste] = useState("");

  useEffect(() => {
    const fetchCastesByReligion = async () => {
      try {
        if (religion) {
          const response = await axios.get(
            `http://10.0.2.2:3000/api/v1/prsl/caste/${religion}`
          );
          setCastes(response.data);
        }
      } catch (error) {
        console.error("Error fetching castes:", error);
      }
    };

    fetchCastesByReligion();
  }, [religion]);

  return (
    <View>
      <Text>Select Religion:</Text>
      <Picker
        selectedValue={religion}
        onValueChange={(itemValue) => setReligion(itemValue)}
      >
        <Picker.Item label="Select Religion" value="" />
        <Picker.Item label="Hindu" value="4" />
        <Picker.Item label="Christian" value="3" />
        <Picker.Item label="MUSLIM" value="5" />
        <Picker.Item label="OTHERS" value="6" />

        {/* Add more religion options as needed */}
      </Picker>

      <Text>Select Caste:</Text>
      <Picker
        selectedValue={selectedCaste}
        onValueChange={(itemValue) => setSelectedCaste(itemValue)}
      >
        <Picker.Item label="Select Caste" value="" />
        {castes.map((caste) => (
          <Picker.Item
            key={caste.caste_gid}
            label={caste.caste_name}
            value={caste.caste_gid}
          />
        ))}
      </Picker>
    </View>
  );
};

export default StartScreen;
