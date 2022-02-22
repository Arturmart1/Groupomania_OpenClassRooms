<template>
    <div class="form--card">
        <div class="post--form">
            <h2>A vous de partager!</h2>
            <form name="newPost" id="newPost">
                <input type="text" placeholder="Titre" name="title" id="title" required v-model="title">
                <span id="title_error"></span>
                <input type="text" placeholder="Votre message ici" name="content" id="content" required v-model="content">
                <span id="content_error"></span>
                <input type="file" placeholder="Importez votre image" ref="imageUrl" name="image" id="imageUrl" accept="image/*">
                <span id="image_error"></span>
                <button type="submit" class="command__button" @click.prevent="sendPost()">Publier</button>
            </form>
        </div>                
    </div>
</template>

<script>
export default {
    name: 'NewPost',
    data() {
        return {
            title: "",
            content: "",
            imageUrl: "",
            userId: sessionStorage.getItem('userId'),
        }
    },
    methods: {
        sendPost : function (){
            //Verification de la complétion des champs
            if(this.title == "" || this.content == ""){
                if(this.title == ""){
                    document.getElementById("title_error").innerHTML = "Veuillez ajouter un titre";
                }
                if(this.content == ""){
                    document.getElementById("content_error").innerHTML = "Veuillez ajouter un message";
                }
            }else{
                let input = document.getElementById('imageUrl');
                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('content', this.content);
                formData.append('image', input.files[0]);

                const url = 'http://localhost:3000/api/posts/new';
                const options = {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                    }
                }
                fetch(url, options)
                .then(()=>window.location.reload())
                .catch(error => console.error(error))
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.form--card{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 40%;
    margin: auto auto 1.5rem auto;
    padding: 0.5rem;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    border-radius: 1rem;
    .post--form{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        width: 95%;
        margin: auto;
        button{
            border: unset;
            background-color: #FF4B2B;
            color: white;
            width: 100%;
            margin: 1rem 0;
            padding: 0.5rem 0;
            font-size: 1.2rem;
            font-weight: 600;
            border-radius: 0.6rem;
            &:hover{
                background-color: lighten($color: #FF4B2B, $amount: 5);
                cursor: pointer;
            }
        }
        span{
            color: red;
        }
    }
    h2{
        padding: 0.5rem 0 0.5rem 0;
        font-size: 1.2em;
        font-weight: 600;
    }
    input{
        background-color: #eee;
        border: none;
        width: 90%;
        padding: 0.5rem;
        margin: 0.5rem auto 0.5rem auto;
    }
}
</style>