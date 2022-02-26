<template>
    <main id="main--container">
        <aside class="profile--preview">
            <div class="profile--preview__image">
                <img :src="imageUrl" alt="profile picture" class="profile_picture">
            </div>
            <div class="profile--preview__text">
                <div class="profile--preview__info" @change="getUserInfo()">
                    <h3 class="firstName">{{firstName}}</h3>
                    <h2 class="lastName">{{lastName}}</h2>
                </div>
                <div class="profil--preview__link">
                    <router-link to="/Account" title="Account" class="toAccount" aria-label="Mon compte">Mon compte</router-link>
                </div>
            </div>
        </aside>
        <section class="post--list">
            <div class="form--card">
                <NewPost/>              
            </div>
            <div v-for="post in posts" :key="post.id" class="post--card">
                <div class="post--card__text">
                    <h2 class="post__title">{{post.title}}</h2>
                    <p class="post__author">{{post.User.firstName}} {{post.User.lastName}}</p>
                    <p class="post__date">{{new Date(post.createdAt).toLocaleString("fr-FR", {timeZone:"UTC"})}}</p>
                </div>
                <div class="post__image">
                    <img :src="post.imageUrl" alt="post image" class="post__picture" v-if="post.imageUrl != undefined">
                </div>
                <div class="post__content">
                    <p class="content">{{post.content}}</p>
                </div>
                <div class="post__command" v-if="post.UserId == userId || this.isAdmin == 'true'">
                    <div @click="deletePost(post.id)" class="command__button">
                        <p>Supprimer</p>
                    </div>
                    <div @click="editPost(post.id)" class="command__button">
                        <p>Modifier</p>
                    </div>
                </div>
                <div class="reply--bloc">
                    <Reply :postId="post.id" :postUserId="post.UserId"/>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import Reply from './Reply.vue'
import NewPost from './NewPost.vue'

export default {
    name:"Postlist",
    components:{
        Reply,
        NewPost,
    },
    data(){
        return {
            userId: sessionStorage.getItem('userId'),
            isAdmin: sessionStorage.getItem('isAdmin'),
            firstName:"",
            lastName:"",
            imageUrl: "",
            posts: [],
        }
    },
    mounted() {
        const url = "http://localhost:3000/api/posts";
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
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
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
            };
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.posts = data;
                window.location.reload();
            })
            .catch(error => console.log(error));
        },
        getUserInfo: function(){
            
            const url = "http://localhost:3000/api/auth/user/" + this.userId;
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
                    this.imageUrl = data.imageUrl;
                })
                .catch(error => console.log(error,));
        },
        editPost(postId){
            this.$router.push({
                path: "/PostEdit/" + postId
            });
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
    .profil--preview__link{
        margin-top: 0.8rem;
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
            margin: auto auto 1.5rem auto;
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
                width: 90%;
                margin: auto;
                padding: 0.5rem;
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
            }
        }
    }
}
.reply--bloc{
    width: 100%;
}
@media only screen and (max-width: 1000px){
    .profile--preview__info{
        h2{
            font-size: 1.2em!important;
        }
        h3{
            font-size: 1em!important;
        }
    }
}
@media only screen and (max-width: 400px){
    aside{
        display: none;
    }
    #main--container{
        width: 95%;
        margin: unset;
        .form--card{
            width: 100%;
        }
        .post--card{
            width: 100%!important;
            
        }
        .post--list{
            padding-bottom: 2rem;
        }
    }
}
</style>