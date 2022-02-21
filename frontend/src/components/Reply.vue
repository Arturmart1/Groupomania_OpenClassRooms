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
            <div v-for="comment in comments" :key="comment.id" class="reply__display" >
                <div class="reply__list">
                    <h3>{{comment.User.firstName}} {{comment.User.lastName}}</h3>
                    <p>{{comment.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Reply",
    data() {
        return {
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
        align-items: center;
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
</style>