import {create} from 'zustand'
import {getCurrentUser} from "@/lib/appwrite";
import {User} from "@/types";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User) => void;
    setIsLoading: (value: boolean) => void;
    fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>(set => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    setIsAuthenticated: value => set({isAuthenticated: value}),
    setUser: user => set({user}),
    setIsLoading: isLoading => set({isLoading}),
    fetchAuthenticatedUser: async () => {
        set({isLoading: true});

        try {
            const user = await getCurrentUser()

            if (user) {
                set({isAuthenticated: true,user: user as User})
            } else {
                set({isAuthenticated: false, user: null})
            }
        } catch (ex) {
            console.log("fetchAuthenticatedUser ase error", ex);
            set({isAuthenticated: false, user: null});
        } finally {
            set({isLoading: false});
        }
    }
}))

export default useAuthStore;