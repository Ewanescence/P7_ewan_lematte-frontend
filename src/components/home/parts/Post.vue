<template>
    <div id="posts">
        <div id="posts-body">
            <article v-for="feed in feeds" :key="feed.id">
                <div id="user-infos">
                    <router-link :to="feed.name">
                        <img id="user-pic" :src="feed.imageUrl">
                    </router-link>         
                </div>
                <div id="post-content">
                    <router-link :to="feed.name">
                        <span>{{ formattedUsername(feed.name) }}</span>
                    </router-link>
                    <br> 
                    <span>{{ formattedCreatedAt(feed.createdAt) }}</span>
                    <hr>
                    <p v-if="!!feed.post_content">{{ feed.post_content }}</p>
                    <img v-if="!!feed.post_media" :src="feed.post_media">
                </div>
            </article>
        </div> 
    </div>
</template>

<script>

    export default {
        name: 'Post', 
        data () {
            return {
                feeds: [],
                posts: [],
                author: [],
            }
        },
        methods: {
            formattedUsername(name) {
                const username = name[0].toUpperCase() + name.substring(1)
                return username
            },
            formattedCreatedAt(createdAt) {
               
                const date = createdAt.split('T')
                const splitDate = date[0].split('-')
                const splitTime = date[1].split(':')
                
                const splitedDate = {
                    'year': splitDate[0],
                    'month': splitDate[1],
                    'day': splitDate[2],
                    'hours': splitTime[0],
                    'minutes':splitTime[1],
                    'seconds': splitTime[2].substring(0,2)
                }

                let month = ''
                switch (splitedDate.month) {
                    case '01':
                        month = ' janvier'
                        break
                    case '02':
                        month = ' février'
                        break
                    case '03':
                        month = ' mars'
                        break
                    case '04':
                        month = ' avril'
                        break
                    case '05':
                        month = ' mai'
                        break
                    case '06':
                        month = ' juin'
                        break
                    case '07':
                        month = ' juillet'
                        break
                    case '08':
                        month = ' août'
                        break
                    case '09':
                        month = ' septembre'
                        break
                    case '10':
                        month = ' octobre'
                        break
                    case '11':
                        month = ' novembre'
                        break
                    case '12':
                        month = ' décembre'
                        break
                }


                return 'le ' + splitedDate.day + month + ' à ' + splitedDate.hours + ':' + splitedDate.minutes 
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

    a {
        text-decoration: none;
        color: white;
        font-weight: bold;
    }

</style>