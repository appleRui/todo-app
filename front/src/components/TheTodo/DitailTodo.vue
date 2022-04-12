<style lang="scss" scoped>
.the-todo {
  &__inner {
    display: flex;
    .check-box {
      margin-right: 0.75rem;
    }
    .detail {
      width: 100%;
      &__overview {
        .name {
          font-size: 20px;
          font-weight: 600;
        }
        .contetn {
          font-size: 16px;
        }
      }
      .date-time {
        margin: 1rem 0;
      }
    }
  }
}
</style>

<template>
  <div class="the-todo__inner">
    <div class="check-box">
      <v-simple-checkbox
        v-model="todo.check"
        :ripple="false"
        @click="done(todo.id)"
      ></v-simple-checkbox>
    </div>
    <div class="detail">
      <div class="detail__overview" @click="chengeComponent">
        <div class="name">
          {{ todo.name }}
        </div>
        <div class="discription">
          {{ todo.content }}
        </div>
      </div>
      <div class="date-time">
        <v-chip class="mt-2" label outlined>
          <v-icon size="16">mdi-calendar-month</v-icon>
          {{ todo.date }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/http'

export default {  
  data(){
    return {
      todo: {}
    }
  },
  async created() {
    const id = this.$store.state.todo.setOpenTodo
    const { data } = await axios.get(`api/v1/todos/${id}`)
    this.todo = data.todo
  },
  methods: {
    chengeComponent(){
      this.$emit('chengeComponent')
    },
    async done(id){
      try{
        await axios.patch(`/api/v1/todos/${id}`, {check: true})
      }catch(e){
        console.error(e)
      }
    },
  },
}
</script>