<template>
    <form @submit.prevent="submit">
      <img class="mb-4" src="@/assets/icon-left-font-monochrome-black.png" alt="" width="256" height="256">
      <h1 class="h3 mb-3 fw-normal">Inscription</h1>
      <input v-model="data.name" type="text" class="form-control" placeholder="ex. Ewanescence" required> 
      <input v-model="data.email" type="email" class="form-control" placeholder="ex. name@example.com" required> 
      <input v-model="data.password" type="password" class="form-control"  placeholder="Password" required>
      <div hidden id="message" class="alert" role="alert"></div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">S'inscrire'</button>
    </form>
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
            const answer = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            let message = document.getElementById('message')

            if (answer.status == 200) { 
                
                console.log(message.classList.contains('alert-danger')) 
                if (message.classList.contains('alert-danger')) { message.classList.replace('alert-danger', 'alert-success') }
                else { message.classList.add("alert-success") }
                message.textContent = "Création du compte réussie, redirection..."
                message.hidden = false
                setTimeout(function() {
                    router.push('/login') 
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

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-floating:focus-within {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }


</style>
