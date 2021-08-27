<template>
    <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        
        <img width="256" height="52" src="@/assets/icon-left-font-monochrome-white.png">

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/" class="nav-link px-2 text-white"><i width="24" class="fa fa-newspaper"></i></router-link></li>
          <li><a href="#" class="nav-link px-2 text-white"><i class="fa fa-user"></i></a></li>
        </ul>


        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2" @click="logout">Déconnexion</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
  
    name: "Header",
    data() {
      return {
        url: '/'
      }
    },
    setup() {
      
        const store = useStore();

        const router = useRouter();

        const auth = computed( () => store.state.authenticated)

        const logout = async () => {

          await fetch('http://localhost:3000/api/logout', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              credentials: 'include'
          });
          
          await store.dispatch('setAuth', false)
          router.push('/')

        }

        return {
            auth, logout
        }
    }
        
}

</script>

<style scoped>

    header {
      position: relative; /* Set the navbar to fixed position */
      top: 0; /* Position the navbar at the top of the page */
      width: 100%; /* Full width */
    }

    .form-control-dark {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: var(--bs-gray);
    }
    .form-control-dark:focus {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: #fff;
    box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
    }

    .bi {
    vertical-align: -.125em;
    fill: currentColor;
    }

    .text-small {
    font-size: 85%;
    }

    .dropdown-toggle {
    outline: 0;
    }

</style>
