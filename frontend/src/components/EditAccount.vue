<template>
    <div class="form--card">
        <div class="post--form">
            <h2>Modification</h2>
            <form name="editUser" id="editUser">
                <input type="text" placeholder="{{firstName}}" autocomplete="current-firstName" v-model="input.lastName" />
                <input type="text" placeholder="{{lastName}}" autocomplete="current-lastName" v-model="input.firstName" />
                <input type="file" placeholder="Importez votre photo de profil" ref="imageUrl" name="image" id="imageUrl" accept="image/*">
                <input type="password" placeholder="Password" autocomplete="current-password" v-model="input.password" />
        </form>
        </div>
        <div class="command__center">
            <div class="command__button" @click.prevent="updateUser(input.userId)">
                <p>Modifier/p>
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
            users:[],
            input: {
                firstName: "",
                lastName: "",
                imageUrl: "",
                password: "",
            },
        }
    },
    mounted() {
        const url = "http://localhost:3000/api/auth/user/" + this.userId;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
        updateUser(id){
            let input = document.getElementById('imageUrl');
            let formData = new FormData();
            formData.append('firstName', this.input.firstName);
            formData.append('lastName', this.input.lastName);
            formData.append('password', this.input.password);
            formData.append('image', input.files[0]);

            const url = "http://localhost:3000/api/auth/update/" + id;
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
                    this.input.password = "";
                    this.input.imageUrl = "";
                })
                .catch(error => console.error(error));
        },
    }
}
</script>

<style lang="scss" scoped>

</style>