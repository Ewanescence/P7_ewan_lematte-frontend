<template>
    <img class="user-pic" :width="width" :height="height" :src="src">
</template>

<script>

export default {
    name: "ProfilePicture",
    props: ['src', 'width', 'height']
}

</script>

<style scoped>

    img {
        border-radius: 50%;
        border: 2px solid white;
    }

</style>