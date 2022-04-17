<template>

    <div class="main_container ">
        <div class="main_left glass">
            <h1>Tablas místicas del TFG</h1>
        </div>
        <div class="main_right glass"></div>
    </div>
            


</template>


<style>

.main_container{
    display:flex;
    align-content:center;
    align-items:center;
    justify-content:space-evenly;
    height:100%;
    width:100%;

}

.glass{
    background: rgba( 255, 255, 255, 0.45 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 3.5px );
    -webkit-backdrop-filter: blur( 3.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
}


.main_left{
    display:flex;
    justify-content:center;
    height:50%;
    width:50%;
}

.main_right{
    display:flex;
    width:30%;
    height:50%;
}


</style>