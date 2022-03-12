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
import TheToaster from '@/components/ui/TheToaster.vue';
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
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
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
    },
    IsEntered(){
      return this.note.title || this.note.content
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
    console.log(this.isClickedSavedBtn || !this.IsEnteredTitle)
    if(this.isClickedSavedBtn || !this.IsEnteredTitle){
      const res = confirm('保存しますか？') 
      if(res){
        await this.save(this.note)
        next()
      }
    }else{
      next()
    }
    next()
  } 
})
</script>
