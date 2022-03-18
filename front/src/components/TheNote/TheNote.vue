<style lang="scss">
.note {
  min-height: 810px;
  &__ttl-inner {
    padding: 0 13%;
    &__ttl {
      font-size: 40px;
    }
  }
  &__content-inner {
    padding: 0 13%;
  }
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content{
    padding: 0;
  }
}

</style>

<template>
  <v-card class="note py-10" width='960'>
    <div class="note__ttl-inner">
      <h1 class="note__ttl-inner__ttl my-3 font-weight-black">
        {{ note.title }}
      </h1>
      <v-divider></v-divider>
    </div>
    <div class="note__content-inner">
      <div class="note__content-inner__txt mt-3">
        <mavon-editor
          :boxShadow=false
          defaultOpen="preview"
          style="border: none;"
          language="ja"
          previewBackground="#FFFFFF"
          :subfield=false
          :toolbarsFlag=false
          v-model="note.content"
        />
      </div>
    </div>
  </v-card>
</template>

<script>
import 'mavon-editor/dist/css/index.css'

export default {
  data() {
    return{}
  },
  computed: {
    note() {
      return this.$store.getters['note/note']
    },
  }
}
</script>