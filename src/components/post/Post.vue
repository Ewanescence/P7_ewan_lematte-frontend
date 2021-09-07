<template>
    <div id="post">
        <Header />
        <Post :id="id"/>
        <Submit :id="id"/>
        <Comment :id="id"/>
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
    props: ['id']
}

</script>

<style scoped>

    #post {
        display: grid;
        grid-template-rows: 100px auto 256px 1fr;
    }

</style>
