<template>
    <section>
		<div id="password_error"></div>
		<img src="../assets/icon-left-font-monochrome-white.png" alt="Vue.js">
        <div class="main">  	
            <input type="checkbox" id="chk" aria-hidden="true">
            <div class="signup">
                <form v-on:submit.prevent="signUp">
                    <label for="chk" aria-hidden="true">Inscription</label>
                    <input type="text" name="txt" id="firstName" placeholder="Prénom" required v-model="signUpInput.firstName" minlength="2">
                    <input type="text" name="txt" placeholder="Nom" required v-model="signUpInput.lastName" minlength="2">
                    <input type="email" name="email" placeholder="Email" required v-model="signUpInput.email">
                    <input type="password" name="pswd" placeholder="Password" required v-model="signUpInput.password" minlength="8">
                    <button>S'inscrire</button>
                </form>
            </div>
            <div class="login">
                <form v-on:submit.prevent="login">
                    <label for="chk" aria-hidden="true" class="login--label">Connexion</label>
                    <input type="email" name="email" placeholder="Email" required v-model="loginInput.email">
                    <input type="password" name="pswd" placeholder="Password" required v-model="loginInput.password">
                    <button>Connexion</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'Auth',

    data() {
        return {
            loginInput: {
                "email": "",
                "password": "",
            },
            signUpInput: {
                "firstName": "",
                "lastName": "",
                "email": "",
                "password": ""
            }
        }
    },
    methods: {
        login()  {
            const credentials = {
                "email": this.loginInput.email,
                "password": this.loginInput.password
            }
			const url = 'http://localhost:3000/api/auth/login';
			const options = {
				method: 'POST',
				body: JSON.stringify(credentials),
				headers: {
					'Content-Type': 'application/json'
				}
			};	
			fetch(url, options)
				.then(res => res.json())
				.then(res => {
					if (res.userId && res.token) {
						sessionStorage.setItem("userId", res.userId)
						sessionStorage.setItem("token", res.token)
						sessionStorage.setItem("isAdmin", res.isAdmin)
						this.$router.push('/Home');
						} else {
							alert("Identifiants incorrects");
						}
					})
					.catch(error => console.log(error))
        },
        signUp: function(){
			const credentials = {
				"firstName": this.signUpInput.firstName,
				"lastName": this.signUpInput.lastName,
				"email": this.signUpInput.email,
				"password": this.signUpInput.password
			}
			//Check password field
			let password = this.signUpInput.password;
			let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if(!regex.test(password)) {
				document.getElementById("password_error").textContent = "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et 2 chiffres";
				return false;
			}
			//Check if email is already used
			const url = "http://localhost:3000/api/auth/signup"
			const options = {
				method: "POST",
				body: JSON.stringify(credentials),
				headers: {
					'Content-type' : 'application/json'
				}
			}
			fetch(url, options)
				.then(res => res.json())
				.then (() =>{
					window.location.reload();
					alert("Inscription confirmée, veuillez vous connecter")
				})
			.catch(error => console.log(error))
		}
	}
}

</script>

<style lang="scss" scoped>
section{
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background: linear-gradient(to bottom, #ff745c, #ff4b2b, #ff2f0a);
	img{
		width: 25rem;
		margin-bottom: 2rem;
	}
}
.main{
	width: 350px;
	height: 530px;
    background: #fff;
	overflow: hidden;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
}
#chk{
	display: none;
}
.signup{
	position: relative;
	width:100%;
	height: 100%;
}
label{
	color: #ff4b2b;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 60px;
	font-weight: bold;
	cursor: pointer;
	transition: .5s ease-in-out;
}
input{
	width: 60%;
	height: 20px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
}
button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #ff4b2b;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: lighten($color: #ff4b2b, $amount: 10);
}
.login{
	height: 460px;
	background: #eee;
	border-radius: 60% / 10%;
	transform: translateY(-180px);
	transition: .8s ease-in-out;
}
.login label{
	color: #ff4b2b;
    padding-top: 0.4em;
	transform: scale(.6);
}

#chk:checked ~ .login{
	transform: translateY(-500px);
}
#chk:checked ~ .login label{
	transform: scale(1);	
}
#chk:checked ~ .signup label{
	transform: scale(.6);
}
#password_error{
	position: fixed;
	top: 0;
	color: white;
	height: 2rem;
	font-size: 1.2em;
	padding: 0.8em;
	font-weight: 600;
}
</style>