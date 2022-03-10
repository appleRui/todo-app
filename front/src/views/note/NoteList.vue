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
          </tr>
        </thead>
        <tbody>
          <tr v-for="note in notes" :key="note.id">
            <td>
              <a class="text-black note-link" href="#">{{ note.title }}</a>
            </td>
            <td>{{ dateFormat(note.created_at) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <a class="add-note-btn" href="#"
      ><v-icon color="white">mdi-notebook-plus</v-icon></a
    >
  </div>
</template>

<script>
import store from '@/store/note'
import dayjs from 'dayjs'

export default({
  data() {
    return {
    }
  },
  computed:{
    notes() {
      return store.state.notes
    },
    dateFormat(){
      return function(date){
        return dayjs(date).format('YYYY-MM-DD')
      }
    }
  }
})
</script>
