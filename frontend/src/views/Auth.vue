<template>
    <section>
		<div id="password_error"></div>
		<img src="../assets/icon-left-font-monochrome-white.png" alt="Vue.js">
        <div class="main">  	
            <input type="checkbox" id="chk" aria-hidden="true">
            <div class="signup">
                <form v-on:submit.prevent="signUp">
                    <label for="chk" aria-hidden="true">Inscription</label>
                    <input type="text" name="txt" id="firstName" placeholder="Prénom" required v-model="signUpInput.firstName" minlength="2" aria-label="Prénom">
                    <input type="text" name="txt" placeholder="Nom" required v-model="signUpInput.lastName" minlength="2" aria-label="Nom">
                    <input type="email" name="email" placeholder="Email" required v-model="signUpInput.email" aria-label="email">
                    <input type="password" name="pswd" placeholder="Password" required v-model="signUpInput.password" minlength="8" aria-label="mot de passe">
                    <button>S'inscrire</button>
                </form>
            </div>
            <div class="login">
                <form v-on:submit.prevent="login">
                    <label for="chk" aria-hidden="true" class="login--label">Connexion</label>
                    <input type="email" name="email" placeholder="Email" required v-model="loginInput.email" aria-label="email">
                    <input type="password" name="pswd" placeholder="Password" required v-model="loginInput.password" minlength="8" aria-label="mot de passe">
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
        login()  { //Connexion
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
        signUp: function(){ //Inscription
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
				document.getElementById("password_error").textContent = "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et 2 chiffres et un caractère spécial";
				return false;
			} else {
				document.getElementById("password_error").textContent = "";
			}
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
					alert("Inscription confirmée, veuillez vous connecter")
					window.location.reload();
				})
			.catch(error => console.log(error))
		}
	}
}

</script>

<style lang="scss" src="../../sass/components/authPage.scss">
	
</style>