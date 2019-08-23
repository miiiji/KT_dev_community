<template>
    <div class="list">
        <p class= "sub-title" ><a class="highlight">기술공유</a></p>
        <p class= "sec-title">기술 교류, 성공/실패 사례, 정보 공유를 하는 공간 입니다.</p>
        <br/>
        <img src="@/assets/show_list_button.svg" @click="back" style="float:right">

        <div class="title">
            {{aa.title}}
        </div>
        <div class="view_info">
              <div style="font-size:20px; font-weight:100;  margin-top:2%; display:inline-block;">
                                <img src="@/assets/date picto.svg">
                                {{aa.date}}
                            </div>
                            <div style="font-size:20px; font-weight:100;  margin-top:2%; margin-left:1%; display:inline-block;">
                                <img src="@/assets/view picto.svg">
                                {{aa.view}}
                            </div>
                            <div style="font-size:20px; font-weight:100;  margin-top:2%; margin-left:1%; display:inline-block;">
                                <img src="@/assets/좋아요 picto.svg">
                                {{aa.like}}
                            </div>
                            <div style="font-size:20px; font-weight:100;  margin-top:2%; margin-left:1%; display:inline-block;">
                                <img src="@/assets/좋아요 not clicked.svg" v-on:click="like">

                            </div>
        </div>
        <table style="margin-top:3%">
            <colgroup>
                <col width="15%" />
                <col width="85%" />
            </colgroup>
            <tbody>
                <tr>
                        <v-flex xs12 sm6>
                          <viewer :value="aa.content" />
                        </v-flex>
                   <!-- <td v-html="aa.content" class="divCon"></td>-->
                </tr>
            </tbody>
        </table>

        <div class="btn-right">
            <button v-on:click="cancelBtn">리스트</button>
            <a href="javascript:;" v-on:click="editBtn">수정</a>
            <button v-on:click="deleteBtn">삭제</button>
        </div>
    </div>
</template>
<script>
import {boardStudy,login} from "../config/firebase"
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import firebase from "firebase"
import { Editor, Viewer } from '@toast-ui/vue-editor'

var name;

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  // User is signed in.
  console.log(login.child(user.email.split('@')[0]));
  name = user.email.split('@')[0];
  //console.log()
} else {
  console.log('no')
  // No user is signed in.
}
});


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
           content : ""
       }
   },
   firebase : {
       board : boardStudy
   },
   computed : {
      aa : function(){
            var no = this.no;
            console.log(name)
            console.log(no)

            var arr = this.board.filter(function(item){
               return item['.key'] == no;
           });
           if(arr.length ==1) return arr[0];
           else return {};
       },
   },
   methods : {
       editBtn : function(){
           var no = this.no;
           console.log(this.aa.user_auth_check)
           if(name === this.aa.user_auth_check.split('@')[0]){
               this.$router.push("/edit/"+no);
           }else{
               alert("접근 권한이 없습니다.");
               return;
           }
       },
       deleteBtn : function(){
           var no = this.no;
           if(name === this.aa.user_auth_check.split('@')[0]){
               boardStudy.child(no).remove();
            history.back();

           }else{
               alert("접근 권한이 없습니다.");
               return;
           }
       },
       cancelBtn : function(){
            this.$router.go(-1)
       },
       back : function(){
            this.$router.go(-1)
       },
       like : function(){
            boardStudy.child(this.no).update({like:(Number(this.aa.like)+1)});
       }
   }
}
</script>
<style src="@/assets/mycss_lib.css"></style>