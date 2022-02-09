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
        <section id="main--section">
            <div>
                <h2>Liste des utilisateurs</h2>
            </div>
            <div class="user--list" v-for="user in users" :key="user.id">
                <div>
                    <p> {{user.firstName}} {{user.lastName}} </p>
                </div>
                <div class="delete__user">
                    <button>Supprimer</button>
                </div>
            </div>
            <div class="latest--postList">
                <div>
                <h2>Derniers post</h2>
            </div>
            <div class="post--list" v-for="post in posts" :key="post.id">
                <div>
                    <p> {{post.title}} {{post.content}} </p>
                </div>
                <div class="delete__user">
                    <button>Supprimer</button>
                </div>
            </div>
            </div>
            <div class="latest--comentList">
                <div>
                <h2>Derniers commentaires</h2>
            </div>
            <div class="user--list" v-for="comment in comments" :key="comment.id">
                <div>
                    <p> {{comment.Post.title}} {{comment.content}} </p>
                </div>
                <div class="delete__user">
                    <button>Supprimer</button>
                </div>
            </div>
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
            user: {
                userId: sessionStorage.getItem('userId'),
                isAdmin: sessionStorage.getItem('isAdmin'),
                firstName: "",
                lastName: "",
                email: "",
            },
            posts: [],
            comments: [],
            users: [],
        }
    },
    mounted() {

        const url = "http://localhost:3000/api/auth/" + this.user.userId;
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
            const url = "http://localhost:3000/api/auth/" + this.user.userId;
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
        getAllPost(){
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
        getAllUsers(){
            const url = "http://localhost:3000/api/auth/"
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
            }
        },
        getAllComments(){
            const url = "http://localhost:3000/api/comments"
            const options = {
                method: "GET",
                headers: {
                    'Authorization' : "Bearer" + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data=>{
                    this.comments = data;
                })
                .catch(error => console.log(error));
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
        a{
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
}
</style>