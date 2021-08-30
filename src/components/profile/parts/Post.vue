<template>
    <div id="posts">
        <div id="posts-header">
            <h2>Publications</h2>
            <hr>
        </div>
        <div id="posts-body">
            <article v-for="post in posts" :key="post.message">
                <div id="user-infos">
                    <img id="user-pic" :src="user.imageUrl">
                </div>
                <div id="post-content">
                    <span>{{ username }}</span>
                    <hr>
                    <p v-if="!!post.message">{{ post.message }}</p>
                    <img v-if="!post.url" :src="post.url">
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
                posts: [
                    {message: 'première publication', url: ''},
                    {message: '', url: this.user.imageUrl},
                    {message: 'troisième publication', url: 'https://www.cerballiance.fr/sites/www.cerballiance.fr/files/media/image/2020-12/iStock-1212779887-test-antigenique-achetee.jpg'},
                    {message: 'troisième publication', url: 'https://www.cerballiance.fr/sites/www.cerballiance.fr/files/media/image/2020-12/iStock-1212779887-test-antigenique-achetee.jpg'}
                ],
            }
        },
    }

</script>

<style scoped>
    
    #posts {
        padding-right: 1rem;
        padding-left: 1rem;
        padding-bottom: 1rem;
        border-left: 2px solid white;
        background-color: #212529;
        text-align: left;
        color: white;
    }

    #posts-header, #posts-body {
        margin-left: 32px;
    }

    #posts-body {
        border: 1px solid white;
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