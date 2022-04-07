<style lang="scss" scoped>
@import "./TheDetailHeader";
</style>

  
<template>
  <div class="the-detail-header">
    <div class="left-content">
      <div class="open-note-link" @click="showNote">
        ページを開く<v-icon class="ml-1">mdi-call-made</v-icon>
      </div>
    </div>
    <div class="rigth-content"></div>
  </div>
</template>

<script>
import dialog from '@/store/modules/dialog'
export default {
  props: {
    id: {
      type: Number,
      require: true
    }
  },
  methods: {
    showNote(){
      dialog.commit('close')
      this.$router.push(`/note/${this.id}`)
    }
  }
}
</script>
