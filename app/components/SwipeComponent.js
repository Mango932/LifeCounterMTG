import { View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import ColorPicker, { HueSlider } from "reanimated-color-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function SwipeComponent({
    changeName,
    id,
    onBlur,
    color,
    changeColor,
    name,
    sliderThic,
}) {
    const [newName, setNewName] = useState(name);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <View style={styles.sudoContainer}>
                <View style={styles.bgContainer} />
                <MaterialIcons
                    style={[
                        styles.arrow,
                        {
                            left: id % 2 == 1 ? null : 20,
                            right: id % 2 == 1 ? 20 : null,
                        },
                    ]}
                    name={id % 2 == 0 ? "arrow-back-ios" : "arrow-forward-ios"}
                    color={"black"}
                    size={40}
                />
                <TextInput
                    style={[
                        styles.textInput,
                        { height: sliderThic + 4, backgroundColor: color },
                    ]}
                    maxLength={10}
                    value={newName}
                    onChangeText={(t) => setNewName(t)}
                    onBlur={() => {
                        changeName(newName, id);
                    }}
                />
                <View
                    style={{
                        width: "50%",
                        borderWidth: 2,
                        borderColor: "black",
                        borderRadius: 6,
                    }}
                >
                    <ColorPicker
                        value={color}
                        sliderThickness={sliderThic}
                        thumbSize={sliderThic - 1}
                        thumbShape="ring"
                        thumbColor="white"
                        boundedThumb
                        onComplete={(colors) => {
                            changeColor(colors.hex + "FF", id);
                        }}
                    >
                        <HueSlider />
                    </ColorPicker>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    arrow: { position: "absolute", left: 20 },
    bgContainer: {
        position: "absolute",
        opacity: 0.5,
        backgroundColor: "black",
        width: "100%",
        height: "100%",
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    sudoContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    textInput: {
        width: "50%",
        backgroundColor: "#FFFFFF",
        textAlign: "center",
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "500",
        borderWidth: 2,
        borderColor: "black",
    },
});
