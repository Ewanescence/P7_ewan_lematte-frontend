<template>
    <div id="posts">
        <div id="posts-body">
            <article v-for="feed in feeds" :key="feed.id">
                <div id="user-infos">
                    <img id="user-pic" :src="feed.imageUrl">
                </div>
                <div id="post-content">
                    <span>{{ feed.name }}</span>
                    <hr>
                    <p v-if="!!feed.post_content">{{ feed.post_content }}</p>
                </div>
            </article>
        </div> 
    </div>
</template>

<script>

    export default {
        name: 'Post', 
        props: ['user', 'username'],
        data () {
            return {
                feeds: [],
                posts: [],
                author: [],
            }
        },
        async mounted(){

            const posts = await fetch('http://localhost:3000/api/posts', {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include'
            })
            
            if (posts.status == 200) {
                this.posts = await posts.json()
                this.posts.forEach( async (value) => {
                    const author = await fetch('http://localhost:3000/api/author', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify(value)
                    })
                    this.author = await author.json()
                    var obj = {...value, ...this.author}
                    this.feeds.push(obj)
                })
            }
        },
    }

</script>

<style scoped>
    
    #posts {
        border-left: 2px solid white;
        background-color: #212529;
        text-align: left;
        color: white;
    }

    #posts-header {
        margin-left: 32px;
    }

    #posts-body {
        border: 1px solid white;
        border-left: none;
        border-right: none;
        border-radius: 3px;
    }

    #posts-body article {
        display: grid;
        padding: 32px;
        border-bottom: 1px solid white;
        grid-template-columns: auto 1fr;
        border-radius: 3px;
        column-gap: 1rem;
        grid-template-rows: auto 1fr auto;
    }

    #user-pic {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 2px solid white;
    }

    #post-content p {
        margin-bottom: 0;
    }

    #post-content img {
        margin-top: 1rem;
        max-width: 512px;
        max-height: 512px;
        border-radius: 2px;
        border: 2px solid white;
    }

</style>