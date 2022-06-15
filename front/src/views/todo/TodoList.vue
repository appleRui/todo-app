<style lang="scss" scoped>
.todos {
  margin-top: 2rem;
  &__header {
    display: flex;
    justify-content: space-between;
  }
  .todos-lists {
    &__item {
      border-bottom: 1px solid #f0f0f0;
    }
  }
}
.todo-inner__checkbox {
  width: 5%;
}
.priority-1 {
  color: #ff4848;
}
.priority-2 {
  color: #4873ff;
}
.priority-3 {
  color: #ffa530;
}
</style>

<template>
  <div class="todos">
    <div class="todos__header">
      <h1 class="ttl">インボックス</h1>
      <AddBtn @onClickAddBtn="onClickAddBtn" />
    </div>

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
          <v-list-item-subtitle>
            <v-icon :class="priorityColor(todo.priority)" size="16"
              >mdi-flag</v-icon
            >優先順位{{ todo.priority }}</v-list-item-subtitle
          >
        </v-list-item-content>
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
import TheEditer from '@/components/TheTodo/TheEditer.vue'
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
    const { data } = await axios.get(`/api/v1/todos`)
    this.todos = data.todos
  },
  methods: {
    onClickAddBtn(){
      this.$router.push('/todos/new')
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
    },
    priorityColor(priority){
      switch (priority) {
        case 1:
          return 'priority-1'
          break;
        case 2:
          return 'priority-2'
          break;
        case 3:
          return 'priority-3'
          break;
        default:
          return 'priority-4'
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