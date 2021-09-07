<template>

    <img v-if="!!media" :src="media">
   
</template>

<script>

    export default {
        name: 'PostMedia',
        props: ['media']
    }

</script>

<style scoped>

    img {
        margin-top: 1rem;
        max-width: 512px;
        max-height: 512px;
        border-radius: 2px;
        border: 2px solid white;
    }
    
</style>