<template>
    <div id="posts">
        <div id="posts-body">
            <router-link :to="'/post/' + feed.id" v-for="feed in feeds" :key="feed.id">
                <article>
                    <div class="user-infos">
                        <router-link :to="'/profile/' + feed.name">
                            <ProfilePicture :src="feed.imageUrl" :width="64" :height="64" />
                        </router-link>   
                        <div class="content-header">
                            <router-link :to="'/profile/' + feed.name">
                                <FormattedUsername :name="feed.name" />
                            </router-link>
                            <FormattedDate :date="feed.createdAt" />
                        </div>
                        <div class="content-options">
                            <button v-if="feed.isOwner" aria-label="Suppression" id="submit" class="btn btn-outline-danger me-2" type="submit" @click.prevent="deletePost(feed.id)"><i class="fas fa-trash-alt"></i></button>
                        </div>      
                    </div>
                    <div class="post-content">
                        <hr>
                        <PostContent :content="feed.post_content" />
                        <PostMedia :media="feed.post_media" />
                    </div>
                </article>
            </router-link>
            <EoC />
        </div> 
    </div>
</template>

<script>

    import ProfilePicture from '@/components/general/ProfilePicture'
    import FormattedDate from '@/components/general/FormattedDate'
    import FormattedUsername from '@/components/general/FormattedUsername'
    import PostContent from '@/components/general/PostContent'
    import PostMedia from '@/components/general/PostMedia'
    import EoC from '@/components/general/EoC'

    import axios from 'axios'

    export default {
        name: 'Post',
        components: { 
            ProfilePicture, FormattedDate, FormattedUsername, PostContent, PostMedia, EoC
        },
        props: ['feeds'],
        methods: {
            deletePost(post) {
                axios
                .delete(process.env.VUE_APP_API_SERVER + `api/comments/delete/post?id=${post}`, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(() => {
                    axios
                    .delete(process.env.VUE_APP_API_SERVER + `api/post/delete?id=${post}`, {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    })
                    .then(() => {
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }

    

</script>

<style scoped>
    
    #posts {
        background-color: #212529;
        text-align: left;
    }

    #posts-body {
        border: 1px solid white;
        border-left: none;
        border-right: none;
    }

    #posts-body article {
        border-bottom: 1px solid white;
        border-radius: 3px;
        padding: 32px;
    }

    #posts-body article:hover {
        background-color: #2c2c2c;
        transition: 0.5s;
    }

    .user-infos {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        column-gap: 1rem;
        align-items: center;
    }

    .content-options {
        display: flex;
        align-items: center;
    }

    .post-content p {
        margin-bottom: 0;
    }

    .post-content img {
        margin-top: 1rem;
        max-width: 512px;
        max-height: 512px;
        border-radius: 2px;
        border: 2px solid white;
    }

    a {
        text-decoration: none;
        color: white;
    }

    .content-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .content-header a {
        font-weight: bold;
    }

    .content-header a:hover {
        text-decoration: underline;
    }

    @media screen and (min-width: 640px) { 
        #posts {
            border-left: 2px solid white;
        }
    }

    @media screen and (max-width: 640px) { 
        #posts {
            margin-bottom: 2.5rem;
        }
    }

</style>