import { View, StyleSheet, useWindowDimensions } from "react-native";
import Screen from "../components/Screen.js";
import React, { useState, useRef, useEffect } from "react";
import CounterBox from "../components/CounterBox.js";
import SwipeComponent from "../components/SwipeComponent.js";
import * as ScreenOrientation from "expo-screen-orientation";
import StackBackButton from "../components/StackBackButton.js";

export default function StandardLayout({ navigation }) {
    const [nameList, setNameList] = useState(["Player 1", "Player 2"]);

    const [colors, setColors] = useState(["#FF0000FF", "#0000FFFF"]);

    const [orientation, setOrientation] = useState(null);
    const screenWidth = useWindowDimensions().width;
    useEffect(() => {
        ScreenOrientation.getOrientationAsync().then((result) => {
            setOrientation(result);
        });
    }, [screenWidth]);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);

    const handleChangeName = (name, id) => {
        const tempArr = [...nameList];
        tempArr[id] = name;
        setNameList(tempArr);
    };

    const handleChangeColor = (color, id) => {
        const tempArr = [...colors];
        tempArr[id] = color;
        setColors(tempArr);
    };

    const handleCloseSwipeable = (ref) => {
        ref.current.handleCloseSwipeable();
    };

    const refs = useRef([...Array(2)].map(() => React.createRef()));

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <StackBackButton onPress={() => navigation.pop()} />
                </View>
                {nameList.map((element, key) => (
                    <CounterBox
                        rotation={{
                            transform: [
                                {
                                    rotate: key < 1 ? "180deg" : "0deg",
                                },
                            ],
                        }}
                        id={key}
                        key={key}
                        ref={refs.current[key]}
                        color={colors[key]}
                        startingLife={20}
                        width={"100%"}
                        height={"50%"}
                        name={nameList[key]}
                        dir={"right"}
                        swipeAction={() => (
                            <SwipeComponent
                                sliderThic={40}
                                name={nameList[key]}
                                color={colors[key]}
                                changeName={handleChangeName}
                                id={key}
                                dir={"right"}
                                onBlur={() =>
                                    handleCloseSwipeable(refs.current[key])
                                }
                                changeColor={handleChangeColor}
                                orientation={orientation}
                            />
                        )}
                    />
                ))}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "black",
    },
    backButtonContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexBasis: "auto",
        flexWrap: "wrap",
    },
});
