
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
      <v-simple-checkbox :ripple="false"></v-simple-checkbox>
    </div>
    <div class="detail">
      <div class="detail__overview" @click="chengeComponent">
        <div class="name">
          {{ selectedTodo.name }}
        </div>
        <div class="discription">
          {{ selectedTodo.content }}
        </div>
      </div>
      <div class="date-time">
        <v-chip class="mt-2" label outlined>
          <v-icon size="16">mdi-calendar-month</v-icon>
          {{ selectedTodo.date }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
export default {  
  data(){
    return{
        selectedTodo: {}
      }
  },
  created() {
    this.selectedTodo = this.$store.state.todo.setOpenTodo
  },
  methods: {
    chengeComponent(){
      this.$emit('chengeComponent')
    }
  },
}
</script>