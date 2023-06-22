import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import {
    GestureHandlerRootView,
    Swipeable,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
                        style={[styles.container, { backgroundColor: color }]}
                    >
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
            </GestureHandlerRootView>
        );
    }
);

export default CounterBox;

const styles = StyleSheet.create({
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
    text: {
        fontSize: 80,
        fontWeight: 500,
    },
    textName: {
        fontSize: 20,
        position: "absolute",
        bottom: 10,
    },
});
