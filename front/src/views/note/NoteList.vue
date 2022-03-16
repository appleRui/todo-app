<style lang="scss" scoped>
.notes {
  margin-top: 2rem;
}
.note-link {
  display: inline-block;
  text-decoration: none;
  line-height: 48px;
  height: 100%;
  width: 100%;
  color: black;
}
.add-note-btn {
  padding: 1rem;
  background-color: #db4c3f;
  border-radius: 50%;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
}
</style>

<template>
  <div class="notes">
    <h1>ノートリスト</h1>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">タイトル</th>
            <th class="text-left">作成日</th>
            <th class="text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="note in notes" :key="note.id">
            <td @click="onClickDialog(note.id)" style="cursor: pointer">
              {{ note.title }}
            </td>
            <td>{{ dateFormat(note.created_at) }}</td>
            <td>
              <button @click="noteDestroy(note.id)">
                <v-icon>mdi-delete</v-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <router-link to="/draft" class="add-note-btn">
      <v-icon color="white">mdi-notebook-plus</v-icon>
    </router-link>
    <Dialog />
  </div>
</template>

<script>
import axios from '@/services/http'
import Dialog from '@/components/Modules/TheBaseDialog.vue'
import toastStore from '@/store/modules/toaster'
import dialogStore from '@/store/modules/dialog'
import dayjs from 'dayjs'

export default({
  components: {
    Dialog
  },
  data() {
    return {
    }
  },
  methods: {
    async onClickDialog(noteId){
      const noteData = await axios.get(`/api/v1/notes/${noteId}`)
      this.$store.dispatch('note/setOpenNote', noteData.data.note)
      dialogStore.commit('open', 'TheNote')
    },
    async noteDestroy(noteId){
      try{
        const res = confirm('本当に削除しますか？')
        if(res){
          await axios.delete(`/api/v1/notes/${noteId}`)
          this.$store.dispatch('note/removeNote', noteId)
          toastStore.dispatch('getToast', {msg: '削除しました', color: 'success', timeout: 4000})
        }
      }catch(error){
        console.error(error)
      }
    }
  },
  computed:{
    notes() {
      return this.$store.getters['note/notes']
    },
    dateFormat(){
      return function(date){
        return dayjs(date).format('YYYY-MM-DD')
      }
    }
  }
})
</script>
