import { View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import ColorPicker, { HueSlider } from "reanimated-color-picker";

export default function SwipeComponent({
    changeName,
    id,
    onBlur,
    color,
    changeColor,
    name,
}) {
    const [newName, setNewName] = useState("");

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: color.slice(0, -2) + "61" },
            ]}
        >
            <TextInput
                style={styles.textInput}
                maxLength={10}
                placeholder={name}
                onChangeText={(t) => setNewName(t)}
                onBlur={() => {
                    changeName(newName, id);
                    onBlur();
                }}
            />
            <ColorPicker
                value={color}
                sliderThickness={25}
                thumbSize={24}
                thumbShape="ring"
                thumbColor="white"
                boundedThumb
                style={{ width: "50%" }}
                onComplete={(color) => {
                    changeColor(color.hex + "FF", id);
                    onBlur();
                }}
            >
                <HueSlider />
            </ColorPicker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        opacity: 10,
    },
    textInput: {
        width: "50%",
        height: "20%",
        backgroundColor: "#FFFFFF",
        textAlign: "center",
        borderRadius: 100,
        marginBottom: 20,
    },
});
