<style lang="scss">
.v-dialog {
  height: auto;
}
</style>

<template>
  <v-dialog width="auto" :persistent=persistent v-model="setDialog">
    <component :is="setComponent"></component>
  </v-dialog>
</template>

<script>
import store from '@/store/modules/dialog'
import TheNote from '@/components/TheNote/TheNote.vue'
import AddForm from '@/components/TheTodo/AddForm.vue'
import ScheduleList from '@/components/TheSchedule/ScheduleList.vue'

export default {
  data() {
    return{}
  },
  components:{
    TheNote,
    AddForm,
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