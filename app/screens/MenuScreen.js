import { View, StyleSheet, Button } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState, useRef, useEffect } from "react";
import Screen from "../components/Screen";
import { useFocusEffect } from "@react-navigation/native";

export default function MenuScreen({ navigation }) {
    useFocusEffect(
        React.useCallback(() => {
            ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.DEFAULT
            );
        })
    );

    return (
        <Screen>
            <View style={styles.container}>
                <Button
                    title="Standard"
                    onPress={() => navigation.navigate("StandardLayout")}
                />
                <Button
                    title="Commander"
                    onPress={() => navigation.navigate("CommanderLayout")}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {},
});
