<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand">TableFG </RouterLink>

            <div class="collapse navbar-collapse" id="navbarNav">
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
                        <RouterLink to="/register" class="nav-link active" v-if="userStore.logged === false">register
                        </RouterLink>

                    </li>
                </ul>
            </div>



        </div>

        <button v-on:click="userStore.signOutUser()" v-if="userStore.logged != false">
            Logout
        </button>
    </nav>
</template>
<style>
.navabar {
    background: linear-gradient(107.56deg, #C2E9FB 0%, rgba(161, 196, 253, 0) 100%) !important;
}
</style>
