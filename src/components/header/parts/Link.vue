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
    border-radius: 1.25rem;
}

a:hover {
    background-color:#2c2c2c;
    transition: 0.5s;
}

.fas {
      margin-right: 1rem;
}

</style>