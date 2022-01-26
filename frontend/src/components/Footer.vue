<template>
    <footer class="footer--menu">
        <nav v-if="userConnected">MON COMPTE</nav>
        <nav v-if="userConnected">DECONNEXION</nav>
    </footer>
</template>

<script>
export default {
    name : 'Footer',
}
</script>

<style scoped lang="scss">
    .footer--menu{
        margin-top: 1rem;
        position: sticky;
        display: flex;
        align-items: center;
        justify-content: space-around;
        nav{
            background: red;
            color: white;
            font-weight: 600;
            padding: 0.8rem;
            border-radius: 0.8rem;
        }
    }
</style>