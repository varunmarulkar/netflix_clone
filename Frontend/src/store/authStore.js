import { create } from "zustand"
import axios from "axios"

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({

    // Initial state

    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,


    // Functions

    signup: async (username, email, password) => {
        set({ isLoading: true, message: null });

        try {
            const response = await axios.post("https://netflix-clone-ns2u.onrender.com/api/signup", {
                username,
                email,
                password
            },
            { headers: { "Content-Type": "application/json" } }
        )

            set({ user: response.data.user, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error signing up" })
            throw error;

        }
    },

    login: async (username, password) => {
        set({ isLoading: true, message: null, error: null });

        try {
            const response = await axios.post("https://netflix-clone-ns2u.onrender.com/api/signin", {
                username,
                password
            })

            set({ user: response.data.user, isLoading: false, message: "Logged in successfully" })

        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "Error loging in" })
            throw error;
        }
    },

    fetchUser: async () => {
        set({ fetchingUser: true, error: null });

        try {
            const response = await axios.get("https://netflix-clone-ns2u.onrender.com/api/users",)
            set({ user: response.data.user, fetchingUser: false })
        } catch (error) {
            set({ isLoading: false, error: null, user:null,fetchingUser:false})
            throw error;
        }
    },

    logOut: async () => {
        set({ isLoading: true, error: null, message: null })

        try {
            const response = await axios.post("https://netflix-clone-ns2u.onrender.com/api/logout")
            const { message } = response.data
            set({
                message,
                isLoading: false,
                user: null,
                error: null,
                fetchingUser: false
            })

            return { message };
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "Error fetching user" })
            throw error;
        }
    }
}))