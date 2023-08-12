import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    ImageBackground,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState, useRef, useEffect } from "react";
import Screen from "../components/Screen";
import { useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import AppText from "../components/AppText.js";

export default function MenuScreen({ navigation }) {
    useFocusEffect(
        React.useCallback(() => {
            ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
        })
    );

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

    return (
        <Screen>
            <ImageBackground
                source={require("../assets/img/background.jpg")}
                resizeMode="contain"
                style={styles.container}
            >
                <AppText text={"Life Counter"} style={styles.title} />
                <Image
                    source={require("../assets/img/mtgLogo.png")}
                    style={styles.image}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("StandardLayout")}
                    style={styles.button}
                >
                    <AppText text={"Standard"} style={styles.buttonText} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CommanderLayout")}
                    style={styles.button}
                >
                    <AppText text={"Commander"} style={styles.buttonText} />
                </TouchableOpacity>
            </ImageBackground>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "orange",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 5,
        padding: 10,
        width: "60%",
    },
    buttonText: {
        fontSize: 30,
    },
    title: {
        fontSize: 80,
        textAlign: "center",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 250,
        marginBottom: 30,
    },
});
