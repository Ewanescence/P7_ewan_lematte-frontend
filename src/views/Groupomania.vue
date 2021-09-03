<template>

    <div id="logged_in">
        <Header :profile="profile" />
        <router-view />
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
            user: {},
            profile: ''
        }
    },
    async mounted(){
        const user = await fetch(process.env.VUE_APP_API_SERVER + 'api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
        })
    
        if (user.status == 200) {
            let data = await user.json()
            this.user = data
            this.profile = data.name
        }
    },
}

</script>

<style scoped>

#logged_in {
    display: grid;
    height: 100%;
    grid-template-columns: auto 1fr auto;
}

</style>
