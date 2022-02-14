<template>
    <div class="form--card">
        <div class="post--form">
            <h2>A vous de partager!</h2>
            <input type="text" placeholder="{{title}}" required v-model="postInput.title">
            <input type="text" placeholder="{{content}}" required v-model="postInput.content">
            <input type="file" placeholder="Importez votre image" ref="imageUrl" accept="image/*">
        </div>
        <div class="command__center">
            <div class="command__button" @click.prevent="updatePost(postInput.postId)">
                <p>Envoi</p>
            </div>
            <div class="command__button" @click="goback()">
                <p>Annuler</p>
            </div>
        </div>                
    </div>
</template>

<script>
export default {
    name: 'EditForm',
    components: {
    },
    data(){
        return {
            userId : sessionStorage.getItem('userId'),
            isAdmin: sessionStorage.getItem('isAdmin'),
            title:"",
            content:"",
            posts: [],
            postInput: {
                title: "",
                content: "",
                imageUrl: "",
                postId: "",
            },
        }
    },
    mounted() {
        const postId = this.$route.params.id;
        const url = "http://localhost:3000/api/posts/" + postId;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.postInput.title = data.title;
                this.postInput.content = data.content;
                this.postInput.imageUrl = data.imageUrl;
                this.postInput.postId = data.id;
            })
            .catch(error => console.error(error));
    },
    methods: {
        updatePost(id){
            const url = "http://localhost:3000/api/posts/" + id;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify(this.postInput)
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.posts = data;
                    this.$router.push('/Home');
                })
                .catch(error => console.error(error));
        },
        goback(){
            this.$router.push('/Home');
        },
    }
}
</script>

<style lang="scss" scoped>
.form--card{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.post--form{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.command__center{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.command__button{
    width: 100px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #FF4B2B;
    color: white;
}
</style>