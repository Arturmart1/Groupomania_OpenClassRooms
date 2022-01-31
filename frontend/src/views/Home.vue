<template>
    <section>
        <Topbar/>
        <Postlist/>
    </section>
</template>

<script>
import Topbar from '../components/Topbar.vue'
import Postlist from '../components/Postlist.vue'

export default {
    name:'Home',
    components:{
        Topbar,
        Postlist,
    }
}
</script>