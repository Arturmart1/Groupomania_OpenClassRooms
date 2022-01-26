<template>
    <header class="header--container">
        <div>
            <img src="../assets/icon-left-font.png" alt="Logo Groupomania" class="header__logo">
        </div>
    </header>
</template>

<script>
export default {
    name : 'Header',
}
</script>

<style scoped lang="scss">
    .header--container{
        display: flex;
        align-items: center;
        justify-content: space-around;
        .header__logo{
            width: 10rem;
        }
    }
</style>