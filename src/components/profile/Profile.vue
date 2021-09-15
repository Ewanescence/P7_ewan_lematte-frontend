<template>
  <div id="profile">
    <Header />
    <User v-if="isReceived" :user="user" :isOwner="isOwner" />
    <ContentMenu :posts="displayPosts" :comments="displayComments" @posts="section('posts')" @comments="section('comments')"/>
    <Post v-if="displayPosts" :posts="posts" :user="user" :isOwner="isOwner" />
    <Comment v-if="displayComments" :comments="comments" :user="user" :isOwner="isOwner" />
  </div>
</template>

<script>

import Header from '@/components/profile/parts/Header'
import User from '@/components/profile/parts/User'
import ContentMenu from '@/components/profile/parts/ContentMenu'
import Post from '@/components/profile/parts/Post'
import Comment from '@/components/profile/parts/Comment'

import axios from 'axios'

export default {
  name: 'Profile',
  components: {
    Header, User, ContentMenu, Post, Comment
  },
  props: ['username'],
  data() {
      return {
        user: [],
        posts: [],
        comments: [],
        isReceived: false,
        isOwner: false,
        displayPosts: true,
        displayComments: false
      }
  },
  async mounted(){
        axios
        .get(process.env.VUE_APP_API_SERVER + `api/user/?username=${this.username}`, {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        })
        .then(async (user) => {
          
          this.user = user.data
          
          axios
          .get(process.env.VUE_APP_API_SERVER + `api/posts/user?id=${user.data.id}`, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
          })
          .then((posts) => {
            this.posts = posts.data
            this.isReceived = true
          })
          .catch((error) => {
            console.log(error)
          })

          axios
          .get(process.env.VUE_APP_API_SERVER + `api/comments/user?id=${user.data.id}`, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
          })
          .then((comments) => {
            this.comments = comments.data
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
    },
    methods: {
            section(arg) {
              switch (arg) {
                case 'posts':
                  if (this.displayComments) {
                    this.displayPosts = true
                    this.displayComments = false
                  }
                  break
                case 'comments':
                  if (this.displayPosts) {
                    this.displayPosts = false
                    this.displayComments = true
                  }
                  break  
              }
              console.log(this.displayPosts)
              console.log(this.displayComments)
            }
        }
}
</script>

<style>

  #profile {
    display: grid;
    grid-template-rows: auto auto auto 1fr;
  }

</style>