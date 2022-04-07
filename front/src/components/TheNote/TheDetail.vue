<style lang="scss" scoped>
@import './TheDetail.scss'
</style>

<template>
  <v-card class="note" width="960">
    <the-detail-header :id='note.id' />
    <div class="note__detail">
      <div class="ttl-inner">
        <h1 class="ttl-inner__ttl my-3 font-weight-black">
          {{ note.title }}
        </h1>
        <v-divider></v-divider>
      </div>
      <div class="content-inner">
        <div class="note__content-inner__txt mt-3">
          <mavon-editor
            :boxShadow="false"
            defaultOpen="preview"
            style="border: none"
            language="ja"
            previewBackground="#FFFFFF"
            :subfield="false"
            :toolbarsFlag="false"
            v-model="note.content"
          />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import TheDetailHeader from './TheDetailHeader.vue'

export default {
  data() {
    return{}
  },
  components: {
    TheDetailHeader
  },
  computed: {
    note() {
      return this.$store.getters['note/note']
    },
  }
}
</script>