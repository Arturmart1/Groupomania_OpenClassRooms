<template>
  <div class="home">
    <Header />
    <Login />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Login,
    Footer
  }
}
</script>
