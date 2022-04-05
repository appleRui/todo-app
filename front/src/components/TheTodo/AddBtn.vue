<style lang="scss" scoped>
.add-btn {
  cursor: pointer;
  .txt {
    font-size: 15px;
  }
}
</style>

<template>
  <div class="add-btn" @click="onClickAddBtn">
    <v-icon size="19" color="primary">mdi-pencil-plus</v-icon
    ><span class="txt">タスクを追加</span>
  </div>
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