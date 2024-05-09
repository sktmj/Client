import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginScreen from "./Screens/Employee/Login";
import SignupScreen from "./Screens/Employee/Signup";
import PersonalDetails from "./Screens/Employee/PersonalDetails";
import AcademicDetails from "./Screens/Employee/AcademicDetails";
import WorkExperience from "./Screens/Employee/WorkExperience";
import FamilyDetails from "./Screens/Employee/FamilyDetails";
import OtherDetails from "./Screens/Employee/OtherDetails";
import Uploads from "./Screens/Employee/Uploads";
import Declaration from "./Screens/Employee/Declaration";
import StartScreen from "./Screens/Employee/Start";
import PlaceInputs from "./Components/Place";
import start from "./Screens/Employee/Start";
import familyDetails from "./Screens/Employee/FamilyDetails";

// import StartScreen from "./Screens/Employee/Start";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TopTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 10, // Adjust the font size as needed
          fontWeight: "bold",
          color: "#333", // Add sky blue color
        },
        tabBarTabStyle: { width: 20 },

        tabBarIndicatorStyle: {
          backgroundColor: "#000", // Set indicator color to sky blue
        },
      }}
    >
      <Tab.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{ headerTitle: "PlaceInputs" }}
      />
      <Tab.Screen
        name="AcademicDetails"
        component={AcademicDetails}
        options={{ headerTitle: "AcademicDetails" }}
      />
      <Tab.Screen
        name="WorkExperience"
        component={WorkExperience}
        options={{ headerTitle: "WorkExperience" }}
      />
      <Tab.Screen
        name="familyDetails"
        component={familyDetails}
        options={{ headerTitle: "FamilyDetails" }}
      />
      <Tab.Screen
        name="OtherDetails"
        component={OtherDetails}
        options={{ headerTitle: "OtherDetails" }}
      />
      <Tab.Screen
        name="Uploads"
        component={Uploads}
        options={{ headerTitle: "Uploads" }}
      />
      <Tab.Screen
        name="Declaration"
        component={Declaration}
        options={{ headerTitle: "Declaration" }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: "Login", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Register"
          component={SignupScreen}
          options={{ headerTitle: "Signup", headerTitleAlign: "center" }}
        />
        <Stack.Screen name="TopTab" component={TopTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
