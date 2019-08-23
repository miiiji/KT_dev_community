<template>
    <div class="list">
        <modal  width="100%" height="440px" name="register">
          <p style="font-size:30px; margin-top:100px; margin-left:410px;font-weight:bold;">해당 요청을 동의하시겠습니까?</p>
          <div style="margin-left:410px; margin-top:100px; display: inline-block;" @click="register">
            <img src="@/assets/o red picto.svg" >
            <a style="font-size:30px; margin-left:10px; vertical-align:bottom; margin-top:100px;color:red;">네, 동의하겠습니다.</a>
          </div>
          <div style="display: inline-block; margin-left:30px;" @click="hide_register">
            <img src="@/assets/x gray picto.svg" >
            <a style="font-size:30px; vertical-align:bottom; color:#DFE6E9">아니요.</a>
          </div>
        </modal>

        <modal  width="100%" height="440px" name="cancel">
          <p style="font-size:30px; margin-top:100px; margin-left:410px;font-weight:bold;">해당 요청동의를 취소하시겠습니까?</p>
          <div style="margin-left:410px; margin-top:100px; display: inline-block;" @click="cancel_list">
            <img src="@/assets/o red picto.svg" >
            <a style="font-size:30px; margin-left:10px; vertical-align:bottom; margin-top:100px;color:red;">네, 취소하겠습니다.</a>
          </div>
          <div style="display: inline-block; margin-left:30px;" @click="hide_cancel">
            <img src="@/assets/x gray picto.svg" >
            <a style="font-size:30px; vertical-align:bottom; color:#DFE6E9">아니요.</a>
          </div>
        </modal>

         <modal  width="100%" height="440px" name="done">
          <p style="font-size:30px; margin-top:100px; margin-left:410px; font-weight:bold;">신청이 완료되었습니다.</p>
          <div style="margin-left:410px; margin-top:100px; display: inline-block;" @click="hide_done">
            <img src="@/assets/back.svg" >
          </div>
        </modal>


        <modal height="auto" name="now_list">
          <p style="font-size:30px; margin:5%;font-weight:bold;">해당 요청 동의자 목록입니다</p>
          <p style="font-size:30px; margin-top:10px; margin-left:70%;">총계 <a style="font-weight:bold; font-size:60px;">{{aa.num}}</a>명</p>

          <ul id="example-1" style="text-align:center; font-size:24px;">
            <li>
              <a style="margin-right:30%; border-bottom:solid 2px #414042;">동의자</a>
              <a style=" border-bottom:solid 2px #414042;">부서</a>
            </li>
            <li v-for="text in aa.list" v-bind:key="text['.key']">
              <a>{{ text.name }}&emsp;&emsp;&emsp;</a>
              <a>{{ text.team }}</a>
            </li>
          </ul>
          <div style="float:right; margin-left:30px;" @click="hide_now_list">
            <img src="@/assets/x black picto.svg" >
          </div>
        </modal>


        <p class= "sub-title" ><a class="highlight">요청게시판</a></p>
        <p class= "sec-title">원하는 교육/세미나를 신청하는 공간입니다.</p>
        <div class="btn-right">
          <img src="@/assets/show_list_button.svg" @click="back" style="float:right; margin-left:10px">
          <img src="@/assets/agree.svg" @click="show_register" style="float:right; margin-left:10px">
            <!-- <button v-on:click="submit">완료</button> -->
        </div>
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

    <div style=" margin-top: 3%"> <!--border-top:1px solid #666;-->
        <ul id="example-1" style="text-align:left; font-size:24px; margin-top: 3%; font-weight:100">
            <li>
              <a style="font-weight:400">동의자</a><br/>
            </li>
            <li v-for="text in aa.list" v-bind:key="text['.key']">
              <a>{{ text.name }}&emsp;</a>
              <a>({{ text.team }})</a>
            </li>
          </ul>
        </div>

        <div class="btn-right">
            <a href="javascript:;" v-on:click="editBtn">수정</a>
            <button v-on:click="deleteBtn">삭제</button>
        </div>

    </div>
</template>
<script>
import {boardEdu_re,login} from "../config/firebase"
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'
import firebase from "firebase"

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
       board : boardEdu_re,
       auth: login
   },
   computed : {

       aa : function(){
           var no = this.no;
            console.log(no)
           var arr = this.board.filter(function(item){
               return item['.key'] == no;
           });
           if(arr.length ==1) return arr[0];
           else return {};
       },
       bb : function(){
           var no = name;
           console.log(name)
           var arr = this.auth.filter(function(item){
               return item['.key'] == name;
           });
           if(arr.length ==1) return arr[0];
           else return {};
       }
   },
   methods : {
    show_register () {
        var modal = this.$modal;
        var show_name = this.bb.user_name;
        console.log(this.bb.user_name)

        var no = this.no;
        var arr = this.board.filter(function(item){
            boardEdu_re.child(no).child('list').once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot){
                    //console.log(childSnapshot.val().name)
                    //console.log(temp_list);
                    if(show_name == childSnapshot.val().name){
                          console.log('이미 존재하니까 삭제할게여^^^^;;;;')
                          modal.show('cancel');
                    }else{
                        console.log('djqtdma삭제할게여^^^;;;;')
                          modal.show('register');
                        }

                    })
                  });
                return item['.key'] == no;
          });
          modal.show('register');
      },
      register: function(){
          this.$modal.hide('register');
          this.$modal.show('done');
          console.log(boardEdu_re.child(this.no))
          var ref_num = boardEdu_re.child(this.no).child('num');
          var num;

          ref_num.on("value", function(snapshot) {
            num = snapshot.val();
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });

          num = num+1;
          console.log(typeof list);
          console.log(this.bb)
          boardEdu_re.child(this.no).child('list').push({name:this.bb.user_name,team:this.bb.user_team_name});
          boardEdu_re.child(this.no).child('num').set(num);
      },
      hide_register () {
        this.$modal.hide('register');
      },
      hide_cancel(){
        this.$modal.hide('cancel');
        this.$modal.hide('register');
      },
      show_now_list() {
         this.$modal.show('now_list');
      },
      hide_now_list() {
        this.$modal.hide('now_list');
      },
      show_done(){
        this.$modal.show('done');
      },
      hide_done(){
        this.$modal.hide('done');
      },
       editBtn : function(){
           var no = this.no;
           console.log(this.aa.user_auth_check)
           if(name === this.aa.user_auth_check.split('@')[0]){
               this.$router.push("/request_edit/"+no);
           }else{
               alert("접근 권한이 없습니다.");
               return;
           }
       },
         deleteBtn : function(){
           var no = this.no;
            console.log(this.aa.user_auth_check)
            console.log(name)
           if(name === this.aa.user_auth_check.split('@')[0]){
                boardEdu_re.child(no).remove();
                history.back();
           }else{
               alert("접근 권한이 없습니다.");
               return;
           }
       },
       cancelBtn : function(){
            this.$router.go(-1)
       },
       like : function(){
            boardEdu_re.child(this.no).update({like:(Number(this.aa.like)+1)});
       },
       back : function(){
            this.$router.go(-1)
       },
       cancel_list: function(){
               this.$modal.hide('register');
         var modal = this.$modal;
         var show_name = this.bb.user_name;
          var no = this.no;
          var ref_num = boardEdu_re.child(this.no).child('num');
          var num;
          ref_num.on("value", function(snapshot) {
                  num = snapshot.val();
                  console.log(snapshot.val())
            }, function (errorObject) {
                  console.log("The read failed: " + errorObject.code);
                });

          num = num-1;

          var arr = this.board.filter(function(item){
            boardEdu_re.child(no).child('list').once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot){
                  console.log(childSnapshot.val().name)

                   if(show_name == childSnapshot.val().name){
                      var temp = String(childSnapshot.key)
                        boardEdu_re.child(no).child('num').set(num);
                        boardEdu_re.child(no).child('list/'+temp).remove()
                        modal.hide('cancel');
                        //modal.show('done');
                        return;
                      }else{


                    }
                  })
                });
               return item['.key'] == no;
          });
       }
   }
}
</script>

<style src="@/assets/mycss_lib.css"></style>