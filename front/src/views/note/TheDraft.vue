<style lang="scss" scoped>
.markdown-body {
  margin-top: 0;
}
.v-btn:not(.v-btn--round).v-size--default {
  height: auto;
  padding: 16px;
}
.add-note-btn {
  padding: 1rem;
  background-color: #db4c3f;
  border-radius: 50%;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
}
.v-note-panel {
  min-height: 82vh;
}
</style>

<template>
  <div class="draft">
    <the-sidebar :drawer.sync="drawer" />
    <the-header :drawer.sync="drawer" />
    <v-main top="0">
      <v-text-field
        class="mt-3 pr-2 pl-2"
        v-model="note.title"
        label="タイトル"
        outlined
        dense
      ></v-text-field>
      <mavon-editor
        placeholder="Markdownで記述できます！"
        v-model="note.content"
        :toolbars="toolbars"
        language="ja"
        @save="save(note)"
      />
    </v-main>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :disabled="disabled"
          @click="closeAndSave"
          class="add-note-btn"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </template>
      <span>保存して閉じる</span>
    </v-tooltip>
    <theToaster />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheSidebar from '@/components/TheSidebar/TheSidebar.vue'
import TheToaster from '@/components/Modules/TheToaster.vue';
import axios from '@/services/http'
import store from '@/store/modules/toaster'
import 'mavon-editor/dist/css/index.css'

export default({
  data() {
    return{
      drawer: false,
      note: {
        title: '',
        content: ''
      },
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true, 
        ul: true, 
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: false,
        help: true,
        undo: true,
        redo: true,
        trash: false,
        save: false,
        navigation: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: true,
        preview: true,
      },
      isClickedSavedBtn: false
    }
  },
  components: {
    TheHeader,
    TheSidebar,
    TheToaster
  },
  methods: {
    async save(note){
      try{
        if(this.note.title){
          await axios.post('/api/v1/notes', note)
          store.dispatch('getToast', {msg: '保存しました', color: 'success', timeout: 3000})
        }else{
          store.dispatch('getToast', {msg: 'タイトルを入力してください', color: 'error', timeout: 3000})
        }
      }catch(e){
        console.error(e)
      }
      this.isClickedSavedBtn = true
    },
    async closeAndSave(){
      await this.save(this.note)
      this.$router.push('/notes')
    }
  },
  computed: {
    disabled(){
      return !this.note.title || !this.note.content
    },
    IsEnteredTitle(){
      return !this.note.title
    }
  },
  async beforeRouteLeave(to, from, next) {
    if(this.isClickedSavedBtn) next()
    if(!this.isClickedSavedBtn && !this.IsEnteredTitle){
      const res = confirm('保存しますか？')
      if(res){
        this.save(this.note)
        next()
      }else{
        next()
      }
      next()
    }
    next()
  } 
})
</script>
