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
    <div class="rigth-content">
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn primary icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list min-width="167">
          <v-list-item @click="onClickEdit">
            <v-icon class="mr-2">mdi-note-edit-outline</v-icon>
            <v-list-item-title>編集</v-list-item-title>
          </v-list-item>
          <v-list-item @click="noteDestroy">
            <v-icon class="mr-2">mdi-delete</v-icon>
            <v-list-item-title>削除</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import dialog from '@/store/modules/dialog'
import axios from '@/services/http'
import toast from '@/store/modules/toaster'

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
    },
    onClickEdit(){
      dialog.commit('close')
      this.$router.push(`/note/edit/${this.id}`)
    },
    async noteDestroy(){
      try{
        const res = confirm('本当に削除しますか？')
        if(res){
          await axios.delete(`/api/v1/notes/${this.id}`)
          this.$store.dispatch('note/removeNote', this.id)
          dialog.commit('close')
          toast.dispatch('getToast', {msg: '削除しました', color: 'success', timeout: 4000})
        }
      }catch(error){
        console.error(error)
      }
    }
  }
}
</script>
