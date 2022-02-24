<template>
    <div class="reply--container">
        <div class="leave--reply">
            <div class="reply__input">
                <input type="text" id="reply" v-model="replyContent" placeholder="Commentaire" >
                <span class="bottom"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="left"></span>
            </div>
            <div>
                <a @click="sendReply()"><i class="fas fa-share" aria-label="Répondre"></i></a>
            </div>
        </div>
        <div class="reply--bloc">
            <span id="reply_error"></span>
            <div v-for="comment in comments" :key="comment.id" class="reply__display" >
                <div class="reply__list">
                    <div>
                        <EditComment v-if="EditComment" :comment="comment" :commentId="comment.id" :commentUserId="comment.UserId"></EditComment>
                        <h3>{{comment.User.firstName}} {{comment.User.lastName}}</h3>
                        <p>{{comment.content}}</p>
                    </div>
                    <div v-if="comment.User.id == this.userId" class="comment-options">
                        <i class="fas fa-solid fa-ban" @click="deleteComment(comment.id)"></i>
                        <i class="fas fa-edit" @click="EditComment = !EditComment"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditComment from './EditComment.vue'

export default {
    name: "Reply",
    components:{
        EditComment,
    },
    data() {
        return {
            EditComment: false,
            userId: sessionStorage.getItem("userId"),
            comment: "",
            comments: [],
            replyContent: "",
        }
    },
    props:{
        postId: Number,
        postUserId: Number,
    },
    mounted() {
        const url = "http://localhost:3000/api/comment/" + this.postId + "/display"
        const options = {
            method: "GET",
            headers: {
                'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
                'Content-type' : 'application/json'
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data =>{
                this.comments = data; 
            })
            .catch(error => console.log(error))
    },
    methods: {
        sendReply(){
            //Verification de la complétion du champ
            if(this.replyContent == ""){
                document.getElementById("reply_error").innerHTML = "Veuillez ajouter un commentaire";
            }else{
                const replyInput = {
                "content": this.replyContent,
                "postId": this.postId,
                }
                const url = "http://localhost:3000/api/comment/reply"
                const options = {
                    method: "POST",
                    body: JSON.stringify(replyInput),
                    headers: {
                        'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
                        'Content-type': 'application/json'
                    }
                }
                fetch(url, options)
                    .then(()=>window.location.reload())
                    .catch(error => console.log(error))
            }
        },
        deleteComment(id){
            const url = "http://localhost:3000/api/comment/delete/" + id
            const options = {
                method: "DELETE",
                headers: {
                    'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
                }
            }
            fetch(url, options)
                .then(()=>window.location.reload())
                .catch(error => console.log(error))
        },
    },
}
</script>

<style lang="scss" scoped>
.reply--container{
    width: 95%;
    margin: auto;
    .leave--reply{
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        .fa-share{
            font-size: 1.5em;
            color: #FF4B2B;
            &:hover{
                cursor: pointer;
            }
        }
    }
}
.reply__input {
  position: relative;
  width: 90%;
  margin-top: 0.5rem;
}
#reply_error{
    color: red;
    font-size: 1.2em;
    font-weight: 600;
    background: none;
}

input {
  width: 95%;
  color: darkgray;
  font-size: inherit;
  font-family: inherit;
  padding: 0.35em 0.45em;
  border: 1px solid lightgray;
  transition: background-color 0.3s ease-in-out;
  &:focus{
    outline: none;
    border: none;
    color: black;
  }
  &::placeholder {
    color: darkgray;
    text-align: left;
  }
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
    margin-top: 0.8rem;
    .reply__display{
        width: 95%;
        margin: 0 auto 0.5rem auto;
        padding: 0.5rem;
        text-align: left;
        border-radius: 0.5em;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    h3{
        font-size: 1.2em;
        font-weight: 500;
        padding:0.5rem 0 0.5rem 0;
    }
}
.reply__list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .fa-ban{
        font-size: 1.2em;
        color: #FF4B2B;
        &:hover{
            cursor: pointer;
        }
    }
    .fa-edit{
        font-size: 1.2em;
        color: green;
        &:hover{
            cursor: pointer;
        }
    }
    .comment-options{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.5rem;
    }
}
</style>