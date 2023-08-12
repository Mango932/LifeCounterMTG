import { StyleSheet, TouchableHighlight, Alert } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ({ onPress }) {
    const handlePress = () => {
        Alert.alert(
            "Continue?",
            "Are you sure you want to proceed this will delete the current counts.",
            [
                {
                    text: "Cancel",
                },
                { text: "Leave", onPress: onPress },
            ],
            {
                cancelable: true,
            }
        );
    };
    return (
        <TouchableHighlight style={styles.container} onPress={handlePress}>
            <MaterialCommunityIcons
                name={"view-grid"}
                color={"darkgrey"}
                size={35}
            />
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        backgroundColor: "black",
        zIndex: 1,
        borderRadius: 35,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
