<style lang="scss" scoped>
.todos {
  margin-top: 2rem;
}
.todo-inner__checkbox {
  width: 5%;
}
</style>

<template>
  <div class="todos">
    <h1>インボックス</h1>
    <!-- simple-table -->
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">タスク名</th>
            <th class="text-left">日付</th>
            <th class="text-left">説明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in todos" :key="item.id">
            <td class="todo-inner__checkbox">
              <v-simple-checkbox
                v-model="item.check"
                :ripple="false"
                @click="done(item.id)"
              ></v-simple-checkbox>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.content }}</td>
          </tr>
          <tr style="cursor: pointer" @click="onClickDialog('AddForm')">
            <td colspan="4">
              <v-icon>mdi-pencil-plus</v-icon><span>タスク追加</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- snackbar -->
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="reverse">
            元に戻す
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <Dialog />
  </div>
</template>

<script>
import Dialog from '@/components/Modules/TheBaseDialog.vue'
import axios from '@/services/http'
import store from '@/store/modules/dialog'
import find from 'lodash/find'

export default {
  components: {
    Dialog
  },
  data() {
    return {
      text: '',
      snackbar: false,
      timeout: 3000,
      dialog: false,
    }
  },
  methods: {
    onClickDialog(componentName){
      store.commit('open', componentName)
    },
    async done(id){
      try{
        var item = find(this.$store.getters['todo/todos'], {id: id})
        await axios.patch(`/api/v1/todos/${item.id}`, {check: true})
        this.$store.commit('todo/setRemenberTodo', item)
        this.text = `${item.name}が削除されました`
        this.snackbar = true
      }catch(e){
        console.error(e)
      }
    },
    async reverse(){
      try{
        var RemenberTodo = this.$store.getters['todo/remenberTodo']
        await axios.patch(`/api/v1/todos/${RemenberTodo.id}`, {check: false})
        var item = find(this.$store.getters['todo/todos'], {id: RemenberTodo.id})
        item.check = false
        this.snackbar = false
      }catch(e){
        console.error(e)
      }
    }
  },
  computed:{
    todos() {
      return  this.$store.getters['todo/todos'].filter((item) => item.check === false)
    },
  }
}
</script>