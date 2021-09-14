<template>
    <li>
        <router-link :to="url" isExactActive>
            <i :class="icon"></i> {{ text }}
        </router-link>
    </li>
</template>

<script>

export default {
    name: "Link",
    props: ['url', 'icon', 'text'],
}

</script>

<style scoped>

    a {
        display: flex;
        text-decoration: none;
        color: white;
        align-items: baseline;
        font-size: 1.25rem;
        column-gap: 1rem;
    }


    .router-link-exact-active {
            color: #dc3545;
    }

</style>