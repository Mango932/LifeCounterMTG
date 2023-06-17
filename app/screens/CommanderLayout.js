import { View, Text, StyleSheet, TextInput } from "react-native";
import Screen from "../components/Screen.js";
import React, { useState, useRef } from "react";
import CounterBox from "../components/CouterBox.js";
import SwipeComponent from "../components/SwipeComponent.js";

export default function CommanderLayout() {
    const [nameList, setNameList] = useState([
        "Player 1",
        "Player 2",
        "Player 3",
        "Player 4",
    ]);

    const changeNameFunc = (name, id) => {
        const tempArr = [...nameList];
        tempArr[id] = name;
        setNameList(tempArr);
    };

    const handleCloseSwipeable = (ref) => {};

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <CounterBox
                    color={"red"}
                    startingLife={40}
                    width={"50%"}
                    name={nameList[0]}
                    rightSwipeAction={() => (
                        <SwipeComponent
                            changeName={changeNameFunc}
                            id={0}
                            closeSwipe={handleCloseSwipeable()}
                        />
                    )}
                />
                <CounterBox
                    color={"blue"}
                    startingLife={40}
                    width={"50%"}
                    name={nameList[1]}
                    leftSwipeAction={() => (
                        <SwipeComponent changeName={changeNameFunc} id={1} />
                    )}
                />
            </View>
            <View style={styles.container}>
                <CounterBox
                    color={"orange"}
                    startingLife={40}
                    width={"50%"}
                    name={nameList[2]}
                    rightSwipeAction={() => (
                        <SwipeComponent changeName={changeNameFunc} id={2} />
                    )}
                />
                <CounterBox
                    color={"green"}
                    startingLife={40}
                    width={"50%"}
                    name={nameList[3]}
                    leftSwipeAction={() => (
                        <SwipeComponent changeName={changeNameFunc} id={3} />
                    )}
                />
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
        height: "50%",
        flexDirection: "row",
        flexBasis: "auto",
    },
});
