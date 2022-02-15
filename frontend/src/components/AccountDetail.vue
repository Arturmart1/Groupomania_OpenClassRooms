<template>
    <main id="main--container">
        <aside class="profile--preview">
            <div class="profile--preview__image">
                <img src="../assets/test_image.jpg" alt="profile picture" class="profile_picture">
            </div>
            <div class="profile--preview__text">
                <div class="profile--preview__info">
                    <h3 class="firstName">{{user.firstName}}</h3>
                    <h2 class="lastName">{{user.lastName}}</h2>
                    <button @click="deletePersonnalAccount()" class="accountbutton">Supprimez votre compte</button>
                </div>
            </div>
        </aside>
        <section id="main--section" v-if="isAdmin = true">
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
            <div class="form-container">
                <form v-on:submit.prevent="updateUser">
                    <input type="text" placeholder="Nom" autocomplete="current-firstName" v-model="input.lastName" />
                    <input type="text" placeholder="Prénom" autocomplete="current-lastName" v-model="input.firstName" />
                    <input type="file" placeholder="Photo de profil" />
                    <input type="password" placeholder="Password" autocomplete="current-password" v-model="input.password" />
                    <button>Modification</button>
                </form>
            </div>
        </section>
        <section id="main--section__noAdmin" v-else>
            <div class="form-container">
                <form v-on:submit.prevent="updateUser">
                    <input type="text" placeholder="Nom" v-model="input.lastName" />
                    <input type="text" placeholder="Prénom" v-model="input.firstName" />
                    <input type="file" placeholder="Photo de profil" />
                    <input type="password" placeholder="Password" required v-model="input.password" />
                    <button>Modification</button>
                </form>
            </div>
        </section>
    </main>
</template>

<script>
export default {
    name: 'AccountDetail',
    component:{
    },
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            isAdmin: sessionStorage.getItem('isAdmin'),
            user: {
                userId: "",
                isAdmin: this.isAdmin,
                firstName: "",
                lastName: "",
                email: "",
            },
            posts: [],
            comments: [],
            users: [],
            input:{
                lastName: "",
                firstName: "",
                //profilePicture: "",
                password: "",
            }
        }
    },
    mounted() {

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
                this.user = data
            })
            .catch(error => console.log(error));
    },
    methods:{
        deletePersonnalAccount(){
            const url = "http://localhost:3000/api/auth/delete/" + this.userId;
            const options = {
                method: "DELETE",
                headers: {
                    'Authorization': "Bearer " + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    sessionStorage.clear();
                    alert("Suppression du compte confirmée ! Vous allez être redirigé vers la page d'accueil.");
                })
                .catch(error => console.log(error));
        },
        getAllPost: function(){
            const url = "http://localhost:3000/api/posts/"
            const options = {
                method: "GET",
                headers: {
                    'Authorization' : "Bearer" + sessionStorage.getItem("token")
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
                    'Authorization' : "Bearer" + sessionStorage.getItem("token")
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
                    'Authorization' : "Bearer" + sessionStorage.getItem("token")
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
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer" + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
            .then(response => response.json())
            .then(data =>{
                this.users = data;
                //window.location.reload();
            })
            .catch(error => console.log(error));
        },
        adminDeletePost(id){
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
                window.location.reload();
            })
            .catch(error => console.log(error));
        },
        adminDeleteComment(id){
            const url = "http://localhost:3000/api/comment/delete/" + id;
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
                this.comments = data;
                window.location.reload();
            })
            .catch(error => console.log(error));
        },
        updateUser(){
            const inputs = {
                "firstName" : this.input.fistName,
                "lastName" : this.input.lastName,
            }
            const url = "http://localhost:3000/api/auth/update/" + this.userId
            const options = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
                body: JSON.stringify(inputs),
            };
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.users = data;
                window.location.reload();
            })
            .catch(error => console.log(error));
        }
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
.form-container{
    @extend .list-container;
    order: 2;
    margin: 2rem auto;
    width: 100vw!important;
    overflow: unset!important;
    form{
        display: flex;
        flex-direction: column;
    }
}

</style>