import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useState, useRef } from "react";
import {
    GestureHandlerRootView,
    Swipeable,
} from "react-native-gesture-handler";

export default function CouterBox({
    color,
    startingLife,
    height,
    width,
    name,
    rightSwipeAction,
    leftSwipeAction,
    handleClose,
}) {
    const [lifeTotal, setLifeTotal] = useState(startingLife);
    const [timerId, setTimerId] = useState(null);

    const addSub = (dir) => {
        setLifeTotal((prevLifeTotal) => prevLifeTotal + dir);
    };

    const start = (dir) => {
        const intervalId = setInterval(() => {
            addSub(dir);
        }, 100);
        setTimerId(intervalId);
    };

    let swipeRef = useRef();

    const closeSwipe = () => {
        swipeRef.close;
    };

    return (
        <GestureHandlerRootView
            style={[
                {
                    height: height,
                    width: width,
                },
            ]}
        >
            <Swipeable
                ref={swipeRef}
                renderRightActions={rightSwipeAction}
                rightThreshold={-80}
                overshootRight={0}
                renderLeftActions={leftSwipeAction}
                leftThreshold={-80}
                overshootLeft={0}
                friction={2}
                tension={40}
            >
                <View style={[styles.container, { backgroundColor: color }]}>
                    <Text style={styles.textName}>{name}</Text>
                    <Text style={styles.text}>{lifeTotal}</Text>
                    <TouchableOpacity
                        id="up"
                        style={[styles.button, { left: 0 }]}
                        onPress={() => addSub(-1)}
                        onLongPress={() => start(-1)}
                        onPressOut={() => clearInterval(timerId)}
                    />
                    <TouchableOpacity
                        id="up"
                        style={[styles.button, { right: 0 }]}
                        onPress={() => addSub(1)}
                        onLongPress={() => start(1)}
                        onPressOut={() => clearInterval(timerId)}
                    />
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        height: "100%",
        width: "50%",
    },
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 50,
        marginBottom: "5%",
    },
    textName: {
        fontSize: 30,
    },
});
