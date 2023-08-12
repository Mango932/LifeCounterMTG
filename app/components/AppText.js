import { View, Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { useCallback } from "react";

export default function AppText({ text, style }) {
    const [fontsLoaded] = useFonts({
        "Inter-Black": require("../assets/fonts/Inter-Black.otf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return <Text style={[{ fontFamily: "Inter-Black" }, style]}>{text}</Text>;
}
