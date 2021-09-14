<template>

    <div id="groupomania">
        <Header :profile="profile" />
        <router-view :key="$route.fullPath"/>
    </div>
    
</template>

<script>

import Header from '@/components/header/Header.vue'

export default {
    name: "Groupomania",
    components: {
        Header
    },
    data() {
        return {
            profile: ''
        }
    },
    async mounted(){
        
        const user = await fetch(process.env.VUE_APP_API_SERVER + 'api/user/auth', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
        })
    
        if (user.status == 200) {
            let data = await user.json()
            this.profile = "/profile/" + data.name
        }
    },
}

</script>

<style>

    #groupomania {
        display: grid;
        height: 100%;
        grid-template-columns: auto 1fr auto;
    }

    .post-content img, .comment-content img {
        width: 100%;
    }

    @media screen and (max-width: 640px) {
        #groupomania {
            height: 100%;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
        }
    }

</style>
