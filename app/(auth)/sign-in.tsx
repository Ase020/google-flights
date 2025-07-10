import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/custom-input";
import CustomButton from "@/components/custom-button";
import {signIn} from "@/lib/appwrite";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({email: '', password: ''})

    const submit = async () => {
        const {email, password} = form
        if (!email || !password) return Alert.alert( "Error",'Please enter a valid email address & password.')

        setIsSubmitting(true)

        try {
            await signIn({email, password})

            router.replace("/")
        } catch (ex: any) {
            Alert.alert( "Error",ex as string )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <View className={"gap-10 bg-white rounded-lg p-5 mt-5 pt-10"}>
            <CustomInput
                value={form.email}
                placeholder="ex: john.doe@example.com"
                label='Email'
                onChangeText={(text: string)=> setForm(prev => ({...prev, email: text}))}
                keyboardType="email-address"
            />

            <CustomInput
                value={form.password}
                placeholder="*************"
                label='Password'
                onChangeText={(text: string)=>setForm(prev => ({...prev, password: text}))}
                secureTextEntry={true}
            />

            <CustomButton title={"Sign In"} isLoading={isSubmitting} onPress={submit}/>

            <View className={"flex justify-center flex-row gap-2 mt-5"}>
                <Text className={"base-regular text-gray-100"}>Don't have an account?</Text>
                <Link href={'/sign-up'} className={"base-bold text-primary"}>Sign up</Link>
            </View>
        </View>
    )
}
export default SignIn
