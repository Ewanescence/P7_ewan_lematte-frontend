<template>
    <ViewHeader :title="title" :page="page" />
</template>

<script>

    import ViewHeader from '@/components/general/ViewHeader'

    export default {
        name: 'Header',
        data() {
            return {
                page: 'home',
                title: 'Accueil'
            }
        },
        components: {
            ViewHeader
        }
    }

</script>