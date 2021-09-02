<template>
    <div id="home-submit">
        <form method="post" @submit.prevent="submit">
            <label for="content"></label>
            <textarea :placeholder="placeholder" type="content" id="content" v-model="post.content"/>
            <div id="media">
                <input hidden name="image" ref="file" type="file" @change="readURL">
                <img v-if="post.media.url" id="preview" :src="post.media.url" alt="" />
                <button class="btn btn-outline-light me-2" @click.prevent="selectFile" ><i class="fas fa-photo-video"></i></button>
            </div>
            <button id="submit" class="btn btn-outline-light me-2" type="submit" @click.prevent="submit">Publier</button>
        </form>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        name: 'Submit',
        data() {
            return {
                user: {
                    name: ''
                },
                post: {
                    content: '',
                    media: {
                        url: '',
                        name: '',
                    },
                    user_id: ''
                },
                file: null
            }
        },
        async mounted(){

            const user = await fetch('http://localhost:3000/api/user', {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include'
            })
            
            if (user.status == 200) {
                let data = await user.json()
                this.user = data
                this.user.name = data.name[0].toUpperCase() + data.name.substring(1)
                this.post.user_id = data.id

            }
        },
        methods: {
            submit() {

                const data = new FormData()

                data.append("content", this.post.content)
                data.append("user_id", this.post.user_id)
                
                if (this.file !== null) {
                    data.append("image", this.file, this.file.name)
                }
                
                axios
                .post("http://localhost:3000/api/publish/", data, {
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
                })
                .then(() => {
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })

            },
            selectFile(){
                let fileInputElement = this.$refs.file
                fileInputElement.click()
            },
            readURL(e) {
                const file = e.target.files[0];
                this.post.media.url = URL.createObjectURL(file);
                this.file = this.$refs.file.files[0];
            }
        },
        computed: {
            placeholder() {
                return 'Quoi de neuf ' + this.user.name + ' ? 😎'
            }
        }
        
    }

</script>

<style scoped>

#home-submit {
    padding-top: 1rem;
    border-left: 2px solid white;
    background-color: #212529;
    height: 256px;
}

#home-submit form{
    position: relative;
    height: 100%;
}

#submit {
    position: absolute;
    bottom: 32px;
    right: 32px;
}

#media {
    position: absolute;
    bottom: 32px;
    left: 32px;
}

#preview {
    position: absolute;
    bottom: 0;
    left: 64px; 
    width: 64px;
    height: 64px;
    border: 2px solid white;
    border-radius: 2px;
}

#content {
    width: 100%;
    background-color: rgb(33, 37, 41);
    color: white;
    resize: none;
    padding: 2rem;
    border-left: none;
    border-right: none;
    height: 100%;
}

::placeholder {
    color: white;
}

</style>