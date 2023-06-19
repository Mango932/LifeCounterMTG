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

    const handleChangeName = (name, id) => {
        const tempArr = [...nameList];
        tempArr[id] = name;
        setNameList(tempArr);
    };

    const handleCloseSwipeable = (ref) => {
        ref.current.handleCloseSwipeable();
    };

    const players = [
        {
            name: nameList[0],
            id: 0,
            color: "red",
            ref: (counterBoxRef0 = useRef()),
        },
        {
            name: nameList[1],
            id: 1,
            color: "blue",
            ref: (counterBoxRef1 = useRef()),
        },
        {
            name: nameList[2],
            id: 2,
            color: "orange",
            ref: (counterBoxRef2 = useRef()),
        },
        {
            name: nameList[3],
            id: 3,
            color: "green",
            ref: (counterBoxRef3 = useRef()),
        },
    ];

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                {players.map((player) => (
                    <CounterBox
                        key={player.id}
                        ref={player.ref}
                        color={player.color}
                        startingLife={40}
                        width={"50%"}
                        height={"50%"}
                        name={player.name}
                        rightSwipeAction={() => (
                            <SwipeComponent
                                changeName={handleChangeName}
                                id={player.id}
                                onBlur={() => handleCloseSwipeable(player.ref)}
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
