<template>
  <div id="profile">
    <Header />
    <User v-if="isReceived" :user="user" />
    <Post :posts="posts" :user="user"/>
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
        isReceived: false
      }
  },
  mounted(){
        axios
        .get(process.env.VUE_APP_API_SERVER + `api/getProfile?username=${this.username}`, {
          headers: {'Content-Type': 'application/json'},
        })
        .then((user) => {
          this.user = user.data
          axios
          .get(process.env.VUE_APP_API_SERVER + `api/postsFrom?id=${user.data.id}`, {
            headers: {'Content-Type': 'application/json'},
          })
          .then((posts) => {
            this.posts = posts.data
            this.isReceived = true
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
</script>

<style>

  #profile {
    display: grid;
    grid-template-rows: 100px auto 1fr;
  }

</style>