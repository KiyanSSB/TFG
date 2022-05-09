<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import {getAuth} from "firebase/auth"
    import {useUserStore}  from '../stores/user'



    const userStore = useUserStore()
    const auth = getAuth();


    function logout(){
        const userStore = useUserStore();
        console.log(useUserStore.userData)
        main.email = null
        userStore.signOutUser();
    }
    
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light ">
        <RouterLink class="navbar-brand" to="/"> Navbar</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/tables">Tables</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">register</RouterLink>
        <button v-on:click="logout()">Logout</button>
        <h1>{{}}</h1>
    </nav>
</template>
<style>

.navabar{
    background: linear-gradient(107.56deg, #C2E9FB 0%, rgba(161, 196, 253, 0) 100%) !important;
}

</style>
