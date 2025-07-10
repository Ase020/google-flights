import React from 'react'
import {Redirect, Slot} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";


export default function _Layout() {
    const isAuthenticated:boolean = true;

    if (!isAuthenticated) return (<Redirect href="/sign-in" />);
    return (
        <SafeAreaView>
            <Text>Tabs Layout</Text>
            <Slot/>
        </SafeAreaView>
    )
}
