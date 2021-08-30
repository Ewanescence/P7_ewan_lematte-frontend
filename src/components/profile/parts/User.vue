<template>
    <div id="profile-user">
        <div id="banner">    
        </div>
        <div id="infos">
            <div id="infos-header">
                <div id="header-pic">
                    <div id="pic-container">
                        <img id="user-pic" :src="imageUrl">
                    </div>
                </div>
                <div id="header-settings">
                    <button type="button" class="btn btn-outline-light" @click="showModal"><i class="fas fa-user-cog"></i> Editer mon profil</button>
                    <Modal v-if="modal" @close="showModal" />
                </div>
            </div>
            <div id="infos-body">
                <div id="user-name">
                    <span>{{ formattedUsername }}</span>
                </div>
                <hr>
                <div id="user-desc">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptas reiciendis ratione iste, ullam nihil voluptatum nulla distinctio perferendis dolorem ad odit omnis dolores pariatur, corporis explicabo provident quia a?</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Modal from '@/components/profile/parts/Modal'

    export default {
        name: 'User',
        props: ['imageUrl', 'username'],
        components: {
            Modal
        },
        data() {
        return {
                modal: false
            }
        },
        computed: {
            formattedUsername: function () {
                const username = this.username
                return '@' + username
            }
        },
        methods: {
            showModal() {
                switch (this.modal) {
                    case true: 
                        this.modal = false
                        break
                    case false:
                        this.modal = true
                        break
                }
            }
        }
    }

</script>

<style scoped>

#profile-user {
    padding-top: 1rem;
    padding-right: 1rem;
    padding-left: 1rem;
    border-left: 2px solid white;
    background-color: #212529;
}

#banner {
    height: 256px;
    background-color: red;
    border-radius: 2px;
    border: 2px solid white;
}

#infos {
    display: grid;
    grid-template-rows: auto auto 1fr;
    row-gap: 1rem;
}

#infos-header {
    grid-row: 1/2;
    display: flex;
    justify-content: space-between;
}

#header-pic {
    position: relative;
}

#pic-container {
    margin: 0 auto;
    height: 50px;
}

#user-pic {
    position: absolute;
    top: -82px;
    left: 32px;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    border: 2px solid white;
}

#user-desc {
    max-width: 512px;
}

#header-settings {
    padding-top: 0.5rem;
}

#infos-body{
    grid-row: 2/3;
    padding-left: 32px;
    color: white;
    display: flex;
    row-gap: 1rem;
    text-align: left;
    flex-direction: column;
}

</style>