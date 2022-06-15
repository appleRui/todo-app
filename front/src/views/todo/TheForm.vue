<style lang="scss" scoped>
.todo-form{
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
// import axios from '@/services/http'
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
  async created(){
  },
  methods: {
  },
  computed: {
    
  }
}
</script>