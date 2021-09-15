<template>
    <div id="comments">
        <div id="comments-body">
            <router-link :to="'/post/' + comment.post_id" v-for="comment in comments" :key="comment.id">
                <article>
                    <div class="user-infos">
                        <router-link :to="'/profile/' + user.name">
                            <ProfilePicture :src="user.imageUrl" :width="64" :height="64"/>
                        </router-link>  
                        <div class="content-header">
                            <router-link :to="'/profile/' + user.name">
                                <FormattedUsername :name="user.name" />
                            </router-link>
                                <FormattedDate :date="comment.createdAt" />
                        </div>
                        <div class="content-options">
                            <button v-if="isOwner" aria-label="Suppression" id="submit" class="btn btn-outline-danger me-2" type="submit" @click.prevent="deleteComment(comment.id)"><i class="fas fa-trash-alt"></i></button>
                        </div>       
                    </div>
                    <div class="post-content">
                        <hr>
                        <PostContent :content="comment.comment_content" />
                        <PostMedia :media="comment.comment_media" />
                    </div>
                </article>
            </router-link>
            <EoC />
        </div> 
    </div>
</template>

<script>

    import ProfilePicture from '@/components/general/ProfilePicture'
    import FormattedUsername from '@/components/general/FormattedUsername'
    import FormattedDate from '@/components/general/FormattedDate'
    import PostContent from '@/components/general/PostContent'
    import PostMedia from '@/components/general/PostMedia'
    import EoC from '@/components/general/EoC'

    import axios from 'axios'

    export default {
        name: 'Post',
        components: {
            ProfilePicture, FormattedUsername, FormattedDate, PostContent, PostMedia, EoC
        },
        props: ['comments', 'user', 'isOwner'],
        methods: {
            deleteComment(comment) {
                axios
                .delete(process.env.VUE_APP_API_SERVER + `api/comment/delete?id=${comment}`, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(() => {
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }

</script>

<style scoped>
    
    #comments {
        background-color: #212529;
        text-align: left;
        border-bottom: none;
    }

    #comments-body {
        border-top: 2px solid white;
        border-bottom: none;
        border-left: none;
        border-right: none;
    }

    #comments-body article {
        border-bottom: 1px solid white;
        border-radius: 3px;
        padding: 1rem;
    }

    #comments-body article:hover {
        background-color: #2c2c2c;
        transition: 0.5s;
    }

    .user-infos{
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        column-gap: 1rem;
        align-items: center;
    }


    .content-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    a:hover {
        text-decoration: none;
        color: white;
    }

    .content-options {
        display: flex;
        align-items: center;
    }
    
    @media screen and (min-width: 640px) { 
        #comments {
            border-left: 2px solid white;
        }

        #comments-body article {
            padding-left: 3rem;
        }
    }

    @media screen and (max-width: 640px) { 
        .user-pic {
            width: 48px;
            height: 48px;
        }

        #comments {
            margin-bottom: 3rem;
        }
    }

    

</style>