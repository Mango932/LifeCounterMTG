import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import {
    GestureHandlerRootView,
    Swipeable,
} from "react-native-gesture-handler";

const CounterBox = forwardRef(
    (
        {
            color,
            startingLife,
            height,
            width,
            name,
            rightSwipeAction,
            leftSwipeAction,
            dir,
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
                ]}
            >
                <Swipeable
                    ref={swipeRef}
                    renderRightActions={
                        dir == "right" ? rightSwipeAction : () => <></>
                    }
                    rightThreshold={-80}
                    overshootRight={0}
                    renderLeftActions={
                        dir == "left" ? rightSwipeAction : () => <></>
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
);

export default CounterBox;

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
        borderColor: "black",
        borderWidth: 1,
    },
    text: {
        fontSize: 50,
        marginBottom: "5%",
    },
    textName: {
        fontSize: 30,
    },
});
