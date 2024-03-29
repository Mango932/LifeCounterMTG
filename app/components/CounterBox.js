import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import {
    GestureHandlerRootView,
    Swipeable,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

const CounterBox = forwardRef(
    (
        {
            color,
            startingLife,
            height,
            width,
            name,
            swipeAction,
            dir,
            rotation,
            death,
            changeDeath,
            id,
        },
        ref
    ) => {
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

        const swipeRef = useRef();

        useImperativeHandle(ref, () => ({
            handleCloseSwipeable() {
                swipeRef.current.close();
            },
        }));

        return (
            <GestureHandlerRootView
                style={[
                    {
                        height: height,
                        width: width,
                    },
                    rotation,
                ]}
            >
                {death == false ? (
                    <Swipeable
                        ref={swipeRef}
                        renderRightActions={
                            dir == "right" ? swipeAction : () => <></>
                        }
                        rightThreshold={-80}
                        overshootRight={0}
                        renderLeftActions={
                            dir == "left" ? swipeAction : () => <></>
                        }
                        leftThreshold={-80}
                        overshootLeft={0}
                        friction={2}
                        tension={40}
                    >
                        <View
                            style={[
                                styles.container,
                                { backgroundColor: color },
                            ]}
                        >
                            <MaterialIcons
                                name={
                                    dir == "left"
                                        ? "arrow-forward-ios"
                                        : "arrow-back-ios"
                                }
                                color={"black"}
                                size={20}
                                style={[
                                    styles.arrow,
                                    {
                                        left: dir == "right" ? 20 : null,
                                        right: dir == "left" ? 20 : null,
                                    },
                                ]}
                            />
                            <Text style={styles.textName}>{name}</Text>
                            <Text style={styles.text}>{lifeTotal}</Text>
                            <TouchableOpacity
                                id="up"
                                style={[styles.button, { left: 0 }]}
                                onPress={() => addSub(-1)}
                                onLongPress={() => start(-1)}
                                onPressOut={() => clearInterval(timerId)}
                            >
                                <MaterialCommunityIcons
                                    name={"minus"}
                                    color={"black"}
                                    size={40}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                id="up"
                                style={[
                                    styles.button,
                                    { right: 0, alignItems: "flex-end" },
                                ]}
                                onPress={() => addSub(1)}
                                onLongPress={() => start(1)}
                                onPressOut={() => clearInterval(timerId)}
                            >
                                <MaterialCommunityIcons
                                    name={"plus"}
                                    color={"black"}
                                    size={40}
                                />
                            </TouchableOpacity>
                        </View>
                    </Swipeable>
                ) : (
                    <View style={styles.deathScreen}>
                        <Foundation name={"skull"} color={"black"} size={100} />
                        <TouchableOpacity
                            style={styles.deathButton}
                            onPress={() => changeDeath(false, id)}
                        >
                            <MaterialIcons
                                name={"close"}
                                color={"black"}
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </GestureHandlerRootView>
        );
    }
);

export default CounterBox;

const styles = StyleSheet.create({
    arrow: {
        position: "absolute",
        bottom: 10,
    },
    button: {
        position: "absolute",
        height: "100%",
        width: "50%",
        justifyContent: "center",
        padding: 20,
    },
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 1,
    },
    deathScreen: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "darkgrey",
    },
    text: {
        fontSize: 80,
        fontWeight: "bold",
    },
    textName: {
        fontSize: 20,
        position: "absolute",
        bottom: 10,
    },
});
