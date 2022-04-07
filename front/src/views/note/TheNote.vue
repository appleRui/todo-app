<style lang="scss" scoped>
.the-note {
  margin: 0 auto;
  max-width: 720px;
  .v-sheet.v-card::v-deep {
    box-shadow: none;
  }
  &__detail {
    margin-top: 3rem;
  }
  .v-note-wrapper::v-deep .v-note-panel .v-note-show .v-show-content {
    padding: 0;
  }

  .markdown-body::v-deep code {
    background-color: rgba(0, 0, 0, 0);
  }

  .markdown-body::v-deep .hljs {
    background: #f6f8fa;
  }
  .markdown-body::v-deep {
    z-index: 1;
  }
}
</style>

<template>
  <div class="the-note">
    <v-card width="960">
      <div class="the-note__detail">
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
  </div>
</template>

<script>
import axios from '@/services/http'

export default {
  data() {
    return{
      note: null,
      drawer: false,
    }
  },
  async created(){
    const id = this.$route.params.id
    const { data } = await axios.get(`/api/v1/notes/${id}`)
    this.note = data.note
  }
}
</script>
