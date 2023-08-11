import CommanderLayout from "./app/screens/CommanderLayout";
import StandardLayout from "./app/screens/StandardLayout";
import MenuScreen from "./app/screens/MenuScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="MenuScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="StandardLayout"
                    component={StandardLayout}
                />
                <Stack.Screen
                    name="CommanderLayout"
                    component={CommanderLayout}
                />
                <Stack.Screen name="MenuScreen" component={MenuScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
