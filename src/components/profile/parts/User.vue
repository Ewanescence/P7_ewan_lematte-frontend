<template>
    <div id="profile-user">
        <div id="banner" v-if="user.bannerUrl" :style="{ 'background-image': 'url(' + user.bannerUrl + ')' }"></div>
        <div id="banner" v-else></div>
        <div id="infos">
            <div id="infos-header">
                <div id="header-pic">
                    <div id="pic-container">
                        <ProfilePicture :src="user.imageUrl" />
                    </div>
                </div>
                <div id="header-settings">
                    <button type="button" class="btn btn-outline-light" @click="showModal"><i class="fas fa-user-cog"></i></button>
                    <Modal v-if="modal" @close="showModal" :user="user" />
                </div>
            </div>
            <div id="infos-body">
                <div id="user-name">
                    <FormattedUsername :name="user.name" />
                </div>
                <hr>
                <div id="user-desc">
                    <p>{{ user.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Modal from '@/components/profile/parts/Modal'
    import ProfilePicture from '@/components/general/ProfilePicture'
    import FormattedUsername from '@/components/general/FormattedUsername'

    export default {
        name: 'User',
        props: ['user'],
        components: {
            Modal, ProfilePicture, FormattedUsername
        },
        data() {
        return {
                modal: false,
                isReceived: false
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
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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

#user-name span:hover {
    text-decoration: none;
}

.user-pic {
    position: absolute;
    top: -82px;
    left: 32px;
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