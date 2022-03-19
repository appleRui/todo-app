<style lang="scss">
.v-dialog {
  height: auto;
}
</style>

<template>
  <v-dialog width="auto" v-model="setDialog">
    <component :is="setComponent"></component>
  </v-dialog>
</template>

<script>
import store from '@/store/modules/dialog'
import TheNote from '@/components/TheNote/TheNote.vue'
import AddForm from '@/components/TheTodo/AddForm.vue'

export default {
  data() {
    return{}
  },
  components:{
    TheNote,
    AddForm
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
    }

  },
}
</script>