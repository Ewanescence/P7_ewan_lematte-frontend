<template>
    <div id="home">
        <Header />
        <Submit />
        <Post :feeds="feeds" />
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
    },
    data () {
        return {
            feeds: [],
            posts: [],
            author: [],
        }
    },
    async mounted(){
        const posts = await fetch(process.env.VUE_APP_API_SERVER + 'api/posts', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })    
        if (posts.status == 200) {
            this.posts = await posts.json()
            this.posts.forEach( async (post) => {
                const author = await fetch(process.env.VUE_APP_API_SERVER + 'api/author', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(post)
                })
                this.author = await author.json()
                var obj = {...post, ...this.author}
                await this.feeds.push(obj)
            })
        }
    }
}

</script>

<style scoped>

    #home {
        display: grid;
        grid-template-rows: 100px auto 1fr;
    }

</style>
