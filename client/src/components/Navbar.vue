<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '../stores/user'
import { onClickOutside } from '@vueuse/core';
const userStore = useUserStore()


var open = ref(false)
const modal = ref(null)
var table1 = ref(false)
var tabla2 = ref(false)

onClickOutside(modal, () => (open.value = false,table1.value = false,tabla2.value = false))

function color(column){
    console.log(column)
    if(column == "tabla1"){
        table1.value = true
    }

    if(column == "tabla2"){
        tabla2.value = true
    }


    var patata = document.getElementById(column);
    console.log(patata);
    patata.classList.add("red")

}


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

                    <li class="nav-item">
                        <p class="router-link-active router-link-exact-active nav-link active " @click="open = true">
                            Tutorial</p>
                        <Teleport to="body">
                            <transition name="fade" mode="out-in">
                                <div class="modal-bg" v-if="open">
                                    <div class="modal" ref="modal">
                                        <div class="container-center">
                                            <h2>Hi! Welcome to TableFG</h2>
                                            <h6 style="margin-inline: 2%;">Your work here will be to find relationships
                                                between columns displayed in tables, lets see a quick example</h6>
                                            <div>
                                                <div>
                                                    <ul style="font-size: smaller">
                                                        <li>
                                                             You will be given tables containing differents sets of columns,as shown below, and your work will be to find relationships, either by the title of the columns or by the content of the columns.
                                                             As you see , the example shows 2 columns, that contain the same title, but different content.
                                                        </li>
                                                        <li style="color:red">
                                                            The thing is, both columns represent the same information, but in different ways.
                                                        </li>
                                                        <li>
                                                            As the title is the same, and the content focus the same concept, names, we will relate these columns clicking on them.
                                                        </li>
                                                    </ul>
                                                    <h5  style="padding-right: 2.5%; padding-left: 2.5%; font-size: smaller;">
                                                    Go ahead and click them!
                                                    </h5>
                                                </div>
                                                <div class="sides">
                                                    <table id="tabla1" class="tabla" v-on:click="color('tabla1')">
                                                        <th>
                                                            Name
                                                        </th>
                                                        <tr>
                                                            <td>
                                                                John
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Mary
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Peter
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <table id="tabla2" class="tabla" v-on:click="color('tabla2')">
                                                        <th>
                                                            Name
                                                        </th>
                                                        <tr>
                                                            <td>
                                                                Gabriel
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                David
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Pablo
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <button class="btn btn-success" @click="open=false" v-if="table1 && tabla2" >Tutorial Completed!</button>
                                        </div>
                                        
                                        <button style="margin-top: 2%;" class="close-btn" @click="open = false">X</button>                
                                    </div>
                                </div>
                            </transition>
                        </Teleport>
                    </li>
                </ul>
            </div>
        </div>

        <div class="d-flex justify-content-around"  style="margin-right: 2%; width: 20%;" v-if="userStore.logged != false" >
            <button class="btn btn-warning" type="button" id="infoUser">
                {{ userStore.userData.email }}
            </button>

                <a class="btn btn-danger" v-on:click="userStore.signOutUser()">Sign Out</a>

        </div>

    </nav>
</template>

<style>
a:hover,
a.router-link-active {
    border-bottom: red solid 2px;
    animation-direction: alternate;
}

.dropy {
    border: 1px solid black;
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



.navbar {
    background: rgb(245, 245, 249);
    background: linear-gradient(127deg, var(--myColor1), var(--myColor1), var(--myColor3), var(--myColor4));
    /* background: linear-gradient(127deg, var(--myColor1), var(--myColor2)); */
    transition: --myColor1 1s ease-in, myColor2 5s ease-in, myColor3 2s ease-in-out, myColor4 2s ease-in-out;
}

.navbar:hover {
    --myColor1: rgba(245, 245, 249, 1);
    --myColor2: rgb(234, 238, 249);
    --myColor3: #89CADD;
    --myColor4: #9face6;
}

.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background: rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    position: relative;
    background: white;
    width: 50%;
    height: 50%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
}

.container-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100%;
    width: 100%;
    color: black;
}

.sides{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 2em; 
}

.red{
    background-color: red;
}

th{
       padding: 8px;
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    color: #ffffff;
    background-color: #55608f;
    border: 1px solid black !important;
}

td{
        background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid black !important;
    text-align: center;
}

</style>
