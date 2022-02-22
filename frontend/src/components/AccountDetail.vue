<template>
    <main id="main--container">
        <aside class="profile--preview">
            <div class="profile--preview__image">
                <img :src="imageUrl" alt="profile picture" class="profile_picture">
            </div>
            <div class="profile--preview__text">
                <div class="profile--preview__info">
                    <h3 class="firstName">{{firstName}}</h3>
                    <h2 class="lastName">{{lastName}}</h2>
                    <button @click="deletePersonnalAccount()" class="accountbutton">Supprimez votre compte</button>
                </div>
            </div>
        </aside>
        <section id="main--section" v-if="this.isAdmin === 'true'">
            <div class="list-container">
                <div>
                    <h2>Liste des utilisateurs</h2>
                </div>
                <div class="user--list" v-for="user in users" :key="user.id">
                    <div>
                        <p>{{user.firstName}} {{user.lastName}}</p>
                    </div>
                    <div class="delete__user">
                        <button @click="adminDeleteUser(user.id)">Supprimer</button>
                    </div>
                </div>
            </div>
            <div class="list-container">
                <div>
                    <h2>Derniers messages</h2>
                </div>
                <div class="post--list" v-for="post in posts" :key="post.id">
                    <div>
                        <h3>{{post.title}}</h3>
                    </div>
                    <div class="delete__post">
                        <button @click="adminDeletePost(post.id)">Supprimer</button>
                    </div>
                </div>
            </div>
            <div class="list-container">
                <div>
                    <h2>Derniers commentaires</h2>
                </div>
                <div class="comment--list" v-for="comment in comments" :key="comment.id">
                    <div>
                        <p> {{comment.content}} </p>
                    </div>
                    <div class="delete__comment">
                        <button @click="adminDeleteComment(comment.id)">Supprimer</button>
                    </div>
                </div>
            </div>
            <EditAccount :userId="this.userId"/>
        </section>
        <section id="main--section__noAdmin" v-else>
            <EditAccount :userId="this.userId"/>
        </section>
    </main>
</template>

<script>
import EditAccount from './EditAccount.vue'

export default {
    name: 'AccountDetail',
    components:{
        EditAccount,
    },
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            isAdmin: sessionStorage.getItem('isAdmin'),
            firstName: "",
            lastName: "",
            imageUrl: "",
            posts: [],
            comments: [],
            users: [],
        }
    },
    mounted() {

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
            .catch(error => console.log(error));
    },
    methods:{
        deletePersonnalAccount(){
            const url = "http://localhost:3000/api/auth/delete/" + this.userId;
            const options = {
                method: "DELETE",
                headers: {
                    "Authorization" : "Bearer " + sessionStorage.getItem('token')
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.users = data;
                    alert("Votre compte a bien été supprimé, vous allez être redirigé vers la page d'accueil");
                    sessionStorage.clear();
                    this.$router.push('/');
                })
                .catch(error => console.log(error));
        },
        getAllPost: function(){
            const url = "http://localhost:3000/api/posts/"
            const options = {
                method: "GET",
                headers: {
                    'Authorization' : "Bearer " + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.posts = data;
                })
                .catch(error => console.log(error));
        },
        getAllUsers: function(){
            const url = "http://localhost:3000/api/auth/allusers/"
            const options = {
                method: "GET",
                headers: {
                    'Authorization' : "Bearer " + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.users = data;
                })
                .catch(error => console.log(error));
        },
        getAllComments: function(){
            const url = "http://localhost:3000/api/comment/all/"
            const options = {
                method: "GET",
                headers: {
                    'Authorization' : "Bearer " + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.comments = data;
                })
                .catch(error => console.log(error));
        },
        adminDeleteUser(id){
            const url = "http://localhost:3000/api/auth/delete/" + id;
            const options ={
                method: "DELETE",
                headers: {
                    "Authorization" : "Bearer " + sessionStorage.getItem('token')
                }
            };
            fetch(url, options)
            .then(response => response.json())
            .then(data =>{
                this.users = data;
                window.location.reload();
            })
            .catch(error => console.log(error));
        },
        adminDeletePost(id){
            const url = "http://localhost:3000/api/posts/" + id;
            const options = {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.posts = data;
                //window.location.reload();
            })
            .catch(error => console.log(error));
        },
        adminDeleteComment(id){
            const url = "http://localhost:3000/api/comment/delete/" + id;
            const options = {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.comments = data;
                window.location.reload();
            })
            .catch(error => console.log(error));
        },
    },
    created: function() {
        this.getAllUsers();
        this.getAllPost();
        this.getAllComments();
    }
}
</script>

<style lang="scss" scoped>

#main--container{
    display: flex;
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
        button{
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            border: unset;
            color: #FF4B2B;
            border-radius: 1rem;
            padding: 0.5rem;
            &:hover{
                background-color: #FF4B2B;
                color: white;
                cursor: pointer;
            }

        }
    }
}
#main--section{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 75%;
    margin: auto;
    .list-container{
        border: 1px solid red;
        border-radius: 2rem;
        width: 18rem;
        height: 18rem;
        padding: 1rem;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        overflow: hidden;
        button{
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            border: unset;
            color: #FF4B2B;
            border-radius: 1rem;
            padding: 0.5rem;
            &:hover{
                background-color: #FF4B2B;
                color: white;
                cursor: pointer;
            }

        }
    }
    .user--list{
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 1rem;
        p{
            font-size: 1.2em;
        }
    }
    .post--list{
        @extend .user--list;
    }
    .comment--list{
        @extend .user--list;
    }
}
#main--section__noAdmin{
    margin: auto;
    width: 50%;
}

</style>