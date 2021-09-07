<template>
    <img class="user-pic" :src="src">
</template>

<script>

export default {
    name: "ProfilePicture",
    props: ['src']
}

</script>

<style scoped>

    img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            border: 2px solid white;
    }

</style>