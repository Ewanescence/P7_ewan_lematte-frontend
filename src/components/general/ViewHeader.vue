<template>
    <div id="header" class="p-3 px-2 bg-dark text-white">
        <div id="header__container">
            <a v-if="!isHomepage" @click="$router.go(-1)">
                <i class="fas fa-arrow-left"></i>
            </a>
            <h1 v-if="isHomepage">{{ title }}</h1>
            <h1 v-else> | {{ title }}</h1>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ViewHeader',
        props: ['title', 'page'],
        computed: {
            isHomepage() {
                if (this.page == 'home') {
                    return true
                } else {
                    return false
                }
            }
        }
    }

</script>

<style scoped>

#header {
    display: flex;
    border-left: 2px solid white;
    border-bottom: 2px solid white;
}

#header__container{
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-column-gap: 1rem;
    margin-left: 2rem;
    align-items: baseline;
    align-content: center;
}

h1 {
    font-size: 24px;
    margin-bottom: -8px;
}

a {
    cursor: pointer;
}

</style>