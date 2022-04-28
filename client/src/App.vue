<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import HomeVue from './components/Home.vue';
</script>


<template>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
  </head>
        <Navbar></Navbar>
        <RouterView></RouterView>  
</template>

<style>
@import '@/assets/base.css';


#app {
  min-height: 100vh;
  background: linear-gradient(107.56deg, #C2E9FB 0%, rgba(161, 196, 253, 0) 100%);
}

.center{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
}

</style>
