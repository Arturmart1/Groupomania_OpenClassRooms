<template>
    <div class="form--card">
        <div class="post--form">
            <h2>A vous de partager!</h2>
            <form name="newPost" id="newPost">
                <input type="text" placeholder="Titre" name="title" id="title" required v-model="title">
                <input type="text" placeholder="Votre message ici" name="content" id="content" required v-model="content">
                <input type="file" placeholder="Importez votre image" ref="imageUrl" name="image" id="imageUrl" accept="image/*">
            </form>
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
            title: "",
            content: "",
            imageUrl: "",
            userId: sessionStorage.getItem('userId'),
            posts:[],
        }
    },
    methods: {
        sendPost(){
            let input = document.getElementById('imageUrl');
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('content', this.content);
            formData.append('image', input.files[0]);
            formData.append('userId', this.userId);
            
            const url = 'http://localhost:3000/api/posts/new';
            const options = {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer' + sessionStorage.getItem("token")
                }
            }
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.posts.push(data);
                this.title = "";
                this.content = "";
                this.imageUrl = "";
                window.location.reload();
            })
            .catch(error => console.error(error))
        },
    }
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