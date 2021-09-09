<template>

<div class="modal-content rounded-5 shadow">
    <div class="modal-header p-5 pb-4 border-bottom-0">
        <img width="256" src="@/assets/icon-left-font-monochrome-black.png" />  
        <hr class="my-4">
        <h2 class="fw-bold mb-0">Inscription</h2>
    </div>
    <div class="modal-body p-5 pt-0">
        <form @submit.prevent="submit">
            <div class="form-floating mb-3">
                <input v-model="data.name" type="text" class="form-control rounded-4" placeholder="ex. Ewanescence" required> 
                <label for="floatingInput">Nom d'utilisateur</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="data.email" type="email" class="form-control rounded-4" placeholder="ex. name@example.com" required> 
                <label for="floatingInput">Adresse mail</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="data.password" type="password" class="form-control rounded-4"  placeholder="ex. Jojol3524" required>
                <label for="floatingPassword">Mot de passe</label>
            </div>
            <div hidden id="message" class="alert" role="alert"></div>
            <button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">S'inscrire</button>
            <hr class="my-4">
            <h2 class="fs-5 fw-bold mb-3">Besoin de revenir en arrière ? 😏</h2>
            <router-link to="/">
                <button type="button" class="w-100 py-2 mb-2 btn btn-outline-dark rounded-4">Se connecter</button>
            </router-link>
        </form>
    </div>
</div>

</template>

<script>

import {reactive} from 'vue'
import {useRouter} from 'vue-router'

export default {
    name: "Register",
    setup() {
        const data = reactive({
            name: '',
            email: '',
            password: ''
        });

        const router = useRouter();

        const submit = async () => {
            const answer = await fetch(process.env.VUE_APP_API_SERVER + 'api/user/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            let message = document.getElementById('message')

            if (answer.status == 200) { 
                
                if (message.classList.contains('alert-danger')) { message.classList.replace('alert-danger', 'alert-success') }
                else { message.classList.add("alert-success") }
                message.textContent = "Création du compte réussie, redirection..."
                message.hidden = false
                setTimeout(function() {
                    router.push('/') 
                }, 3000);

            } else {

                message.textContent = "Votre nom d'utilisateur/adresse e-mail est déjà utilisée"
                message.classList.add("alert-danger")
                message.hidden = false

            }
        }
     
        return {
            data,
            submit
        }
    }
}
</script>

<style scoped>


</style>
