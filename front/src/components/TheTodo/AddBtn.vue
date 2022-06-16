<style lang="scss" scoped>
.add-btn {
  cursor: pointer;
  .txt {
    font-size: 15px;
  }
}
</style>

<template>
  <v-btn class="add-btn" color="primary" @click="onClickAddBtn">
    <v-icon size="19" color="white">mdi-pencil-plus</v-icon
    ><span class="txt">タスクを追加</span>
  </v-btn>
</template>

<script>
export default {
  methods: {
    onClickAddBtn(){
      this.$emit('onClickAddBtn')
    }
  },
}
</script>