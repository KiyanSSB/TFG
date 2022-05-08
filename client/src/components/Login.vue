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
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useStore } from '../stores/piniaStore'
const userStore = useUserStore();


const email = ref("bluuweb1@test.com");
const password = ref("123123");
const main = useStore()


const handleSubmit = () => {
    if (!email.value || password.value.length < 6) {
        alert("ingresa los campos");
    }

    userStore.login(email.value, password.value)
        .then(
            main.email = email.value
    );
};
</script>