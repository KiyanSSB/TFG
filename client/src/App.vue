<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { auth } from '../config/firebaseConfig';
import { useUserStore } from './stores/user'


const UserStore = useUserStore()


</script>


<template>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                crossorigin="anonymous" />
        </head>

        <Navbar></Navbar>

        <router-view v-slot="{ Component }">
            <transition 
            name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
   
</template>

<style>
@import '@/assets/base.css';


#app {
    min-height: 100vh;
    /* background: linear-gradient(107.56deg, #C2E9FB 0%, rgba(161, 196, 253, 0) 100%); */

    background: rgb(240, 255, 250);
    background: linear-gradient(284deg, rgba(240, 255, 250, 1) 13%, rgba(199, 255, 236, 1) 36%, rgba(161, 243, 251, 1) 63%, rgba(223, 249, 255, 1) 82%);

    background: linear-gradient(107.56deg, #C2E9FB 0%, rgba(161, 196, 253, 0) 100%);


    /* background: rgb(255,255,255);
background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(192,255,255,0.8659664549413515) 25%, rgba(168,248,231,1) 50%, rgba(105,251,218,1) 75%, rgba(0,255,196,1) 100%); */
}

.center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100vh;
}


.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s ease-out;
}
</style>
