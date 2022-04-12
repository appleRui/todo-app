<style lang="scss" scoped>
.todos {
  margin-top: 2rem;
  .todos-lists {
    &__item {
      border-bottom: 1px solid #f0f0f0;
    }
  }
}
.todo-inner__checkbox {
  width: 5%;
}
</style>

<template>
  <div class="todos">
    <h1>インボックス</h1>

    <!-- simple-table -->
    <!-- <v-simple-table>
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
    </v-simple-table> -->

    <!-- v-list -->
    <v-list class="todos-lists">
      <v-list-item
        class="todos-lists__item"
        v-for="todo in notDoneTodos"
        :key="todo.id"
      >
        <v-list-item-action>
          <v-checkbox v-model="todo.check" @click="done(todo.id)"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content
          style="cursor: pointer"
          @click="onClickTodoDialog(todo.id)"
        >
          <v-list-item-title>{{ todo.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ todo.content }}</v-list-item-subtitle>
          <v-list-item-subtitle
            ><v-icon class="mr-1" size="16">mdi-calendar-month</v-icon
            >{{ todo.date }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <component
          :is="defaultComponent"
          @onClickAddBtn="onClickAddBtn"
          @pushTodo="pushTodo($event)"
          @onClickCansel="onClickCansel"
        ></component>
      </v-list-item>
    </v-list>

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
import AddBtn from '@/components/TheTodo/AddBtn.vue'
import TheEditer from '@/components/TheTodo/TheTodoEditer.vue'
import dialog from '@/store/modules/dialog'
import axios from '@/services/http'
import find from 'lodash/find'

export default {
  components: {
    Dialog,
    AddBtn,
    TheEditer
  },
  data() {
    return {
      text: '',
      snackbar: false,
      timeout: 3000,
      dialog: false,
      todos:[],
      selectedTodo: null,
      defaultComponent: 'AddBtn'
    }
  },
  async created(){
    const res = await axios.get(`/api/v1/todos`)
    this.todos = res.data.todos
  },
  methods: {
    onClickAddBtn(){
      this.defaultComponent = 'TheEditer'
    },
    onClickCansel(){
      this.defaultComponent = 'AddBtn'
    },
    onClickTodoDialog(id){
      dialog.commit('open', 'TheTodoModal')
      this.$store.commit('todo/setOpenTodo', id)
    },
    pushTodo(newTodo){
      this.todos.push(newTodo)
    },
    async done(id){
      try{
        const item = find(this.todos, {id: id})
        await axios.patch(`/api/v1/todos/${id}`, {check: true})
        this.$store.commit('todo/setRemenberTodo', item)
        this.text = `タスクが削除されました`
        this.snackbar = true
      }catch(e){
        console.error(e)
      }
    },
    async reverse(){
      try{
        const  RemenberTodo = this.$store.getters['todo/remenberTodo']
        console.log(RemenberTodo)
        await axios.patch(`/api/v1/todos/${RemenberTodo.id}`, {check: false})
        const item = find(this.todos, {id: RemenberTodo.id})
        item.check = false
        this.snackbar = false
      }catch(e){
        console.error(e)
      }
    }
  },
  computed: {
    notDoneTodos(){
      return this.todos.filter((item) => item.check === false)
    }
  }
}
</script>