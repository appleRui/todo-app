<style lang="scss">
</style>

<template>
  <v-card class="the-todo py-6 px-4" width="650">
    <component
      :is="displayComponent"
      @chengeComponent="chengeComponent"
      @onClickCansel="onClickCansel"
    ></component>
  </v-card>
</template>

<script>
import DisplayTodo from './DitailTodo.vue'
import TheEditer from './TheEditer.vue'

export default {
  components:{
    DisplayTodo,
    TheEditer
  },
  data(){
    return{
      displayComponent: 'DisplayTodo',
    }
  },
  methods: {
    chengeComponent(){
      this.displayComponent = 'TheEditer'
    },
    onClickCansel(){
      this.displayComponent = 'DisplayTodo'
    },
  },
}
</script>