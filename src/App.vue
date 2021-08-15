<template>

    <Header/>

    <main class="form-signin">
      <router-view />
    </main>

</template>

<script>

  import Header from '@/components/Header'

  export default {
    components: {Header}
  }

</script>

<style lang="scss">
 
  // app

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  // sign-in

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }

</style>

