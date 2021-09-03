<template>
  <div id="profile">
    <Header />
    <User :imageUrl="user.imageUrl" :username="username" />
    <Post :user="user" :username="username" />
  </div>
</template>

<script>

import Header from '@/components/profile/parts/Header'
import User from '@/components/profile/parts/User'
import Post from '@/components/profile/parts/Post'

export default {
  name: 'Profile',
  components: {
    Header, User, Post
  },
  data() {
      return {
        user: [],
        username: ''
      }
  },
  async mounted(){

        const user = await fetch(process.env.VUE_APP_API_SERVER + 'api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
        })
        
        if (user.status == 200) {
            let data = await user.json()
            this.user = data
            this.username = data.name[0].toUpperCase() + data.name.substring(1);
        } 
    },
}
</script>

<style>

  #profile {
    display: grid;
    grid-template-rows: 100px auto 1fr;
  }

</style>