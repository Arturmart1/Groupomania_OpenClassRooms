<template>
    <div class="form--card">
        <div class="post--form">
            <h2>Modification</h2>
            <form name="editUser" id="editUser">
                <input type="text" :placeholder="firstName" :autocomplete="firstName" v-model="input.firstName" aria-label="Prénom" />
                <input type="text" :placeholder="lastName" :autocomplete="lastName" v-model="input.lastName" aria-label="Nom"/>
                <input type="file" ref="imageUrl" name="image" id="imageUrl" accept="image/*" aria-label="photo de profil">
            </form>
        </div>
        <div class="command__center">
            <div>
                <button @click.prevent="updateUser(input.userId)">Modifier</button>
            </div>
            <div>
                <button @click.prevent="deleteProfilPicture()">Supprimer la photo</button>
            </div>
        </div>                
    </div>
</template>

<script>
export default {
    name: 'EditAccount',
    components: {
    },
    data(){
        return {
            userId : sessionStorage.getItem('userId'),
            isAdmin: sessionStorage.getItem('isAdmin'),
            firstName:"",
            lastName:"",
            imageUrl: "",
            users:[],
            input: {
                firstName: "",
                lastName: "",
                imageUrl: "",
                password: "",
                userId: "",
            },
        }
    },
    mounted() { //Récuperation des infos utilisateurs
        const url = "http://localhost:3000/api/auth/user/" + this.userId;
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.firstName = data.firstName;
                this.lastName = data.lastName;
            })
            .catch(error => console.error(error));
    },
    methods: {
        updateUser(){ //Fonction de mise à jour de l'utilisateur
            let input = document.getElementById('imageUrl');
            let formData = new FormData();
            formData.append('firstName', this.input.firstName || this.firstName);
            formData.append('lastName', this.input.lastName || this.lastName);
            formData.append('image', input.files[0]);

            const url = "http://localhost:3000/api/auth/update/" + this.userId;
            const options = {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.users.push(data);
                    this.input.firstName = "";
                    this.input.lastName = "";
                    this.input.imageUrl = "";
                    window.location.reload();
                    alert("Modification(s) enregistrée(s)")
                })
                .catch(error => console.error(error));
        },
        deleteProfilPicture(){ //Suppression de la photo de profil           
            const url = "http://localhost:3000/api/auth/update/" + this.userId + "/image";
            const options = {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
            };
            fetch(url, options)
                .then(()=>window.location.reload())
                .catch(error => console.error(error));
        },
    },
}
</script>

<style lang="scss" scoped>
.form--card{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border: 1px solid red;
    border-radius: 2rem;
    padding: 1rem;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

    #editUser{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
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
@media only screen and (max-width: 400px){
    .command__center{
        display: flex;
        justify-content: space-between;
        gap: 2rem;
    }
}
</style>