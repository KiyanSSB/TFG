import { defineStore } from "pinia";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import router from "../router";

export const useUserStore = defineStore("user", {
    state: () => ({
        userData: {},
        loadingUser: false,
        loading: false,
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
                router.push("/");
            } catch (error) {
                console.log(error);
                this.userData = {};
            } finally {
                this.loadingUser = false;
            }
        },
    },
});