<style lang="scss">
@import "./TheDraft";
</style>

<template>
  <div class="draft">
    <the-sidebar :drawer.sync="drawer" />
    <the-header :drawer.sync="drawer" />
    <v-main top="0">
      <div class="draft__content">
        <v-text-field
          class="mt-3 px-2 draft__ttl-input"
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
        />
        <div class="draft__toolbar">
          <div class="rigth-content">
            <v-btn
              tile
              color="primary"
              :disabled="disabled"
              @click="closeAndSave"
            >
              <span class="font-weight-black"
                ><v-icon class="mr-2">mdi-content-save</v-icon
                >保存して閉じる</span
              >
            </v-btn>
          </div>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheSidebar from '@/components/TheSidebar/TheSidebar.vue'
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
  },
  methods: {
    async save(note){
      try{
        if(this.note.title){
          await axios.post('/api/v1/notes', note)
          store.dispatch('getToast', {msg: '保存しました', color: 'success', timeout: 3000})
        }else{
          store.dispatch('getToast', {msg: 'タイトルを入力してください', color: 'error', timeout: 2000})
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
