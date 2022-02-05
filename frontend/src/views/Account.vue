<template>
    <section>
        <Topbar/>
        <AccountDetail/>
    </section>
</template>

<script>
import Topbar from '../components/Topbar.vue'
import AccountDetail from '../components/AccountDetail.vue'

export default {
    name:'Account',
    components:{
        Topbar,
        AccountDetail
    }
}
</script>