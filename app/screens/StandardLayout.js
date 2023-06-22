import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen.js";
import React, { useState, useRef } from "react";
import CounterBox from "../components/CounterBox.js";
import SwipeComponent from "../components/SwipeComponent.js";

export default function CommanderLayout() {
    const [nameList, setNameList] = useState(["Player 1", "Player 2"]);

    const [colors, setColors] = useState(["#FF0000FF", "#0000FFFF"]);

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
                        dir={key % 2 == 0 ? "right" : "left"}
                        swipeAction={() => (
                            <SwipeComponent
                                sliderThic={40}
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
