<template>
    <div class="form--card">
        <div class="post--form">
            <div>
                <h2>Modification</h2>
            </div>
            <div>
                <form name="editPost" id="editPost">
                    <input type="text" placeholder="{{title}}" required v-model="postInput.title">
                    <input type="text" placeholder="{{content}}" required v-model="postInput.content">
                    <input type="file" placeholder="Importez votre image" ref="imageUrl" name="image" id="imageUrl" accept="image/*">
                </form>
            </div>
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
            let input = document.getElementById('imageUrl');
            let formData = new FormData();
            formData.append('title', this.postInput.title);
            formData.append('content', this.postInput.content);
            formData.append('image', input.files[0]);

            const url = "http://localhost:3000/api/posts/" + id;
            const options = {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.posts.push(data);
                    this.postInput.title = "";
                    this.postInput.content = "";
                    this.postInput.imageUrl = "";
                    alert("Votre post a bien été modifié");
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
    width: 70%;
    height: 25vh;
    margin: auto;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    form{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 1rem;
        input{
            margin: 0.5rem;
            border: unset;
            border-bottom: #FF4B2B 1px solid;
            &:focus{
                outline: none;
            }
        }
    }
    h2{
        font-size: 1.5em;
        font-weight: 600;
    }
    .command__center{
        width: 80%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .command__button{
            background: #FF4B2B;
            color: white;
            font-size: 1.3em;
            font-weight: 500;
            padding: 1rem;
            width: 5rem;
            border-radius: 1rem;
            &:hover{
                cursor: pointer;
                animation: jelly 0.5s
            }
        }
    }
}
@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>