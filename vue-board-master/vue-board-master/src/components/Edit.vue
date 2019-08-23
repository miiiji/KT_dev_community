<template>
    <div class="list">
        <p class="sub-title">게시글 작성</p>
        <table :val="dataVal">
            <colgroup>
                <col width="15%" />
                <col width="85%" />
            </colgroup>
            <tbody>
                <tr>
                    <th>작성자</th>
                    <td><input type="text"  v-model="aa.writer" /></td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td><input type="text" v-model="aa.title" /></td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <v-flex>
                        <editor v-model="aa.content" v-on:keyup="textarea"/>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <viewer :value="aa.content" />
                        </v-flex>
                        <v-flex xs12>
                          <span>{{content}}</span>
                        </v-flex>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="btn-right">
            <button v-on:click="submitBtn">확인</button>
            <button v-on:click="cancelBtn">취소</button>
        </div>
    </div>
</template>

<script>
import {boardStudy} from "../config/firebase"
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'

export default {
    components: {
        'editor': Editor,
        'viewer': Viewer
    },

   created : function(){
       this.no = this.$route.params.no;
   },
   data : function(){
       return {
           no : "",
           writer : "",
           title : "",
           content : "",
           order : "",
           date : "",
           password : "",
           editorText: '',
       }
   },
   firebase : {
       board : boardStudy
   },
   computed : {
       aa : function(){
           var no = this.no;
           var arr = this.board.filter(function(item){
               return item['.key'] == no;
           });
           if(arr.length ==1) return arr[0];
           else return {};
       },
       dataVal : function(){
           this.writer = this.aa.writer;
           this.title = this.aa.title;
           this.content = this.aa.content;
           this.order = this.aa.order;
           this.date = this.aa.date;
           this.password = this.aa.password;
       }
   },
   methods : {
       writeEdit:function(e){
           var val = e.target.value;
           this.writer = val;
           console.log(this.writer);
       },
       submitBtn : function(){
            var no = this.no;

            boardStudy.child(no).set({title:this.title,content:this.content,password:this.password});
            this.$router.go(-1)
       },
       cancelBtn : function(){
           var con = confirm("수정을 취소하시겠습니까?");
           if(con){
               history.back();
           }else{
               return false;
           }
       },
        textarea : function(e){
            var val = e.target.value;
            val = val.replace(/(\n)/g, '<br>');
            this.content = val;
        }
   }
}
</script>

<style src="@/assets/mycss_lib.css"></style>

