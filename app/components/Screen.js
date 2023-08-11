import { StyleSheet, SafeAreaView, useWindowDimensions } from "react-native";
import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Screen({ children, style }) {
    const [orientation, setOrientation] = useState(null);
    const screenWidth = useWindowDimensions().width;
    useEffect(() => {
        ScreenOrientation.getOrientationAsync().then((result) => {
            setOrientation(result);
        });
    }, [screenWidth]);

    return (
        <SafeAreaView
            style={[
                styles.screen,
                {
                    paddingTop:
                        orientation == 1 ? Constants.statusBarHeight : 0,
                },
            ]}
        >
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "black",
    },
});
