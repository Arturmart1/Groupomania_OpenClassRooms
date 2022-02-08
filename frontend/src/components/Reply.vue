<template>
    <div class="reply--container">
        <div class="reply--bloc">
            <div v-for="comment in comments" :key="comment.id" class="reply__display">
                <div class="reply__list">
                    <!--h3>{{comment.user.firstName}} {{comment.user.lastName}}</h3-->
                    <p>{{comment.content}}</p>
                </div>
            </div>
            <div class="leave--reply">
                <div class="reply__input">
                    <textarea type="text" id="reply" v-model="replyContent" placeholder="Commentaire" ></textarea>
                </div>
                <div>
                    <a @click="sendReply()"><i class="fas fa-share" aria-label="Répondre"></i></a>
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
                'Authorization' : 'Bearer' + sessionStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data =>{
                this.comments = data;
                console.log(data);
            })
            .catch(error => console.log(error))
    },
    methods: {
        sendReply(){
            const replyInput = {
                "content": this.replyContent,
                "postId": this.postId,
                "userId": sessionStorage.getItem("userId"),
            }
            const url = "http://localhost:3000/api/comment/reply"
            const options = {
                method: "POST",
                body: JSON.stringify(replyInput),
                headers: {
                    'Authorization' : 'Bearer' + sessionStorage.getItem("token"),
                    'Content-type': 'application/json'
                }
            }
            fetch(url, options)
                .then(response => response.json())
                .then((response)=>{
                    if (response.ok){
                        this.content = {}
                    } else{
                        alert("Commentaire enregistré");
                    }
                })
                .then(window.location.reload())
                .catch(error => console.log(error))
        }
    },
}
</script>

<style lang="scss" scoped>
.reply--container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .reply__display{
        width: 95%;
        color: black;
        font-size: 1.2em;
        font-weight: 500;
    }
    .leave--reply{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5rem;
    .reply__input{
        width: 80%;
        border: 0.5px solid lightcoral;
        border-radius: 5px;
        font-size: 1.2em;
        font-weight: 500;
        textarea{
            
            border: unset;
        }
    }
    .fas{
        color: lightcoral;
        font-size: 1.5em;
        cursor: pointer;
    }
}
}
</style>