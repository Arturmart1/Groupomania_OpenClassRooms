<template>
    <div class="reply--container">
        <div class="reply--bloc">
            <div class="leave--reply">
                <textarea type="text" id="reply" v-model="replyContent" placeholder="Commentaire" rows="4"></textarea>
                <a @click="sendReply()"><i class="fas fa-share" title="Répondre"></i></a>
            </div>
            <div class="reply__display">
                <div class="reply__list" v-for="comment in comments" :key="comment.id">
                    <h3>{{comment.user.firstName}} {{comment.user.lastName}}</h3>
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
            user: "",
            users: [],
        }
    },
    props:{
        postId: Number,
        userId: Number,
    },
    mounted() {
        const url = "http://localhost:3000/api/comment/" + this.postId + "/display"
        const options = {
            method: "GET",
            headers: {
                'Authoeization' : 'Bearer' + sessionStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data =>{
                this.comments = data;
                this.users = data;
            })
            .catch(error => console.log(error))
    },
    methods: {
        sendReply(){
            const replyInput = {
                "content": this.content,
                "postId": this.postId,
                "userId" : sessionStorage.getItem("userId")
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
                    if (!response.ok){
                        this.content = {}
                    } else{
                        alert("Erreur, veuillez réessayer");
                    }
                })
                .then(location.reload())
                .catch(error => console.log(error))
        }
    },
}
</script>