<template>
    <div class="leave--reply">
        <div class="reply__input">
            <input type="text" id="reply" v-model="replyInput.content" :placeholder="originalContent" >
            <span class="bottom"></span>
            <span class="right"></span>
            <span class="top"></span>
            <span class="left"></span>
        </div>
        <div class="command--button">
            <a @click="updateComment(commentId)"><i class="fas fa-share" aria-label="Envoi"></i></a>
            <a @click="closeReply()"><i class="fas fa-times" aria-label="Fermer"></i></a>
        </div>
    </div>
</template>

<script>
export default{
    name: 'EditComment',
    data() {
        return {
            replyInput: {
                content: "",
            },
            originalContent: "",
            comments: [],
        }
    },
    props: {
        comment: Object,
        commentId: Number,
    },
    mounted() {
        const url = "http://localhost:3000/api/comment/" + this.commentId
        const options = {
            method: "GET",
            headers: {
                'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
            }
        }
        fetch(url, options)
        .then(response => response.json())
        .then(data => {
            this.originalContent = data.content;
        })
        .catch(error => console.log(error))
    },
    methods:{
        updateComment(id){
            const url = "http://localhost:3000/api/comment/update/" + id
            const options = {
                method: "PUT",
                headers: {
                    'Authorization' : 'Bearer ' + sessionStorage.getItem("token"),
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(this.replyInput)
            }
            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.comments.push(data);
                this.replyInput.content = "";
                alert("Commentaire modifié");
                window.location.reload();
            })
            .catch(error => console.log(error))
        },
        closeReply(){
            window.location.reload()
        },
    },

}
</script>

<style lang="scss" scoped>
.leave--reply{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26%;
    height: 5%;
    position: absolute;
    margin: auto;
    background-color: #f5f5f5;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    z-index: 1;
    input{
        width: 90%;
        border: none;
        border-radius: 5px;
        padding: 10px;
        font-size: 1.2em;
        font-weight: 600;
        outline: none;
        background-color: #f5f5f5;
        &:focus{
            border: 1px solid #FF4B2B;
        }
    }
    .command--button{
        display: flex;
        justify-content: space-around;
        width: 20%;
        a{
            font-size: 1.5em;
            &:hover{
                cursor: pointer;
            }
        }
        .fa-share{
            color: green;
        }
        .fa-times{
            color: red;
        }
    }
}
</style>
