<template>
    <div id="posts">
        <div id="posts-body">
            <router-link :to="'/post/' + feed.id" v-for="feed in feeds" :key="feed.id">
                <article>
                    <div class="user-infos">
                        <router-link :to="'/profile/' + feed.name">
                            <ProfilePicture :src="feed.imageUrl" />
                            <div class="content-header">
                                <router-link :to="'/profile/' + feed.name">
                                    <span>{{ formattedUsername(feed.name) }}</span>
                                </router-link>
                                <span>{{ formattedCreatedAt(feed.createdAt) }}</span>
                            </div>
                        </router-link>         
                    </div>
                    <div class="post-content">
                        <hr>
                        <p v-if="!!feed.post_content">{{ feed.post_content }}</p>
                        <img v-if="!!feed.post_media" :src="feed.post_media">
                    </div>
                </article>
            </router-link>
        </div> 
    </div>
</template>

<script>

    import ProfilePicture from '@/components/general/ProfilePicture'

    export default {
        name: 'Post',
        components: {
            ProfilePicture
        },
        props: ['feeds'],
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
        }
    }

</script>

<style scoped>
    
    #posts {
        border-left: 2px solid white;
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

    #posts-body article a {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr auto;
        column-gap: 1rem;
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

</style>