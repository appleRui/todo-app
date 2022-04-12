<style lang="scss">
.v-dialog {
  height: auto;
}
</style>

<template>
  <v-dialog width="auto" :persistent=persistent v-model="setDialog">
    <componen :is="setComponent" />
  </v-dialog>
</template>

<script>
import store from '@/store/modules/dialog'
import TheNote from '@/components/TheNote/TheDetail.vue'
import AddForm from '@/components/TheTodo/AddForm.vue'
import TheTodoModal from '@/components/TheTodo/TheModal.vue'
import ScheduleList from '@/components/TheSchedule/ScheduleList.vue'

export default {
  data() {
    return{}
  },
  components:{
    TheNote,
    AddForm,
    TheTodoModal,
    ScheduleList
  },
  methods: {
    close(){
      store.commit('close')
    }
  },
  computed: {
    storeData () {
      return store.state
    },
    setDialog: {
      get () {
        return this.storeData.dialog
      },
      set () {
        return store.commit('close')
      }
    },
    setComponent: {
      get () {
        return this.storeData.component[0]
      }
    },
    persistent() {
      return this.setComponent === 'ScheduleList'
    }
  },
}
</script>