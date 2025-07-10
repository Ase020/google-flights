import { Models } from "react-native-appwrite";

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (value: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
}

interface CreateUserParams {
    email: string;
    password: string;
    name: string;
}

interface SignInParams {
    email: string;
    password: string;
}

export interface User extends Models.Document {
    name: string;
    email: string;
    avatar: string;
}