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

    const counterBoxRef0 = useRef();
    const counterBoxRef1 = useRef();
    const counterBoxRef2 = useRef();
    const counterBoxRef3 = useRef();

    const handleCloseSwipeable = (ref) => {
        ref.current.handleCloseSwipeable();
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <CounterBox
                    ref={counterBoxRef0}
                    color={"red"}
                    startingLife={40}
                    width={"50%"}
                    name={nameList[0]}
                    rightSwipeAction={() => (
                        <SwipeComponent
                            changeName={handleChangeName}
                            id={0}
                            onBlur={() => handleCloseSwipeable(counterBoxRef0)}
                        />
                    )}
                />
                <CounterBox
                    ref={counterBoxRef1}
                    color={"blue"}
                    startingLife={40}
                    width={"50%"}
                    name={nameList[1]}
                    leftSwipeAction={() => (
                        <SwipeComponent
                            changeName={handleChangeName}
                            id={1}
                            onBlur={() => handleCloseSwipeable(counterBoxRef1)}
                        />
                    )}
                />
            </View>
            <View style={styles.container}>
                <CounterBox
                    ref={counterBoxRef2}
                    color={"orange"}
                    startingLife={40}
                    width={"50%"}
                    name={nameList[2]}
                    rightSwipeAction={() => (
                        <SwipeComponent
                            changeName={handleChangeName}
                            id={2}
                            onBlur={() => handleCloseSwipeable(counterBoxRef2)}
                        />
                    )}
                />
                <CounterBox
                    ref={counterBoxRef3}
                    color={"green"}
                    startingLife={40}
                    width={"50%"}
                    name={nameList[3]}
                    leftSwipeAction={() => (
                        <SwipeComponent
                            changeName={handleChangeName}
                            id={3}
                            onBlur={() => handleCloseSwipeable(counterBoxRef3)}
                        />
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
