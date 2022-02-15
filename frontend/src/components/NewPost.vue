<template>
    <div class="form--card">
        <div class="post--form">
            <h2>A vous de partager!</h2>
            <input type="text" placeholder="Titre" required v-model="postInput.title">
            <input type="text" placeholder="Votre message ici" required v-model="postInput.content">
            <input type="file" placeholder="Importez votre image" ref="imageUrl" name="imageUrl" accept="image/*">
        </div>
        <div class="command__center">
            <div class="command__button" @click.prevent="sendPost()">
                <p>Envoi</p>
            </div>
            <div class="command__button" >
                <p>Annuler</p>
            </div>
        </div>                
    </div>
</template>

<script>
export default {
    name: 'NewPost',
    data() {
        return {
            inputTitle: "",
            inputContent: "",
            imageUrl: "",
            posts:[],
            postInput:{
                title: "",
                content: "",
                //imageUrl: "",
                userId: sessionStorage.getItem('userId'),
            }
        }
    },
    methods: {
        sendPost(){
            let input = document.querySelector('input[type="file"]')
            let data = new FormData();
            data.append('title', this.postInput.title);
            data.append('content', this.postInput.content);
            data.append('imageUrl', input.files[0], input.files[0].name);
            data.append('userId', this.postInput.userId);
            fetch('http://localhost:3000/api/posts/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                this.posts.push(data)
                this.inputTitle = ""
                this.inputContent = ""
                this.imageUrl = ""
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.form--card{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 40%;
    margin: auto auto 1.5rem auto;
    padding: 0.5rem;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    border-radius: 1rem;
    .post--form{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        width: 95%;
        margin: auto;
    }
    .command__center{
        width: 95%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.5rem auto 0.5rem auto;
        .command__button{
            background-color: #FF4B2B;
            color: white;
            width: 5rem;
            margin-top: 0.8rem;
            padding: 0.5rem;
            border-radius: 1rem;
            &:hover{
                background-color: lighten($color: #FF4B2B, $amount: 10);
                cursor: pointer;
            }
        }
    }
    h2{
        padding: 0.5rem 0 0.5rem 0;
        font-size: 1.2em;
        font-weight: 600;
    }
    input{
        background-color: #eee;
        border: none;
        width: 90%;
        padding: 0.5rem;
        margin: 0.5rem auto 0.5rem auto;
    }
}
</style>