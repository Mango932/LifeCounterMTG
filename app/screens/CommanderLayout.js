import { View, Text, StyleSheet, TextInput } from "react-native";
import Screen from "../components/Screen.js";
import React, { useState, useRef } from "react";
import CounterBox from "../components/CounterBox.js";
import SwipeComponent from "../components/SwipeComponent.js";

export default function CommanderLayout() {
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

    console.log("app started");

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                {nameList.map((element, key) => (
                    <CounterBox
                        key={key}
                        ref={refs.current[key]}
                        color={colors[key]}
                        startingLife={40}
                        width={"50%"}
                        height={"50%"}
                        name={nameList[key]}
                        dir={key % 2 == 0 ? "right" : "left"}
                        rightSwipeAction={() => (
                            <SwipeComponent
                                name={nameList[key]}
                                color={colors[key]}
                                changeName={handleChangeName}
                                id={key}
                                onBlur={() =>
                                    handleCloseSwipeable(refs.current[key])
                                }
                                changeColor={handleChangeColor}
                            />
                        )}
                        leftSwipeAction={() => (
                            <SwipeComponent
                                name={nameList[key]}
                                color={colors[key]}
                                changeName={handleChangeName}
                                id={key}
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
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexBasis: "auto",
        flexWrap: "wrap",
    },
});
