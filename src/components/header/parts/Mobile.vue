<template>
    <header class="bg-dark text-white">
        <nav>
            <ul>
                <a v-if="$route.name != 'home'" @click="$router.go(-1)">
                    <i class="fas fa-arrow-left"></i>
                </a>
                <Link url="/home" icon="fas fa-home" text="" />
                <Link :url="profile" icon="fas fa-user-circle" text="" />
                <li>
                    <a href="/" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i></a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>

import {useRouter} from 'vue-router'

import Link from '@/components/header/parts/Link'

export default {
  
    name: "Desktop",
    props: ['profile'],
    components: {
        Link
    },
    setup() {
      
        const router = useRouter();

        const logout = async () => {
            await fetch(process.env.VUE_APP_API_SERVER + 'api/user/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            router.push('/')
        }

        return {
            logout
        }
    }
}

</script>

<style scoped>

    header {
            grid-row: 2/3;
            position: fixed;
            height: 3rem;
            width: 100%;
            bottom: 0;
            z-index: 999;
            border-top: 2px solid white;
            padding: 1rem;
    }

    ul {
        display: flex;
        list-style: none;
        justify-content: space-evenly;
        padding-left: 0;
    }

    i {
        color: white;        
        font-size: 20px;
    }


</style>

