<template>

    <h1>Accueil</h1>
    
</template>

<script>

import {onMounted} from 'vue'

export default {
    name: "Home",
    setup() {
        onMounted( async () => {
            await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            });
        })
    }
}

</script>

<style scoped>

</style>
