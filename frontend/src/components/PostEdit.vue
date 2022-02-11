<template>
    <div class="modal-overlay">
        <h2>Modification</h2>
        <div class="modal">
            <div class="reply__input">
                <input type="text" placeholder="{{title}}" required v-model="postInput.title">
                <span class="bottom"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="left"></span>
            </div>
            <div class="reply__input">
                <input type="text" class="longInput" placeholder="{{content}}" required v-model="postInput.content">
                <span class="bottom"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="left"></span>
            </div>
            <input type="file" placeholder="Importez votre image" ref="imageUrl" accept="image/*">
        </div>
        <div class="command__button" @click="modifyPost()">
            <button>Valider</button>
        </div>
        <div class="close">
            <button @click="showModal = false">Annuler</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PostEdit",
    components:{
    },
    data() {
        return {
            postId: 39,
            title: "",
            userId: sessionStorage.getItem('userId'),
            imageUrl: "",
            content: "",
            isAdmin: sessionStorage.getItem('isAdmin'),
            posts: [],
            postInput: {
                title:"",
                content:"",
                imageUrl: "",
            },
        }
    },
    mounted() {
        const url = "http://localhost:3000/api/posts/" + this.postId ;
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
        goBack(){
            this.$router.push('/Home');
        },
        modifyPost(postId){
            const url = "http://localhost:3000/api/posts/" + postId;
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            };
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.posts = data;
                alert("Modification enregistrée !")
                this.$router.push('/Home');
            })
            .catch(error => console.log(error));
        }
    },
}
</script>

<style lang="scss" scoped>
.modal-overlay{
    background-color: rgba(0, 0, 0, 0.384);
    position: fixed;
    z-index: 999;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 25rem;
    height: 25rem;
    padding: 1rem;
    h2{
        color: white;
        font-size: 1.5em;
        font-weight: 600;
    }
    .modal{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: auto;
        gap: 2rem;
    }
}
.reply__input {
  position: relative;
  width: 90%;
}
.longInput{
    height: 3rem;
}
input {
  width: 95%;
  color: darkgray;
  font-size: inherit;
  font-family: inherit;
  padding: 0.35em 0.45em;
  border: 1px solid lightgray;
  transition: background-color 0.3s ease-in-out;
}
input:focus {
  outline: none;
  border: none;
}

input::placeholder {
  color: darkgrey;
  text-align: left;
}

span {
  position: absolute;
  background-color: #FF4B2B;
  transform-origin: center;
  transition: transform 0.5s ease;
}

.bottom,
.top {
  height: 1px;
  left: 0;
  right: 0;
  transform: scaleX(0);
}

.left,
.right {
  width: 1px;
  top: 0;
  bottom: 0;
  transform: scaleY(0);
}

.top {
  top: 0;
}

.bottom {
  bottom: 0;
}

.left {
  left: 0;
}

.right {
  right: 0;
}

input:focus ~ .top, input:focus ~ .bottom {
  transform: scaleX(1);
}

input:focus ~ .left, input:focus ~ .right {
  transform: scaleY(1);
}
.reply--bloc{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 0.5rem;
    .reply__display{
        width: 95%;
        margin: 0 auto 0.5rem auto;
        text-align: left;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    h3{
        font-size: 1.2em;
        font-weight: 500;
        padding:0.5rem 0 0.5rem 0;
    }
}
</style>
