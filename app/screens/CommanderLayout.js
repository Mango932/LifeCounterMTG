import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen.js";
import React, { useState, useRef } from "react";
import CounterBox from "../components/CounterBox.js";
import SwipeComponent from "../components/SwipeComponent.js";
import * as ScreenOrientation from "expo-screen-orientation";
import StackBackButton from "../components/StackBackButton.js";

export default function CommanderLayout({ navigation }) {
    const [nameList, setNameList] = useState([
        "Player 1",
        "Player 2",
        "Player 3",
        "Player 4",
    ]);

    const [colors, setColors] = useState([
        "#FF0000FF",
        "#0000FFFF",
        "#FFA500FF",
        "#00FF00FF",
    ]);

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

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

    const refs = useRef([...Array(4)].map(() => React.createRef()));

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
                                    rotate: key < 2 ? "180deg" : "0deg",
                                },
                            ],
                        }}
                        id={key}
                        key={key}
                        ref={refs.current[key]}
                        color={colors[key]}
                        startingLife={40}
                        width={"50%"}
                        height={"50%"}
                        name={nameList[key]}
                        dir={key == 1 || key == 2 ? "right" : "left"}
                        swipeAction={() => (
                            <SwipeComponent
                                sliderThic={40}
                                name={nameList[key]}
                                color={colors[key]}
                                changeName={handleChangeName}
                                id={key}
                                dir={key == 1 || key == 2 ? "right" : "left"}
                                onBlur={() =>
                                    handleCloseSwipeable(refs.current[key])
                                }
                                changeColor={handleChangeColor}
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
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexBasis: "auto",
        flexWrap: "wrap",
    },
});
