<script setup>
    import { RouterLink, RouterView } from 'vue-router'
</script>



<template>
    <nav class="navbar navbar-expand-lg navbar-light ">
        <RouterLink class="navbar-brand" to="/"> Navbar</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/tables">Tables</RouterLink>
    </nav>

</template>


<style>

.navabar{
    background: linear-gradient(107.56deg, #C2E9FB 0%, rgba(161, 196, 253, 0) 100%) !important;

}

</style>