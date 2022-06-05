<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="email" v-model.trim="email" />
            <input
                type="password"
                placeholder="password"
                v-model.trim="password"
            />
            <button type="submit" :disabled="userStore.loadingUser">
                Acceder
            </button>
        </form>

        <div> 
            <button v-on:click="googleSignIn">
                Sign In With Google    
            </button>
        </div>

        <div> 
            <button v-on:click="twitterSignIn">
                Sign In With Twitter
            </button>
        </div>

        <div> 
            <button v-on:click="facebookSignIn">
                Sign In With Facebook
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();


const email = ref("bluuweb1@test.com");
const password = ref("123123");

const handleSubmit = () => {
    if (!email.value || password.value.length < 6) {
        alert("ingresa los campos");
    }

    userStore.login(email.value, password.value);
};

const googleSignIn = () => {
    userStore.googleSignIn();   
};

const twitterSignIn = () => {
    userStore.TwitterSignIn();
};

const facebookSignIn = () => {
    userStore.FacebookSignIn();
};
</script>