<script setup>
import { useUserStore } from '../stores/user'
const userStore = useUserStore()


</script>


<template>
    <div>
        <div class="main_container">
            <div class="logo">
                <img src="../assets/logo.png" />
            </div>
            <div className="description">
                <div className="titles">
                    <h1>Tabular annotation, made easy</h1>
                </div>
                <div className="features">
                    <div className="feature">
                        <h3>⚡️ Join tables</h3>
                        <p>Join tables and link similar information for your ML projects</p>
                    </div>
                    <div className="feature">
                        <h3>💁🏻‍♂️ Community based</h3>
                        <p>Get the maximum result out of real people connecting with your work</p>
                    </div>
                    <div className="feature">
                        <h3>💡 Simple And Powerful </h3>
                        <p>Our user oriented mindset allows for an easy, yet really valuable tool</p>
                    </div>
                </div>
            </div>
        </div>
        <footer class="sticky-footer">
            <div className="powered">
                <h4>Powered by</h4>
                <div className="logos">
                    <img src="https://vitejs.dev/logo.svg" />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png" />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Firebase_Logo.svg/1280px-Firebase_Logo.svg.png" />
                </div>
            </div>
        </footer>
    </div>
</template>


<style scoped>
body {
    min-height: 100vh;
}

.sticky-footer {
    position: sticky;
    top: 75%;
}

.main_container {
    padding-top: 10%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;
}

.features {
    display: flex;
    flex-direction: row;
}

.feature {
    padding: 0.5em;
	
}

h1{
	background-image: linear-gradient(260deg, red, blue, red) !important;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
	white-space: pre-wrap;
}

h2{
    background-image: linear-gradient(260deg, red, blue, red) !important;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: pre-wrap;
}

p{
    color: black;
}
.description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em;
    width: 50%;
    height: 100%;
}

.logo img {
    width: 80%;
    height: auto;
}

.powered {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    padding: 5em;
}

.logos img {
    height: 120px;
    padding: 2em;
}

.titles {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 20px;
}

.logo {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    width: 50%;
    height: auto;
    border-right: 1px solid rgba(0, 0, 0, 0.253);
}


.glass {
    background: rgba(255, 255, 255, 0.45);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(3.5px);
    -webkit-backdrop-filter: blur(3.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
}


.main_left {
    display: flex;
    justify-content: center;
    height: 50%;
    width: 50%;
}

.main_right {
    display: flex;
    width: 30%;
    height: 50%;
}
</style>