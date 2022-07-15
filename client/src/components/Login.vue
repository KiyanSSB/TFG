<template>
    <div className="login-div">
        <form @submit.prevent>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input class="form-control" type="email" placeholder="email" v-model.trim="email" />
            </div>

            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Password</label>
                <input class="form-control" type="password" placeholder="password" v-model.trim="password" />
            </div>

            <div class="d-flex justify-content-center">
                <button class="btn btn-primary" type="submit" :disabled="userStore.loadingUser" v-on:click="handleSubmit" style="margin:2%">
                    Acceder
                </button>
            </div>

            <h5 class="text-center">Or login with: </h5>

            <div class="d-flex justify-content-evenly">
                <button className="google-login" v-on:click="googleSignIn">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/36px-Google_%22G%22_Logo.svg.png"
                        alt="google logo" />
                </button>
            </div>

        </form>
    </div>
</template>


<script setup>
import { async } from "@firebase/util";
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import router from "../router";
import { auth } from "../../config/firebaseConfig";
import { a } from "../../dist/assets/index.67afa436";

const userStore = useUserStore();


const email = ref();
const password = ref();
async function handleSubmit() {
    console.log(email.value)
    console.log(password.value)

    if (email.value == "") {
        alert("Email is required")
        return;
    }

    if (password.value == "") {
        alert("Password is required")
        return;
    }

    var result = await userStore.login(email.value, password.value);

    if (result == "FirebaseError: Firebase: Error (auth/user-not-found).") {
        alert("User not found");
    }

    if (result == "FirebaseError: Firebase: Error (auth/wrong-password).") {
        alert("Wrong password");
    }


};

async function googleSignIn(){
    await userStore.googleSignIn();
};

</script>


<style scoped>
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

form {
    width: 33%;
    /* From https://css.glass */
    background: rgba(196, 158, 246, 0.21);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(196, 158, 246, 0.3);
    padding: 3%;
}

.google-login {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(196, 158, 246, 0.3);
    padding: 3%;
}

.login-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding-top: 5%;
}
</style>