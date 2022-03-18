<template>
  <v-card width='550'>
    <v-card-title class="text-h5 grey lighten-2"> タスク追加 </v-card-title>
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
</template>

<script>
import axios from '@/services/http'
import dayjs from '@/services/day'
import store from '@/store/modules/dialog'

export default ({
  data() {
    return {
      newTodo: {
        name: '',
        date: dayjs.yyyymmdd(),
        content: '',
      },
      formCalendar: false
    }
  },
  methods: {
    async addTodo(){
      try{
        const newTodo = await axios.post(`/api/v1/todos`, this.newTodo)
        this.$store.commit('todo/addTodo', newTodo.data.new_todo)
        this.newTodo = {date: dayjs.yyyymmdd()}
        store.commit('close')
      }catch(e){
        console.error(e)
      }
    },
  },
  computed: {
    disabled() {
        return !this.newTodo.name
    }
  }

})
</script>
