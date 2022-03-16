<style lang="scss">
.v-dialog {
  height: auto;
}
</style>

<template>
  <v-dialog v-model="setDialog" max-width="960">
    <component :is="setComponent"></component>
  </v-dialog>
</template>

<script>
import dialogStore from '@/store/modules/dialog'
import TheNote from '@/components/TheNote/TheNote.vue'

export default {
  data() {
    return{}
  },
  components:{
    TheNote
  },
  methods: {
    close(){
      dialogStore.commit('close')
    }
  },
  computed: {
    storeData () {
      return dialogStore.state
    },
    setDialog: {
      get () {
        return this.storeData.dialog
      },
      set () {
        return dialogStore.commit('close')
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