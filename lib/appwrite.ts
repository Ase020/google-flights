import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/types";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
    databaseId: "686f572e002018abd581",
    userCollectionId: "686f5787000dcb60492c"
}

export const appwriteClient = new Client()

appwriteClient
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(appwriteClient)
export const databases = new Databases(appwriteClient)
export const avatars = new Avatars(appwriteClient)

export const createUser = async ({email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        console.log("Created new account", newAccount);
        if (!newAccount) {
            console.log("Error creating account");
            throw new Error("Error creating account...");
        }
        console.log("Account created", newAccount);

        await signIn({email, password})

        const avatarUrl = avatars.getInitialsURL(name)

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { accountId: newAccount.$id, email, name, avatar: avatarUrl}
        )
    } catch (ex) {
        console.log("Error creating account", ex);
        throw new Error(ex as string);
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        await account.createEmailPasswordSession(email, password);
    } catch (ex) {
        throw new Error(ex as string);
    }

}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;


        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (ex) {
        console.error("Error getting the current user.", ex);
        throw new Error(ex as string);
    }
}