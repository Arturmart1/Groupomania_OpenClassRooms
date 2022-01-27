<template>
  <div class="home">
    <Header />
    <div class="router--menu">
      <router-link to="/login" class="routerLink">CONNEXION</router-link>
      <router-link to="/signup" class="routerLink">INSCRIPTION</router-link>
    </div>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.home{
  margin: auto;
}
.router--menu{
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .routerLink{
    background-color: #fd2d01;
    width: 50%;
    padding: 0.5rem 0 0.5rem 0;
    margin: auto;
    text-decoration: unset;
    font-size: 1.3em;
    color: white;
    border-radius: 1rem;
    &:hover{
      color:#fd2d01;
      background-color: #ffd7d7;
    }

  }
}
</style>
