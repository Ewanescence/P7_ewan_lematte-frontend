<template>
    <div id="profile-user">
        <img id="banner" v-if="user.bannerUrl" alt="Bannière du profil" :src="bannerUrl">
        <div id="banner" v-else></div>
        <div id="infos">
            <div id="infos-header">
                <div id="header-pic">
                    <div id="pic-container">
                        <ProfilePicture :src="user.imageUrl" :width="128" :height="128" />
                    </div>
                </div>
            </div>
            <div id="infos-body">
                <div id="user-name">
                    <FormattedUsername :name="user.name" />
                    <div id="header-settings">
                    <button v-if="isOwner" aria-label="Personnalisation" type="button" class="btn btn-outline-light" @click="showModal"><i class="fas fa-user-cog"></i></button>
                    <Modal v-if="modal && isOwner" @close="showModal" :user="user" />
                </div>
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
        props: ['user', 'isOwner'],
        components: {
            Modal, ProfilePicture, FormattedUsername
        },
        data() {
        return {
                modal: false
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
        },
        computed: {
            bannerUrl() {
                return process.env.VUE_APP_API_SERVER + this.user.bannerUrl
            }
        }
    }

</script>

<style scoped>

    #profile-user {
        background-color: #212529;
    }

    #banner {
        height: 128px;
        object-fit: cover;
        width: 100%;
        background-color: red;
    }

    #infos {
        padding: 1rem;
    }

    #header-pic {
        position: relative;
    }

    #pic-container {
        margin: 0 auto;
        height: 50px;
    }

    #user-name {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    #user-name span:hover {
        text-decoration: none;
    }

    .user-pic {
        position: absolute;
        bottom: 0.5rem;
        left: 1rem;
        border: 4px solid #212529;
    }

    #user-desc {
        max-width: 512px;
    }

    #header-settings {
        padding-top: 0.5rem;
    }

    #infos-body{
        grid-row: 2/3;
        color: white;
        row-gap: 1rem;
        text-align: left;
    }

    @media screen and (min-width: 640px) { 
        #profile-user {
            border-left: 2px solid white;
        }

        #infos-body {
            padding-left: 32px;
        }

        #banner {
            height: 256px;
        }
    }

    @media screen and (max-width: 640px) { 
        .user-pic {
            width: 64px;
            height: 64px;
            bottom: 0.75rem;
            left: 0.15rem;
        }

        #pic-container {
            height: 25px;
        }

        #user-name {
            height: 25px;
        }
    }

</style>