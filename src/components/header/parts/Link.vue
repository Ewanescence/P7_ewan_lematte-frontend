<template>
    <li>
        <router-link :to="url"><i :class="icon"></i>{{ text }}</router-link>
    </li>
</template>

<script>

export default {
    name: "Link",
    props: ['url', 'icon', 'text'],
}

</script>

<style scoped>

li {
    display: grid;
    grid-template-rows: auto auto;
    grid-row-gap: 0.5rem;
    justify-content: start;
}

a {
    display: flex;
    text-decoration: none;
    color: white;
    align-items: baseline;
    font-size: 1.25rem;
    padding: 1rem;
}

a:hover {
    border-radius: 1.25rem;
    border: 2px solid white;
}

.fas {
      margin-right: 1rem;
}

</style>