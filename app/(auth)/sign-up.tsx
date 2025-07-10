import {View, Text, Button} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const SignUp = () => {
    return (
        <View>
            <Text>SignUp</Text>
            <Button onPress={()=> router.push("/sign-in")} title="Sign Up" />
        </View>
    )
}
export default SignUp
