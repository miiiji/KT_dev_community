<template>
    <div class="list">
        <p class= "sub-title" ><a class="highlight">사외교육(후기)</a></p>
        <p class= "sec-title">외부 교육/세미나 후기를 올려드립니다.</p>
        <div class="btn-right">
          <img src="@/assets/show_list_button.svg" @click="back" style="float:right; margin-left:10px">
            <!-- <button v-on:click="submit">완료</button> -->
        </div>
        <div class="title">
            {{(aa.info.split('\n\n\n')[1]).split('\n')[1]}}
        </div>
        <div class="view_info">
            <div style="font-size:20px; font-weight:100;  margin-top:2%; display:inline-block;">
                <img src="@/assets/date picto.svg">
                    {{aa.time}}
            </div>

        </div>
        <table style="margin-top:3%">
            <colgroup>
                <col width="15%" />
                <col width="85%" />
            </colgroup>
            <tbody>
                  <a style="font-size:30px; text-align:left">{{((aa.info).split('\n\n\n')[1]).split('\n')[0]}}</a><br/>
                  <a style="font-size:30px; text-align:left">{{((aa.info).split('\n\n\n')[1]).split('\n')[1]}}</a><br/>
                  <a style="font-size:30px; text-align:left">{{(aa.info).split('\n\n\n')[2]}}</a><br/>
                   <!-- <td v-html="aa.content" class="divCon"></td>-->
            </tbody>
        </table>

    <div style=" margin-top: 3%"> <!--border-top:1px solid #666;-->
        <ul id="example-1" style="text-align:left; font-size:24px; margin-top: 3%; font-weight:100">
            <li>
              <a style="font-weight:bold;">후기 링크</a><br/>
            </li>
            <li v-for="text in aa.review_list" v-bind:key="text['.key']">
              <a :href="text" target="_blank">{{(text)}}</a><br/>
            </li>
          </ul>
        </div>

    </div>
</template>
<script>
import {boardEdu,login} from "../config/firebase"
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
       board : boardEdu,
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
           var arr = this.auth.filter(function(item){
               return item['.key'] == name;
           });
           if(arr.length ==1) return arr[0];
           else return {};
       }
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
            console.log(this.aa.user_auth_check)
            console.log(name)
           if(name === this.aa.user_auth_check.split('@')[0]){
                boardEdu.child(no).remove();
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
            boardEdu.child(this.no).update({like:(Number(this.aa.like)+1)});
       },
       back : function(){
            this.$router.go(-1)
       },
       cancel_list: function(){
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

         this.board.filter(function(item){
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