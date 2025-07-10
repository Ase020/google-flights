import {View, Text, Button} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const SignIn = () => {
    return (
        <View>
            <Text>SignIn</Text>
            <Button onPress={()=> router.push("/sign-up")} title="Sign In" />
        </View>
    )
}
export default SignIn
