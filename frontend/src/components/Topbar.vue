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

<style lang="scss" src="../../sass/components/topBar.scss" scoped></style>