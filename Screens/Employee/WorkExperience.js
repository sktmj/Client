import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const WorkExperience = () => {
  const [isFresher, setIsFresher] = useState(false);
  const [showLastCompanyFields, setShowLastCompanyFields] = useState(true);
  const [showCurrentCompanyFields, setShowCurrentCompanyFields] =
    useState(false);
  const [hasEPF, setHasEPF] = useState(false);
  const [hasEmpRegNo, setHasEmpRegNo] = useState(false);
  const [hasLicense, setHasLicense] = useState(false);
  const [showLicenseUpload, setShowLicenseUpload] = useState(false);
  const [licenseDocumentation, setLicenseDocumentation] = useState("");
  const [workAllBranches, setWorkAllBranches] = useState(false);
  const Navigation = useNavigation();

  const renderTextInput = (placeholder) => (
    <TextInput
      style={{
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
      }}
      placeholder={placeholder}
    />
  );

  const toggleCheckbox = (state) => {
    state((prevState) => !prevState);
  };

  const handleLicenseUpload = (text) => {
    setLicenseDocumentation(text);
  };

  const handleSaveAndProceed = () => {
    Navigation.navigate("FamilyDetails");
    console.log("");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
       {/* <View> 
         <Text>Fresher?</Text>
        <TouchableOpacity onPress={() => toggleCheckbox(setIsFresher)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {{isFresher ? (
              <FontAwesome name="check-square" size={24} color="black" />
            ) : (
              <FontAwesome name="square" size={24} color="black" />
            )} 
            <Text style={{ marginLeft: 10 }}>Fresher</Text>
          </View>
        </TouchableOpacity>
      </View>  */}

    
       
          {/* Last Company Details */}
          <View>
            {/* <Text>Fresher</Text> */}
            <TouchableOpacity
              onPress={() => toggleCheckbox(setIsFresher)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {isFresher? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square" size={24} color="black" />
                )}
                <Text style={{ marginLeft: 10 }}>I'm Fresher</Text>
              </View>
            </TouchableOpacity>

            {isFresher && (
              <>
                {renderTextInput("Organization Name")}
                {renderTextInput("Designation")}
                {renderTextInput("From Month")}
                {renderTextInput("From Year")}
                {renderTextInput("To Month")}
                {renderTextInput("To Year")}
                {renderTextInput("Initial Salary")}
                {renderTextInput("Last Salary")}
                {renderTextInput("Relieve Reason")}
                {renderTextInput("Contact Person")}
                {renderTextInput("Contact Number")}
                <TouchableOpacity
                  onPress={() => toggleCheckbox(setShowLastCompanyFields)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {showLastCompanyFields ? (
                      <FontAwesome
                        name="check-square"
                        size={24}
                        color="black"
                      />
                    ) : (
                      <FontAwesome name="square" size={24} color="black" />
                    )}
                    <Text style={{ marginLeft: 10 }}>
                      This is my last company
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Current Company Details */}
          <View style={{ marginTop: 20 }}>
            <Text>Current Company Details</Text>
            <TouchableOpacity
              onPress={() => toggleCheckbox(setShowCurrentCompanyFields)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {showCurrentCompanyFields ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square" size={24} color="black" />
                )}
                <Text style={{ marginLeft: 10 }}>I'm currently working</Text>
              </View>
            </TouchableOpacity>

            {showCurrentCompanyFields && (
              <>
                {renderTextInput("Current Organization Name")}
                {renderTextInput("Reason for Relieving")}
                <TouchableOpacity
                  onPress={() => toggleCheckbox(setShowCurrentCompanyFields)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {showCurrentCompanyFields ? (
                      <FontAwesome
                        name="check-square"
                        size={24}
                        color="black"
                      />
                    ) : (
                      <FontAwesome name="square" size={24} color="black" />
                    )}
                    <Text style={{ marginLeft: 10 }}>
                      This is my current company
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* EPF */}
          <View style={{ marginTop: 20 }}>
            <Text>EPF?</Text>
            <TouchableOpacity onPress={() => toggleCheckbox(setHasEPF)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {hasEPF ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square" size={24} color="black" />
                )}
                <Text style={{ marginLeft: 10 }}>Having EPF</Text>
              </View>
            </TouchableOpacity>

            {hasEPF && (
              <>
                {renderTextInput("EPF Number")}
                {renderTextInput("UAN Number")}
              </>
            )}
          </View>

          {/* EMP Reg No. */}
          <View style={{ marginTop: 20 }}>
            <Text>EMP Reg No.?</Text>
            <TouchableOpacity onPress={() => toggleCheckbox(setHasEmpRegNo)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {hasEmpRegNo ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square" size={24} color="black" />
                )}
                <Text style={{ marginLeft: 10 }}>Having EMP Reg No.</Text>
              </View>
            </TouchableOpacity>

            {hasEmpRegNo && renderTextInput("Emp Reg No.")}
          </View>

          {/* Textile / Jewellery Experience */}
          <View style={{ marginTop: 20 }}>
            <Text>Textile / Jewellery Experience</Text>
            {renderTextInput("Textile / Jewellery Experience")}
          </View>

          {/* Any Health Issue */}
          <View style={{ marginTop: 20 }}>
            <Text>Any Health Issue?</Text>
            {renderTextInput("Any Health Issue")}
          </View>

          {/* working all braches */}

          <View style={{ marginTop: 20 }}>
            <Text>Do you work all branches?</Text>
            <TouchableOpacity
              onPress={() => toggleCheckbox(setWorkAllBranches)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {workAllBranches ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square" size={24} color="black" />
                )}
                <Text style={{ marginLeft: 10 }}>Work in all branches</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Do you have License? */}
          <View style={{ marginTop: 20 }}>
            <Text>Do you have License?</Text>
            <TouchableOpacity onPress={() => toggleCheckbox(setHasLicense)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {hasLicense ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square" size={24} color="black" />
                )}
                <Text style={{ marginLeft: 10 }}>Having License</Text>
              </View>
            </TouchableOpacity>

            {hasLicense && renderTextInput("License Number")}
            {hasLicense && (
              <>
                <Text>Ready to work all branches?</Text>
                <TouchableOpacity
                  onPress={() => toggleCheckbox(setShowLicenseUpload)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {showLicenseUpload ? (
                      <FontAwesome
                        name="check-square"
                        size={24}
                        color="black"
                      />
                    ) : (
                      <FontAwesome name="square" size={24} color="black" />
                    )}
                    <Text style={{ marginLeft: 10 }}>Do you drive a car?</Text>
                  </View>
                </TouchableOpacity>

                {showLicenseUpload && (
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      marginBottom: 10,
                      padding: 5,
                    }}
                    placeholder="Upload License Documentation"
                    value={licenseDocumentation}
                    onChangeText={handleLicenseUpload}
                  />
                )}
              </>
            )}
          </View>

          {/* Save and Proceed Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#059A5F",
              padding: 30,
              borderRadius: 8,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={handleSaveAndProceed}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Save and Proceed
            </Text>
          </TouchableOpacity>
      
    </ScrollView>
  );
};

export default WorkExperience;
