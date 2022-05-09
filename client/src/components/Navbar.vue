<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import {useUserStore}  from '../stores/user'
    const userStore = useUserStore()
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light ">
        <RouterLink class="navbar-brand" to="/"> Navbar</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/tables">Tables</RouterLink>
        <RouterLink to="/login" v-if="userStore.logged===false">Login</RouterLink>
        <RouterLink to="/register" v-if="userStore.logged===false">register</RouterLink>
        <button v-on:click="userStore.signOutUser()"
                v-if="userStore.logged!=false">
                Logout
        </button>
    </nav>
</template>
<style>

.navabar{
    background: linear-gradient(107.56deg, #C2E9FB 0%, rgba(161, 196, 253, 0) 100%) !important;
}

</style>
