<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import {ref,onBeforeMount, computed, onMounted} from 'vue'
    import { useUserStore } from "../stores/user";
    import {getAuth} from "firebase/auth"
    import { storeToRefs } from 'pinia';
    import { useStore } from '../stores/piniaStore';

    const main = useStore()


    const auth = getAuth();
    const user = auth.currentUser;

    var lmao
    if (user) {
        lmao = user
    } else {
        lmao = {"email":"lmao"}
    }

    onBeforeMount(()=>{
        var castaña = user
    })

    function logout(){
        const userStore = useUserStore();
        console.log(useUserStore.userData)
        main.email = null
        userStore.signOutUser();
    
    }

    onMounted(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                console.log("Usuario logeado")
            }else{
                console.log("No Logeado")
            }
        })
    })

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
