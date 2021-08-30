<template>
    <div id="home">
        <Header />
        <Submit :user="user" />
        <Post />
    </div>
</template>

<script>

import Header from '@/components/home/parts/Header'
import Submit from '@/components/home/parts/Submit'
import Post from '@/components/home/parts/Post'

export default {
    name: "Home",
    components: {
        Header, Submit, Post
    },
    data() {
        return {
            user: {},
        }
    },
    async mounted(){

        const user = await fetch('http://localhost:3000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
        })
        
        if (user.status == 200) {
            let data = await user.json()
            this.user = data
        }
    },
}

</script>

<style scoped>

    #home {
        display: grid;
        grid-template-rows: 100px auto 1fr;
    }

</style>
