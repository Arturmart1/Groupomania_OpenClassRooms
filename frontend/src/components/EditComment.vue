<template>
    <div class="leave--reply">
        <div class="reply__input">
            <input type="text" id="reply" v-model="replyContent" placeholder="Commentaire" >
            <span class="bottom"></span>
            <span class="right"></span>
            <span class="top"></span>
            <span class="left"></span>
        </div>
        <div>
            <a @click="updateComment()"><i class="fas fa-share" aria-label="Répondre"></i></a>
        </div>
        </div>
</template>

<script>
export default{
    name: 'EditComment',
    data() {
        return {
            userId: sessionStorage.getItem("userId"),
            EditedContent: "",
        }
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
                body: JSON.stringify({
                    content: this.EditedContent
                })
            };
            fetch(url, options)
                .then(()=>window.location.reload())
                .catch(error => console.log(error))
        }
    },
}
</script>

<style lang="scss" scoped>
.modal--container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}
</style>
