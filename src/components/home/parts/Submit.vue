<template>
    <div id="home-submit">
        <form method="post" @submit.prevent="submit">
            <label for="content"></label>
            <textarea :placeholder="placeholder" type="content" id="content" v-model="post.content"/>
            <button id="submit" class="btn btn-outline-light me-2" type="submit" @click.prevent="submit">Publier</button>
        </form>
    </div>
</template>

<script>

    export default {
        name: 'Submit',
        data() {
            return {
                user: {},
                post: {
                    content: '',
                    user_id: '',
                },
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
                this.post.user_id = data.id
            }
        },
        methods: {
            submit() {
                fetch('http://localhost:3000/api/publish', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.post)
                });
                window.location.reload()
            }
        },
        computed: {
            placeholder() {
                return 'Quoi de neuf ' + this.user.name + ' ?'
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