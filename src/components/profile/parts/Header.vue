<template>
    <ViewHeader :title="title" :page="page" />
</template>

<script>

    import ViewHeader from '@/components/general/ViewHeader'

    export default {
        name: 'Header',
        data() {
            return {
                page: 'profile',
                title: 'Profil'
            }
        },
        components: {
            ViewHeader
        }
    }

</script>