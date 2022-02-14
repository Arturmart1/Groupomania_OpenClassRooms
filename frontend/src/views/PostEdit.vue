<template>
    <section>
        <Topbar/>
        <EditForm/>
    </section>
</template>

<script>
import Topbar from '../components/Topbar.vue'
import EditForm from '../components/EditForm.vue'

export default {
    name: 'PostEdit',
    components: {
        Topbar,
        EditForm,
    }
}
</script>