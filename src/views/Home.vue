<template>

    <div>
        <Header />
        <h1> {{ content }} </h1>
    </div>
    
</template>

<script>

import {useRouter} from 'vue-router'

import Header from '@/components/Header.vue'

export default {
  components: { Header },
    name: "Home",
    Components: {
        Header
    },
    data() {
        return {
            content: '',
        }
    },
    async mounted(){

        const router = useRouter();

        const user = await fetch('http://localhost:3000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
        })
        
        if (user.status == 200) {
            let data = await user.json()
            this.content = data.name
        } else {
            router.push('/')
        }
    },
}

</script>

<style scoped>

</style>
