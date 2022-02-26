<template>
    <div id="topbar" class="topbar--container">
        <div class="topbar__logo">
            <img src="../assets/icon-left-font-monochrome-white.svg" alt="logo groupomania" class="topbar__image">
        </div>
        <div class="topbar__navigation">
            <nav class="topbar__link">
                <router-link to="/Home" title="Home" aria-label="Retour à l'accueil"><i class="fas fa-home"></i><p>Accueil</p></router-link>
                <router-link to="/Account" title="Account" aria-label="Gestion du compte"><i class="fas fa-user"></i><p>Mon compte</p></router-link>
                <a title="Disconnect" @click="disconnect()" aria-label="Déconnexion"><i class="fas fa-sign-out-alt"></i><p>Déconnexion</p></a>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: "Topbar",
    methods:{
        disconnect(){ //Déconnexion
            sessionStorage.clear();
            this.$router.push('/');
        }
    },
}
</script>

<style lang="scss" scoped>
.topbar--container{
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FF4B2B;
    color: white;
    padding: 0 2rem 0 2rem;
    margin-bottom: 2rem;
    .topbar__image{
        width: 18rem;
        object-fit: cover;
    }
    .topbar__link{
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        a{
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1em;
            color: white;
            padding: 0.4rem;
            &:hover{
                color: lighten($color: #FF4B2B, $amount: 5);
                background-color: white;
                border-radius: 1rem;
                cursor: pointer;
            }
        }
    }
}

@media only screen and (max-width: 400px){
    .topbar__logo{
        width: 100%;
        margin: auto;
    }
    .topbar__image{
        width: 12rem!important;
        margin: auto!important;
    }
    .topbar__navigation{
        position: fixed;
        background: #FF4B2B;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 1;
    }
}
</style>