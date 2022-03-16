<style lang="scss" scoped>
.note {
  min-height: 810px;
  &__ttl-inner{
    padding: 0 126px;
    &__ttl{
      font-size: 40px;
    }
  }
  &__content-inner{
    padding: 0 126px;
  }
}

</style>

<template>
  <v-card class="note py-10" max-width="960">
    <div class="note__ttl-inner">
      <h1 class="note__ttl-inner__ttl my-3 font-weight-black">
      {{ note.title }}
      </h1>
      <v-divider></v-divider>
    </div>
    <div class="note__content-inner my-7">
      <div class="note__content-inner__txt">
        {{ note.content }}
      </div>
    </div>
  </v-card>
</template>

<script>

export default {
  data() {
    return{}
  },
  computed: {
    note () {
      return this.$store.getters['note/note']
    },
  }
}
</script>