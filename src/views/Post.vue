<template>
    <div class="posts">
        <div v-for="post in posts" v-bind:key="post">
            {{ post.post_title}} : {{ post.post_content }} : {{ post.user_id }}
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Post',
  components: {
  },
  data() {
      return {
          posts: []
      }
  },
  mounted () {
      axios
        .get('http://localhost:3000/post')
        .then(response => (this.posts = response.data))
  }
}
</script>