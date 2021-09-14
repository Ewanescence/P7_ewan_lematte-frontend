<template>
    <img class="user-pic" :width="width" :height="height" :src="pictureUrl">
</template>

<script>

export default {
    name: "ProfilePicture",
    props: ['src', 'width', 'height'],
    computed: {
        pictureUrl() {
            return process.env.VUE_APP_API_SERVER + this.src
        }
    }
}

</script>

<style scoped>

    img {
        border-radius: 50%;
        border: 2px solid white;
        object-fit: cover;
    }

</style>