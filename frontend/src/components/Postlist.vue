<template>
    <main id="main--container">
        <aside class="profile--preview">
            <div class="profile--preview__image">
                <img src="../assets/test_image.jpg" alt="profile picture" class="profile_picture">
            </div>
            <div class="profile--preview__text">
                <div class="profile--preview__info" @change="getUserInfo()">
                    <h3 class="firstName">{{firstName}}</h3>
                    <h2 class="lastName">{{lastName}}</h2>
                </div>
                <div class="profil--preview__link">
                    <router-link to="/Account" title="Account" class="toAccount">Mon compte</router-link>
                </div>
            </div>
        </aside>
        <section class="post--list">
            <div class="form--card">
                <div class="post--form">
                    <h2>A vous de partager!</h2>
                    <input type="text" placeholder="Titre" required v-model="postInput.title">
                    <input type="text" placeholder="Votre message ici" required v-model="postInput.content">
                    <input type="file" placeholder="Importez votre image" ref="imageUrl" accept="image/*">
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
            <div v-for="post in posts" :key="post.id" class="post--card">
                <div class="post--card__text">
                    <h2 class="post__title">{{post.title}}</h2>
                    <p class="post__author">{{post.User.firstName}} {{post.User.lastName}}</p>
                    <p class="post__date">{{post.createdAt}}</p>
                </div>
                <div class="post__image">
                    <img src="" alt="post image" class="post__picture">
                </div>
                <div class="post__content">
                    <p class="content">{{post.content}}</p>
                </div>
                <div class="post__command">
                    <div v-if="post.userId || isAdmin == true" @click="deletePost(post.id)" class="command__button">
                        <p>Supprimer</p>
                    </div>
                    <div v-if="post.userId || isAdmin == true" @click="showModal = true" class="command__button">
                        <p>Modifier</p>
                    </div>
                </div>
                <PostEdit v-show="showModal" :postId="post.id" />
                <div class="reply--bloc">
                    <Reply :postId="post.id" :postUserId="post.userId"/>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import Reply from './Reply.vue'
import PostEdit from './PostEdit.vue'
//import { ref } from 'vue'

export default {
    name:"Postlist",
    components:{
        Reply,
        PostEdit
    },
    data(){
        return {
            title: "",
            userId: sessionStorage.getItem('userId'),
            imageUrl: "",
            content: "",
            isAdmin: sessionStorage.getItem('isAdmin'),
            firstName:"",
            lastName:"",
            posts: [],
            postInput: {
                title:"",
                content:"",
                imageUrl: "",
            },
            showModal: false,
        }
    },
    mounted() {
        const url = "http://localhost:3000/api/posts";
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        };
        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            this.posts = data;
        })
        .catch(error => console.log(error));
    },
    methods: {
        deletePost(id){
            const url = "http://localhost:3000/api/posts/" + id;
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.posts = data;
                location.reload();
            })
            .catch(error => console.log(error));
        },
        sendPost(){
            //const file = ref(null);
            const postData = {
                "title": this.postInput.title,
                "content": this.postInput.content,
                //"imageUrl": this.$refs.imageUrl,
                "userId": sessionStorage.getItem("userId")
            }
            //console.log("ici" + file.value.files);
            const sendPostUrl = "http://localhost:3000/api/posts/new"
            const sendPostOptions = {
                method: "POST",
                body: JSON.stringify(postData),
                headers:{
                    'Content-type' : 'application/json',
                    'Authorization': 'Bearer'  + sessionStorage.getItem("token")
                },
            }
            fetch(sendPostUrl,sendPostOptions)
            .then(response => response.json())
            .then(data => {
                this.posts = data;
                location.reload();
            })
            .catch(error => console.log(error, "L'erreur vient du front"));
        },
        getUserInfo: function(){
            
            const url = "http://localhost:3000/api/auth/" + this.userId;
            const options = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.firstName = data.firstName;
                    this.lastName = data.lastName;
                })
                .catch(error => console.log(error,));
        },
    },
    created: function() {
        this.getUserInfo();
    },
}
</script>

<style lang="scss" scoped>
#main--container{
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: auto;
    .profile--preview{
        width: 20%;
        background-color: #FF4B2B;
        border-radius: 2rem;
        height: max-content;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        padding: 0.3rem;
    }
    .profile--preview__image{
        margin: auto;
        background-color: white;
        border-radius: 55px;
        width: 6rem;
        height: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .profile_picture{
            border-radius: 52px;
            width: 5.5rem;
            height: 5.5rem;
        }
    }
    .profile--preview__text{
        background-color: white;
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
        padding: 0.4rem 0 0.4rem 0;
        margin-top: 0.3rem;
        line-height: 2em;
        h3{
            color: #FF4B2B;
            font-size: 1.5em;
        }
        h2{
            color: #FF4B2B;
            font-size: 2em;
            font-weight: 800;
        }
        .toAccount{
            text-decoration: unset;
            color: #FF4B2B;
            border-radius: 1rem;
            padding: 0.5rem;
            &:hover{
                background-color: #FF4B2B;
                color: white;
            }

        }
    }
    .post--list{
        width: 80%;
        margin: auto;
        .post--card{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 40%;
            margin: auto;
            padding: 0.5rem;
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            border-radius: 1rem;
            .post--card__text{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                .post__title{
                    font-weight: 800;
                    font-size: 1.5em;
                }
                .post__author{
                    font-weight: 600;
                }
                .post__date{
                    font-size: 0.8em;
                    color: darkgrey;
                }
            }
            .post__picture{
                width: 40%;
                margin: 0.5rem;
            }
            .post__content{
                text-align: left;
            }
            .post__command{
                width: 95%;
                margin: 1rem auto 0.5rem auto;
                padding: 0 0.5rem 0 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .command__button{
                    background-color: #FF4B2B;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 1rem;
                    &:hover{
                        background-color: lighten($color: #FF4B2B, $amount: 10);
                        cursor: pointer;
                    } 
                }
                .far{
                    padding-left: 1rem;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .fa-thumbs-up:hover{
                    color: rgb(0, 197, 0);
                }
                .fa-thumbs-down:hover{
                    color: red;
                }
            }
        }
    }
}
.form--card{
    @extend .post--card;
    margin-bottom: 1.2rem!important;
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
.reply--bloc{
    width: 100%;
}
</style>