import { defineStore } from "pinia";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, getAuth } from "firebase/auth";
import router from "../router";

export const useUserStore = defineStore("user", {
    state: () => ({
        userData: {},
        loadingUser: false,
        loading: false,
        logged: false,
    }),
    actions: {
        async registerUser(email, password) {
            this.loadingUser = true;
            try {
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                this.userData = { email: user.email, uid: user.uid };
                this.logged = true
                router.push("/login");
            } catch (error) {
                console.log(error);
                this.userData = {};
            } finally {
                this.loadingUser = false;
            }
        },

        async login(email, password) {
            const auth = getAuth();
            this.loadingUser = true;
            try {
                const { user } = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                this.userData = { email: user.email, uid: user.uid };
                this.logged = true
                console.log(this.userData)
                router.push("/lotes");
            } catch (error) {
                console.log(error);
                this.userData = {};
            } finally {
                this.loadingUser = false;
            }
        },

        async signOutUser() {
            this.loading = true;
            try {
                await signOut(auth);
            } catch (error) {
                console.log(error);
            } finally {
                this.userData = {};
                this.loading = false;
                this.logged = false;
                router.push("/login");
            }
        },

    },
});