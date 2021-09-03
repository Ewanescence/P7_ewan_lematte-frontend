<template>
    <div id="home">
        <Header />
        <Submit />
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
    }
}

</script>

<style scoped>

    #home {
        display: grid;
        grid-template-rows: 100px auto 1fr;
    }

</style>
