import { defineStore } from "pinia";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, getAuth, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import router from "../router";
import { GoogleAuthProvider , FacebookAuthProvider } from 'firebase/auth'

export const useUserStore = defineStore("user", {
    state: () => ({
        userData: {},
        token: null,
        credential: null,
        secret:null,
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

        async googleSignIn() {
          const provider = new GoogleAuthProvider();
          provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
          const auth = getAuth()
          signInWithPopup(auth,provider)
            .then((result) => {
                this.userData = result.user
                this.credential = GoogleAuthProvider.credentialFromResult(result)
                this.token = this.credential.accessToken
                router.push("/lotes")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.errorMessage
                const email = error.email
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log(errorCode , errorMessage, email, credential )
            })
        },

        async TwitterSignIn() {

        },

        async FacebookSignIn() {
            const auth = getAuth();
            const provider = new FacebookAuthProvider();
            signInWithPopup(auth, provider)
              .then((result) => {
                // The signed-in user info.
                const user = result.user;
            
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
            
                // ...
              })
              .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
            
                // ...
              });  
        }
    }
});