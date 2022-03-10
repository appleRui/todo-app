<style lang="scss" scoped>
.todos{
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
          <tr v-for="item in todos" :key="item.key">
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
          <tr style="cursor: pointer" @click="dialog = true">
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

    <!-- dialog -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="550">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            タスク追加
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newTodo.name"
                    label="タスク名"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    ref="formCalendar"
                    v-model="formCalendar"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="newTodo.date"
                        label="日付"
                        hint="フォーマット：年-月-日"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="newTodo.date"
                      no-title
                      locale="jp-ja"
                      @input="formCalendar = false"
                      :day-format="(date) => new Date(date).getDate()"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newTodo.content"
                    label="説明"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text :disabled="disabled" @click="addTodo">
              追加する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from '@/services/http'
import find from 'lodash/find'
import store from '@/store/todo'

export default {
  data() {
    return {
      newTodo: {
        name: '',
        date: null,
        content: '',
      },
      text: '',
      snackbar: false,
      timeout: 3000,
      dialog: false,
      formCalendar: false
    }
  },
  methods: {
    async addTodo(){
      try{
        const newTodo = await axios.post(`/api/v1/todos`, this.newTodo)
        store.commit('addTodo', newTodo.data.new_todo)
        this.newTodo = {}
        this.dialog =false
      }catch(e){
        console.error(e)
      }
    },
    async done(id){
      try{
        var item = find(store.state.todos, {id: id})
        await axios.patch(`/api/v1/todos/${item.id}`, {check: true})
        store.commit('setRemenberTodo', item)
        this.text = `${item.name}が削除されました`
        this.snackbar = true
      }catch(e){
        console.error(e)
      }
    },
    async reverse(){
      try{
        var RemenberTodo = store.state.remenberTodo
        await axios.patch(`/api/v1/todos/${RemenberTodo.id}`, {check: false})
        var item = find(store.state.todos, {id: RemenberTodo.id})
        item.check = false
        this.snackbar = false
      }catch(e){
        console.error(e)
      }
    }
  },
  computed:{
    todos() {
      return store.state.todos.filter((item) => item.check === false)
    },
    disabled() {
        return !this.newTodo.name
      }
  }
}
</script>