<template>

    <div id="post-container">
        <div class="user-infos">
            <router-link :to="'/profile/' + post.name">
                <ProfilePicture :src="post.imageUrl" />
            </router-link>             
        </div>
        <div class="post-content">
            <router-link :to="'/profile/' + post.name">
                <FormattedUsername v-if="isReceived" :name="post.name" />
            </router-link>
            <br>
            <FormattedDate v-if="isReceived" :date="post.createdAt" />
            <hr>
            <PostContent :content="post.post_content" />
            <PostMedia :media="post.post_media" />
        </div>
    </div>
 
</template>

<script>

 
    import ProfilePicture from '@/components/general/ProfilePicture'
    import FormattedDate from '@/components/general/FormattedDate'
    import FormattedUsername from '@/components/general/FormattedUsername'
    import PostContent from '@/components/general/PostContent'
    import PostMedia from '@/components/general/PostMedia'

    export default {
        name: 'Post',
        components: { 
            ProfilePicture, FormattedDate, FormattedUsername, PostContent, PostMedia
        },
        props: ['id'],
        data () {
            return {
                post: {},
                isReceived: false
            }
        },
        async created(){
            const post = await fetch(process.env.VUE_APP_API_SERVER + `api/post?id=${this.id}`, {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include'
            })
            if (post.status == 200) {
                
                let answer = await post.json()
                this.post = {...answer.post, ...answer.user}

                this.isReceived = true
            }
        }
    }

</script>

<style scoped>
    
    #post-container {
        border-left: 2px solid white;
        background-color: #212529;
        text-align: left;
        color: white;
        border-bottom: 1px solid white;
        border-radius: 3px;
        padding: 32px;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr auto;
        column-gap: 1rem
    }

    #posts-body {
        border: 1px solid white;
        border-left: none;
        border-right: none;
        border-radius: 3px;
    }

    #post-container {
        border-bottom: 1px solid white;
        border-radius: 3px;
        padding: 32px;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr auto;
        column-gap: 1rem;
    }

    a {
        text-decoration: none;
        color: white;
    }

    .post-content a {
        font-weight: bold;
    }

    .post-content a:hover {
        text-decoration: underline;
    }

</style>