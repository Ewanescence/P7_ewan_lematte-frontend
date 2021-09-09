<template>
    <div id="post">
        <Header />
        <Post :id="id" :isOwner="isOwner" />
        <Submit :id="id" />
        <Comment :id="id" />
    </div>
</template>

<script>

import Header from '@/components/post/parts/Header'
import Post from '@/components/post/parts/Post'
import Submit from '@/components/post/parts/Submit'
import Comment from '@/components/post/parts/Comment'

export default {
    name: "Posts",
    components: {
        Header, Post, Submit, Comment
    },
    data() {
        return {
            isOwner: false
        }
    },
    props: ['id'],
    async mounted() {
        const owner = await fetch(process.env.VUE_APP_API_SERVER + `api/user/owner?id=${this.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })

        this.isOwner = owner.ok
        
    }
}

</script>

<style scoped>

    #post {
        display: grid;
        grid-template-rows: auto auto 256px 1fr;
    }

</style>
