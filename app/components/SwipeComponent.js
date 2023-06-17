import { View, TextInput } from "react-native";
import React from "react";

export default function SwipeComponent({ changeName, id, onBlur }) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                backgroundColor: "#E9EDF0",
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                    style={{
                        width: "50%",
                        height: "100%",
                        backgroundColor: "white",
                        marginLeft: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        padding: 5,
                        textAlign: "center",
                    }}
                    maxLength={10}
                    placeholder={"Player"}
                    onChangeText={(text) => changeName(text, id)}
                    onBlur={() => onBlur()}
                />
            </View>
        </View>
    );
}
