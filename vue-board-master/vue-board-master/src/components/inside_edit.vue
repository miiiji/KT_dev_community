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
import {boardEdu_in} from "../config/firebase"
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
       board : boardEdu_in
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
           this.picked = this.aa.picked;
           this.lotto_date= this.aa.lotto_date;
           this.start_date= this.aa.start_date;
           this.end_date= this.aa.end_date;
           this.apply_total_number= this.aa.apply_total_number;
           this.order = this.aa.order;
           this.date = this.aa.date;
           this.num = this.aa.num;
           this.like = this.aa.like;
           this.view = this.aa.view;
           this.user_team_name = this.aa.user_team_name;
           this.user_name = this.aa.user_name;
           this.user_company_level = this.aa.user_company_level;
           this.user_auth_check = this.aa.user_auth_check;
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

            boardEdu_in.child(no).set({title:this.title,content:this.content,date : this.date,
              picked:this.picked,
              lotto_date: this.lotto_date,
              start_date: this.start_date,
              end_date:this.end_date,
              apply_total_number: this.apply_total_number,
              order: this.order,

              num : this.num,
              like : this.like,
              view : this.view,
              user_team_name : this.user_team_name,
              user_name : this.user_name,
              user_company_level : this.user_company_level,
              user_auth_check : this.user_auth_check});
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

