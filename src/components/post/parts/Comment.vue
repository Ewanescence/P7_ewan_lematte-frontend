<template>
    <div id="comments">
        <div id="comments-body">
            <article v-for="feed in feeds" :key="feed.id">
                <div class="user-infos">
                    <router-link :to="'/profile/' + feed.name">
                        <ProfilePicture :src="feed.imageUrl" />
                    </router-link>         
                </div>
                <div class="comment-content">
                    <router-link :to="'/profile/' + feed.name">
                        <FormattedUsername :name="feed.name" />
                    </router-link>
                    <br>
                    <FormattedDate :date="feed.createdAt" />
                    <hr>
                    <PostContent :content="feed.comment_content" />
                    <PostMedia :media="feed.comment_media" />
                </div>
            </article>
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
        name: 'Comment', 
        components: {
            ProfilePicture, FormattedUsername, FormattedDate, PostContent, PostMedia
        },
        props: ['id'],
        data () {
            return {
                feeds: [],
                comments: [],
                author: [],
            }
        },
        async mounted(){
            const comments = await fetch(process.env.VUE_APP_API_SERVER + `api/comments?id=${this.id}`, {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include'
            })    
            if (comments.status == 200) {
                this.comments = await comments.json()
                this.comments.forEach( async (comment) => {
                    const author = await fetch(process.env.VUE_APP_API_SERVER + 'api/author', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify(comment)
                    })
                    this.author = await author.json()
                    var obj = {...comment, ...this.author}
                    await this.feeds.push(obj)
                })
            }
        },
    }

</script>

<style scoped>
    
    #comments {
        border-left: 2px solid white;
        background-color: #212529;
        text-align: left;
        color: white;
        height: 100%;
    }

    #comments-body {
        border: 1px solid white;
        border-left: none;
        border-right: none;
        border-radius: 3px;
    }

    #comments-body article {
        display: grid;
        padding: 32px;
        border-bottom: 1px solid white;
        grid-template-columns: auto 1fr;
        border-radius: 3px;
        column-gap: 1rem;
        grid-template-rows: auto 1fr auto;
    }

    a {
        text-decoration: none;
        color: white;
        font-weight: bold;
    }

    .comment-content a:hover {
        text-decoration: underline;
    }

</style>