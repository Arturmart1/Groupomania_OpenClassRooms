<template>
    <section class="form--container" id="signUp">
        <div class="login">
            <h3>Inscrivez vous</h3>
        </div>
        <form action="#" method="post" class="signup--form">
            <div class="firstName form-field">
                <input type="text" name="firstName" placeholder="Prénom" required>
                <span></span>
                <p id="firstNameErrorMessage"></p>
            </div>
            <div class="lastName form-field">
                <input type="text" name="lastName" placeholder="Nom" required>
                <span></span>
                <p id="lastNameErrorMessage"></p>
            </div>
            <div class="password form-field">
                <input type="password" name="password" placeholder="Mot de passe" required>
                <span></span>
                <p id="passwordErrorMessage"></p>
            </div>
            <div class="checkPassword form-field">
                <input type="password" name="password" placeholder="Vérifiez votre mot de passe" required>
                <span></span>
                <p id="checkPasswordErrorMessage"></p>
            </div>
            <div class="signup__button">
                <button>Inscription</button>
            </div>
        </form>
    </section>
</template>

<script>
export default {
    name: "Signup"
}
</script>

<style lang="scss" scoped>
.navbar{
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    nav{
        background: #fd2d01;
        color: white;
        font-weight: 600;
        padding: 0.8rem;
    }
    .connexion{
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        &:hover{
            background: #ffd7d7;
            color: #fd2d01;
        }
    }
    .inscription{
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        &:hover{
            background: #ffd7d7;
            color: #fd2d01;
        }
    }
}
.form--container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    box-shadow:
        2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07);
    .form-field{
        position: relative;
        input {
            width: 15rem;
            color: white;
            font-size: inherit;
            font-family: inherit;
            background-color: transparent;
            border: 1px solid transparent;
            border-bottom-color: hsla(0, 100%, 62%, 0.2);
            text-align: center;
        }
        &:focus {
            outline: none;
        }
        &::placeholder {
            color: hsla(0, 0%, 100%, 0.6);
        }
        span {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background-color: #ffd7d7;
            transform-origin: bottom right;
            transform: scaleX(0);
            transition: transform 0.5s ease;
        }
        input:focus ~ span {
            transform-origin: bottom left;
            transform: scaleX(1);
        }
    }
    button{
        background: #fd2d01;
        border: unset;
        padding: 0.5rem;
        border-radius: 1rem;
        color: white;
        font-weight: 600;
        font-size: 1.1rem;
        &:hover{
            background: #ffd7d7;
            color: #fd2d01;
        }
    }
}
</style>