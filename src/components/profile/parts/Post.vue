<template>
    <div id="posts">
        <div id="posts-body">
            <router-link :to="'/post/' + post.id" v-for="post in posts" :key="post.id">
                <article>
                    <div class="user-infos">
                        <router-link :to="'/profile/' + user.name">
                            <ProfilePicture :src="user.imageUrl" />
                            <div class="content-header">
                                <router-link :to="'/profile/' + user.name">
                                    <FormattedUsername :name="user.name" />
                                </router-link>
                                    <FormattedDate :date="post.createdAt" />
                            </div>
                        </router-link>         
                    </div>
                    <div class="post-content">
                        <hr>
                        <PostContent :content="post.post_content" />
                        <PostMedia :media="post.post_media" />
                    </div>
                </article>
            </router-link>
        </div> 
    </div>
</template>

<script>

    import ProfilePicture from '@/components/general/ProfilePicture'
    import FormattedUsername from '@/components/general/FormattedUsername'
    import FormattedDate from '@/components/general/FormattedDate'
    import PostContent from '@/components/general/PostContent'
    import PostMedia from '@/components/general/PostMedia'

    export default {
        name: 'Post',
        components: {
            ProfilePicture, FormattedUsername, FormattedDate, PostContent, PostMedia
        },
        props: ['posts', 'user'],
    }

</script>

<style scoped>
    
    #posts {
        border-left: 2px solid white;
        background-color: #212529;
        text-align: left;
        border-bottom: none;
    }

    #posts-body {
        border-top: 2px solid white;
        border-bottom: none;
        border-left: none;
        border-right: none;
    }

    .user-infos {
        display: flex;
    }

    #posts-body article {
        border-bottom: 1px solid white;
        border-radius: 3px;
        padding: 32px;
        padding-left: 3rem;
    }

    #posts-body article:hover {
        background-color: #2c2c2c;
        transition: 0.5s;
    }

    #posts-body article a {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr auto;
        column-gap: 1rem;
    }

    a {
        text-decoration: none;
        color: white;
    }

    .content-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

</style>