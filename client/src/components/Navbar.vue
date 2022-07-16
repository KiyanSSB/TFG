<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand">
                <img src="../assets/logo-extra-small.png" />
            </RouterLink>

            <div class="navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink to="/about" class="nav-link active">About</RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/lotes" class="nav-link active">Lotes</RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/login" class="nav-link active" v-if="userStore.logged === false">Login
                        </RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/register" class="nav-link active" v-if="userStore.logged === false">Register
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>


        <button v-on:click="userStore.signOutUser()" v-if="userStore.logged != false">
            {{userStore.userData.email}}
        </button>





    </nav>
</template>
<style>

a:hover,
a.router-link-active {
    border-bottom: red solid 2px;
}


.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s ease-out;
}

@property --myColor1 {
  syntax: '<color>';
  initial-value: transparent;
  inherits: false;
}

@property --myColor2 {
  syntax: '<color>';
  initial-value: transparent;
  inherits: false;
}

@property --myColor3 {
  syntax: '<color>';
  initial-value: transparent;
  inherits: false;
}

@property --myColor4 {
  syntax: '<color>';
  initial-value: transparent;
  inherits: false;
}



.navbar{
  background: rgb(245,245,249);
  background: linear-gradient(127deg, var(--myColor2) , var(--myColor1) , var(--myColor3) , var(--myColor4) );
    /* background: linear-gradient(127deg, var(--myColor1), var(--myColor2)); */
  transition: --myColor1 2s ease-in , myColor2 3s ease-in , myColor3 15s ease-in-out , myColor4 5s ease-in-out;
}

.navbar:hover{
  --myColor1: rgba(245,245,249,1) ;
  --myColor2: rgb(234, 238, 249);
  --myColor3: #89CADD;
  --myColor4: #9face6;
}



</style>
