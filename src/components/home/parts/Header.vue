<template>
    <div id="home-header" class="p-3 px-2 bg-dark text-white">
        <div id="header-container">
            <i class="fas fa-arrow-left"></i>
            <h1>| Accueil</h1>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Header',
    }

</script>

<style scoped>

#home-header {
    display: flex;
    border-left: 2px solid white;
}

#header-container{
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-column-gap: 1rem;
    margin-left: 2rem;
    align-items: baseline;
    align-content: center;
}

#header {
    margin-left: 1rem;
}

h1 {
    font-size: 24px;
    margin-bottom: -8px;
}

</style>