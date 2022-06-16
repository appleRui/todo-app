<style lang="scss" scoped>
.todo-form {
  margin-top: 2rem;
}
</style>

<template>
  <div class="todo-form">
    <h2>{{ title }}</h2>
    <TheEditer />
  </div>
</template>

<script>
import TheEditer from '@/components/TheTodo/TheEditer.vue'

export default {
  components: {
    TheEditer
  },
  data() {
    return {
      title: "新規登録"
    }
  },
  async created() {
    const path = this.$route.path
    const regex = /todos\/edit\/[1-9]/
    if(regex.test(path)) {
      this.title = "TODO編集"
    }
  }
}
</script>