<template>
    <div className="register-container">
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input class="form-control" type="email" placeholder="email" v-model.trim="email" />
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Password</label>
                <input
                    class="form-control"
                    type="password"
                    placeholder="password"
                    v-model.trim="password"
                />
            </div>
            
            <button class="btn btn-primary" type="submit" :disabled="userStore.loadingUser">
                Crear cuenta
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

const email = ref("bluuweb1@test.com");
const password = ref("123123");

const handleSubmit = () => {
    if (!email.value || password.value.length < 6) {
        alert("ingresa los campos");
    }
    userStore.registerUser(email.value, password.value);
};
</script>


<style>

.register-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 500px;
}

form {
    display: flex;
    flex-direction: column;
    width: 33%;
    background: rgba(196, 158, 246, 0.21);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(196, 158, 246, 0.3);
    padding: 3%;
}

.login_section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
    
.crystal_container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-height: 80%;
}


</style>