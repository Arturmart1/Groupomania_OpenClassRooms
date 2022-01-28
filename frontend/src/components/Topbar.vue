<template>
    <div id="topbar" class="topbar--container">
        <div class="topbar__logo">
            <img src="../assets/icon-left-font.png" alt="logo groupomania">
        </div>
        <div class="topbar__navigation">
            <nav>
                <router-link to="/account" title="Account"><i @click="account" class="fas fa-user"></i>Mon compte</router-link>
                <router-link to="/" title="Disconnect"><i @click="disconnect" class="fas fa-sign-out-alt"></i>Déconnexion</router-link>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: "Topbar",
    methods:{
        disconnect(){
            sessionStorage.clear('user');
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss" scoped>
.topbar--container{
    height: 10rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FF4B2B;
    color: white;
    .topbar__navigation{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 50%;
        a{
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            text-decoration: none;
            &:hover{
                color: #42b983;
            }
        }
    }
}
</style>