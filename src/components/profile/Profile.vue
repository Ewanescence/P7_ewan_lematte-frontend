<template>
  <div id="profile">
    <Header />
    <User v-if="isReceived" :user="user" :isOwner="isOwner" />
    <Post :posts="posts" :user="user" :isOwner="isOwner" />
  </div>
</template>

<script>

import Header from '@/components/profile/parts/Header'
import User from '@/components/profile/parts/User'
import Post from '@/components/profile/parts/Post'

import axios from 'axios'

export default {
  name: 'Profile',
  components: {
    Header, User, Post
  },
  props: ['username'],
  data() {
      return {
        user: [],
        posts: [],
        isReceived: false,
        isOwner: false
      }
  },
  async mounted(){
        
        axios
        .get(process.env.VUE_APP_API_SERVER + `api/user/?username=${this.username}`, {
          headers: {'Content-Type': 'application/json'},
        })
        .then(async (user) => {
          
          this.user = user.data
          
          axios
          .get(process.env.VUE_APP_API_SERVER + `api/posts/user?id=${user.data.id}`, {
            headers: {'Content-Type': 'application/json'},
          })
          .then((posts) => {
            this.posts = posts.data
            this.isReceived = true
          })
          .catch((error) => {
            console.log(error)
          })
          

          const owner = await fetch(process.env.VUE_APP_API_SERVER + `api/user/owner?id=${user.data.id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
          })

          this.isOwner = owner.ok

        })
      .catch((error) => {
        console.log(error)
      })

  
    }
}
</script>

<style>

  #profile {
    display: grid;
    grid-template-rows: auto auto 1fr;
  }

</style>