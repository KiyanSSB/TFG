<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { auth } from '../config/firebaseConfig';
import { useUserStore } from './stores/user'


const UserStore = useUserStore()


</script>


<template>
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
/* 
    background: rgb(240,255,250);
    background: linear-gradient(108deg, rgba(240,255,250,1) 13%, rgba(199,255,236,1) 36%, rgba(161,243,251,1) 63%, rgba(223,249,255,1) 82%); */

background: #FEAC5E;  
background: -webkit-linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E);  
background: linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E); 

background: #005AA7;  
background: -webkit-linear-gradient(to right, #FFFDE4, #005AA7);  
background: linear-gradient(to right, #FFFDE4, #005AA7); 

background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);

background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);

/* background-image: url('assets/19007.jpg');
background-size: cover; */

/* background-image: url('assets/cuadrado-blanco.jpg');
background-size: cover; */

/* background-image: url('assets/low-poly.jpg');
background-size: cover; */
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
    transition: opacity .3s ease-out;
}
</style>
