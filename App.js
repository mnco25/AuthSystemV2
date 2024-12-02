import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainMenu from "./src/MainMenu";
import Registration from "./src/Registration";
import UserPage from "./src/UserPage";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="UserPage" component={UserPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
