import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/custom-input";
import CustomButton from "@/components/custom-button";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({name: '', email: '', password: ''})

    const submit = async () => {
        const {email, password, name} = form
        if (!name || !email || !password) return Alert.alert( "Error",'Please a enter valid email address & password.')

        setIsSubmitting(true)

        try {
            await createUser({email, password, name})

            router.replace("/")
        } catch (ex: any) {
            console.log("Error", ex)
            Alert.alert( "Error",ex as string )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <View className={"gap-10 bg-white rounded-lg p-5 mt-5 pt-10"}>
            <CustomInput
                value={form.name}
                placeholder="ex: John Doe"
                label='Full name'
                onChangeText={(text: string)=> setForm(prev => ({...prev, name: text}))}
                keyboardType="default"
            />

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

            <CustomButton title={"Sign up"} isLoading={isSubmitting} onPress={submit}/>

            <View className={"flex justify-center flex-row gap-2 mt-5"}>
                <Text className={"base-regular text-gray-100"}>Already have an account?</Text>
                <Link href={'/sign-in'} className={"base-bold text-primary"}>Sign in</Link>
            </View>
        </View>
    )
}
export default SignUp
