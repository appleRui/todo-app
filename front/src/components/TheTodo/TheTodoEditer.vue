<style lang="scss" scoped>
.the-editer {
  width: 100%;
  margin: 8px 0;
  &__inner {
    padding: 0.7rem 0.75rem;
    border-radius: 5px;
    border: 1px solid #f0f0f0;
    .name {
      width: 100%;
      font-size: 14px;
      &:focus {
        outline: none;
      }
    }
    .contetn {
      width: 100%;
      height: 42px;
      resize: none;
      font-size: 13px;
      &:focus {
        outline: none;
      }
    }
  }
  &__actions {
    margin-top: 10px;
  }
}
</style>

<template>
  <div class="the-editer">
    <div class="the-editer__inner">
      <input
        autofocus
        class="d-block my-1 name"
        type="text"
        placeholder="タスク名"
        v-model="formContent.name"
      />
      <textarea
        class="d-block my-1 contetn"
        type="text"
        placeholder="説明"
        v-model="formContent.content"
      />

      <v-menu :close-on-content-click="true" offset-y min-width="auto">
        <template v-slot:activator="{ on }">
          <v-chip v-on="on" class="mt-2" label outlined>
            <v-icon size="16">mdi-calendar-month</v-icon>
            {{ formContent.date }}
          </v-chip>
        </template>
        <v-date-picker
          v-model="formContent.date"
          locale="ja"
          :day-format="(date) => new Date(date).getDate()"
          no-title
        ></v-date-picker>
      </v-menu>
    </div>
    <div class="the-editer__actions">
      <v-btn
        small
        elevation="0"
        class="mr-2"
        color="primary"
        :disabled="disabled"
        @click="onClickSave"
        >保存</v-btn
      >
      <v-btn small elevation="1" color="defalut" @click="onClickCansel"
        >キャンセル</v-btn
      >
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import axios from '@/services/http'
import dialog from '@/store/modules/dialog'

export default ({
  data(){
    return{
        formContent: {
          name: '',
          date: dayjs().format('YYYY-MM-DD'),
          content: '',
        },
        isEditTodo: false
      }
  },
  props: {
    setTodo: {
      require: true,
      type: Object,
    }
  },
  async created() {
    if(this.$store.state.todo.setOpenTodo !== 0) {
      const id = this.$store.state.todo.setOpenTodo
      const { data } = await axios.get(`api/v1/todos/${id}`)
      this.formContent = data.todo
      this.isEditTodo = true
    }
  },
  methods: {
    async onClickSave(){
      if(this.isEditTodo){
        await this.update()
      }else{
        await this.save()
      }
    },
    onClickCansel(){
      this.$emit('onClickCansel')
    },
    resetOpenTodo(){
      return this.$store.commit('todo/resetOpenTodo')
    },
    async save(){
      try{
        const { data } = await axios.post(`/api/v1/todos`, this.formContent)
        this.$emit('pushTodo', data.new_todo)
        this.onClickCansel()
      }catch(e){
        console.error(e)
      }
    },
    async update(){
      try{
        await axios.patch(`/api/v1/todos/${this.formContent.id}`, this.formContent)
        dialog.commit('close')
        location.reload()
        // this.$router.push('/todos',  () => {})

      }catch(e){
        console.error(e)
      }
    }
  },
  computed: {
    disabled() {
      return !this.formContent.name
    }
  },
  beforeDestroy () {
    this.resetOpenTodo()
  }
})
</script>