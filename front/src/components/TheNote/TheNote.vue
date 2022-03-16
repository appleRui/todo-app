<style lang="scss" scoped>
.note{
  min-height: 850px;
}
</style>

<template>
  <v-card class="note" max-width="960">
    <v-card-title>
      <span class="text-h5">{{ note.title }}</span>
    </v-card-title>
    <v-card-text>
      {{ note.content }}
    </v-card-text>
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