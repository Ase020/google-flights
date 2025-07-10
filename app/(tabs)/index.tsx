import {Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import useAuthStore from "@/store/auth.store";

export default function Index() {
    const { user } = useAuthStore()

    console.log("User:", JSON.stringify(user, null, 2));
    return (
        <SafeAreaView>
            <Text>Index</Text>
        </SafeAreaView>
    )
}
