<ScrollView style={{ padding: 20 }}>
      <View>
        <TouchableOpacity onPress={() => setIsFresher((prev) => !prev)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isFresher ? (
              <FontAwesome name="check-square" size={24} color="black" />
            ) : (
              <FontAwesome name="square" size={24} color="black" />
            )}
            <Text style={{ marginLeft: 10 }}>I'm Fresher</Text>
          </View>
        </TouchableOpacity>

        {!isFresher && (
          <>
            <View>
              <Text>Select Designation:</Text>
              <Picker
                selectedValue={selectedDesignation}
                onValueChange={(itemValue) => {
                  setSelectedDesignation(itemValue);
                  setFormData({ ...formData, Designation: itemValue });
                }}
              >
                <Picker.Item label="Select Designation" value="" />
                {designationOptions.map((option) => (
                  <Picker.Item key={option.DesignationId} label={option.DesignationName} value={option.DesignationId} />
                ))}
              </Picker>
              <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
                placeholder="Organization Name"
                onChangeText={(text) => setFormData({ ...formData, CompName: text })}
              />
            </View>

            {/* Other TextInput fields */}
            
            <TouchableOpacity onPress={() => toggleCheckbox("EPFNOChecked")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {formData.EPFNOChecked ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square" size={24} color="black" />
                )}
                <Text style={{ marginLeft: 10 }}>EPFNO</Text>
              </View>
            </TouchableOpacity>
            {formData.EPFNOChecked && (
              <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
                placeholder="Enter EPFNO"
                onChangeText={(text) => setFormData({ ...formData, EPFNO: text })}
              />
            )}

            {/* Similarly add other checkbox and input fields */}
            
            <TouchableOpacity onPress={() => toggleCheckbox("IsDriving")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {formData.IsDriving ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square" size={24} color="black" />
                )}
                <Text style={{ marginLeft: 10 }}>Is Driving</Text>
              </View>
            </TouchableOpacity>
            {formData.IsDriving && (
              <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5 }}
                placeholder="Enter LicenseNo"
                onChangeText={(text) => setFormData({ ...formData, LicenseNo: text })}
              />
            )}
            
            {/* Upload file functionality */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <Button title="Choose File" onPress={handleChooseFile} disabled={loading} />
              <Button title="Upload File" onPress={handleFileUpload} disabled={!file || loading} />
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        style={{ backgroundColor: "#059A5F", padding: 30, borderRadius: 8, marginTop: 20, alignItems: "center" }}
        onPress={handleSaveAndProceed}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Save and Proceed</Text>
      </TouchableOpacity>
    </ScrollView>