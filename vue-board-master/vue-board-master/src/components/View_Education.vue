<template>
    <div class="list">
        <!--modal 창들-->
        <modal  width="100%" height="440px" name="register">
          <p style="font-size:30px; margin-top:100px; margin-left:410px;font-weight:bold;">해당 사내교육을 신청하시겠습니까?</p>
          <div style="margin-left:410px; margin-top:100px; display: inline-block;" @click="register">
            <img src="@/assets/o red picto.svg" >
            <a style="font-size:30px; margin-left:10px; vertical-align:bottom; margin-top:100px;color:red;">네, 신청하겠습니다.</a>
          </div>
          <div style="display: inline-block; margin-left:30px;" @click="hide_register">
            <img src="@/assets/x gray picto.svg" >
            <a style="font-size:30px; vertical-align:bottom; color:#DFE6E9">아니요.</a>
          </div>
        </modal>


        <modal  width="100%" height="440px" name="cancel">
          <p style="font-size:30px; margin-top:100px; margin-left:410px;font-weight:bold;">해당 사내교육을 취소하시겠습니까?</p>
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
            <div style="margin: 3%" v-if="aa.picked=='선착순'"> <!--border-top:1px solid #666;-->
            <p style="font-size:30px; margin:5%;font-weight:bold;">해당 사내교육 신청자 목록입니다</p>
             <p style="font-size:30px; margin-top:10px; margin-left:70%;">총계 <a style="font-weight:bold; font-size:60px;">{{aa.num}}</a>명</p>
                <ul   id="example-1" style="text-align:left; font-size:24px; margin-top: 3%; font-weight:100">
                    <li>
                      <a style="font-weight:400">신청자</a><br/>
                    </li>
                    <li v-for="(text,key,index) in aa.list" v-bind:key="text['.key']">
                      <a>{{ text.name }}&emsp;</a>
                      <a>({{ text.team }})</a>
                      <a style="font-weight:400" v-if="index>Number(aa.apply_total_number)-1">- 현재 대기자 입니다.</a>
                    </li>
                  </ul>
                </div>


        <div style=" margin:3%" v-if="aa.picked=='추첨제'"> <!--border-top:1px solid #666;-->
        <p style="font-size:30px; margin:5%;font-weight:bold;">해당 사내교육 추첨자 목록입니다</p>
        <p style="font-size:30px; margin-top:10px; margin-left:70%;">총계 <a style="font-weight:bold; font-size:60px;">{{aa.apply_total_number}}</a>명</p>
        <ul v-if="inlist" id="example-1" style="text-align:left; font-size:24px; margin-top: 3%; font-weight:100">
            <li>
              <a style="font-weight:400">추첨결과</a><br/>
            </li>
            <li v-for="(text,key) in lotto_list" v-bind:key="text['.key']">
              <!-- <a>{{index}}</a>
               <a>{{key}}</a> -->
              <a v-if="key<Number(aa.apply_total_number)">{{ text.name }}&emsp;</a>
              <a v-if="key<Number(aa.apply_total_number)">({{ text.team }})</a>
              <!-- <a style="font-weight:400" v-if="index>Number(aa.apply_total_number)-1">- 현재 대기자 입니다.</a> -->
            </li>
          </ul>
        </div>

          <div style="float:right; margin-left:30px;" @click="hide_now_list">
            <img src="@/assets/x black picto.svg" >
          </div>
        </modal>


        <!--코드시작-->
        <p class= "sub-title" ><a class="highlight">사내교육</a></p>
        <p class= "sec-title">사내에서 주최하는 교육/세미나 관련 공지사항을 올려드립니다.</p>
         <div class="btn-right">
          <img src="@/assets/show_list_button.svg" @click="back" style="float:right; margin-left:10px">
          <img src="@/assets/register_result.svg" @click="show_now_list" style="float:right; margin-left:10px">
          <span v-if="aa.picked=='선착순'">
            <span v-if="Number(aa.apply_total_number)<=Number(aa.num)">
            <img src="@/assets/waiting.svg" @click="show_register" style="float:right; margin-left:1%">
            </span>
            <span v-else>
              <img src="@/assets/register.svg" @click="show_register" style="float:right; margin-left:10px">
            </span >
          </span>
          <span v-if="aa.picked=='추첨제'">
             <img src="@/assets/lotto.svg" @click="show_register" style="float:right; margin-left:10px">
          </span>
            <!-- <button v-on:click="submit">완료</button> -->
        </div>

          <div class="title">
            {{aa.title}}
        </div>
        <div class="view_info">
                            <div style="font-size:20px; font-weight:100;  margin-top:2%; display:inline-block;">
                                <img src="@/assets/date picto.svg">
                                 {{aa.start_date}} - {{aa.end_date}}
                            </div>

                            <div style="font-size:20px; font-weight:100;  margin-top:2%; margin-left:1%; display:inline-block;">
                                <img src="@/assets/view picto.svg">
                                 {{aa.view}}
                            </div>
                              <div style="font-size:20px; font-weight:100;  margin-top:2%;  ">
                               <img src="@/assets/좋아요 picto.svg">
                                 <a style="font-weight:400" v-if="aa.picked=='선착순'">{{aa.picked}}</a>
                                 <a v-if="aa.picked=='추첨제'" style="font-weight:400">추첨일시 : {{aa.lotto_date}}</a>
                            </div>
        </div>

        <table style="margin-top:3%">
            <colgroup>
                <col width="15%" />
                <col width="85%" />
            </colgroup>
            <tbody>
                <tr >
                    <viewer :value="aa.content" height="500px" />
                   <!-- <td v-html="aa.content" class="divCon"></td>-->
                </tr>
            </tbody>
        </table>
        <div style=" margin-top: 3%" v-if="aa.picked=='선착순'"> <!--border-top:1px solid #666;-->
        <ul   id="example-1" style="text-align:left; font-size:24px; margin-top: 3%; font-weight:100">
            <li>
              <a style="font-weight:400">신청자</a><br/>
            </li>
            <li v-for="(text,key,index) in aa.list" v-bind:key="text['.key']">
              <a>{{ text.name }}&emsp;</a>
              <a>({{ text.team }})</a>
              <a style="font-weight:400" v-if="index>Number(aa.apply_total_number)-1">- 현재 대기자 입니다.</a>
            </li>
          </ul>
        </div>

        <div style=" margin-top: 3%" v-if="aa.picked=='추첨제'"> <!--border-top:1px solid #666;-->
        <ul id="example-1" style="text-align:left; font-size:24px; margin-top: 3%; font-weight:100">
            <li>
              <a style="font-weight:400">추첨결과</a><br/>
            </li>
            <li v-for="(text) in aa.lotto_list" v-bind:key="text['.key']">
               <a>{{text.name}}</a>
               <a>{{ text.team}}</a>
              <!-- <a v-if="key<Number(aa.apply_total_number)">{{ text.name }}&emsp;</a>
              <a v-if="key<Number(aa.apply_total_number)">({{ text.team }})</a> -->
              <!-- <a style="font-weight:400" v-if="index>Number(aa.apply_total_number)-1">- 현재 대기자 입니다.</a> -->
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
import {boardEdu_in,login} from "../config/firebase"
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'
import firebase from 'firebase'

var schedule = require('node-schedule');
var date;
console.log(date)

const j = schedule.scheduleJob('10 * * * *', function(){
   console.log('매 10초에 실행');


});

var hi;
var temp_list = [];
var real_list = [];
// var no = this.no;
// boardEdu_in.child(no).child('list').once('value').then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot){
//     temp_list.push({key:childSnapshot.val().list})
//     })
// });
// console.log(temp_list)

// boardEdu_in.child(no).child('list').once('value').then(function(snapshot) {
  //               snapshot.forEach(function(childSnapshot){
  //                     console.log(childSnapshot.val())
  //                     //console.log(temp_list);


  //                     })
  //   });

var name;
var real_lotto_date;

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
       var real_lotto_date;
       var no = this.no

      boardEdu_in.child(no).child('list').once('value').then(function(snapshot) {
                  snapshot.forEach(function(childSnapshot){
                  console.log(childSnapshot.val())
                  temp_list.push({key:childSnapshot.key,name:childSnapshot.val().name,team:childSnapshot.val().team})
                  console.log(temp_list);
          })
      });

       boardEdu_in.child(no).child('lotto_date').once('value').then(function(snapshot){
               real_lotto_date = String(snapshot.val());
               date = new Date(real_lotto_date.split('.')[0], real_lotto_date.split('.')[1], real_lotto_date.split('.')[2], 0, 0, 0);
               console.log(date)

                real_list = temp_list;
                temp_list.sort(function(){
                    return Math.random()-Math.random();
                });
                    //   // var temp_date = new Date(2019, 8, 14, 17, 46, 0)
                 var scheduler = schedule.scheduleJob(date, function(){
                        for(var i=0; i<temp_list.length; i++){
                          console.log(temp_list[i].name)
                          console.log(temp_list[i].team)
                          boardEdu_in.child(no).child('lotto_list').push({name:temp_list[i].name,team:temp_list[i].team});
                        }
                    })
             })
            console.log(temp_list)
   },
   data : function(){
       return {
           no : "",
           writer : "",
           title : "",
           content : "",
           num: "",
           inlist : false,
           lotto_list: temp_list
       }
   },
   firebase : {
       board : boardEdu_in,
       auth: login

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
       bb : function(){
           var arr = this.auth.filter(function(item){
               return item['.key'] == name;
           });
           if(arr.length ==1) return arr[0];
           else return {};
       }

   },
    methods : {
      random(){

      },
      show_register () {
        var modal = this.$modal;
        var show_name = this.bb.user_name;
        console.log(this.bb.user_name)
        console.log(this.aa.num)
        console.log(Number(this.aa.apply_total_number));
        if(this.aa.num >= Number(this.aa.apply_total_number)){
          console.log('신청인원이 초과하였습니다. 대기자 명단으로 등록되었습니다.');
        }
        var no = this.no;
        this.board.filter(function(item){
          boardEdu_in.child(no).child('list').once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot){
                    console.log(childSnapshot.val())
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
      register: function(){
          this.$modal.hide('register');
          this.$modal.show('done');
          console.log(boardEdu_in.child(this.no))
          var ref_num = boardEdu_in.child(this.no).child('num');
          var num;

          ref_num.on("value", function(snapshot) {
            num = snapshot.val();
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });

          num = num+1;
          console.log(typeof list);
          console.log(this.bb)
          boardEdu_in.child(this.no).child('list').push({name:this.bb.user_name,team:this.bb.user_team_name});
          boardEdu_in.child(this.no).child('num').set(num);
      },
       editBtn : function(){
           var no = this.no;
           console.log(this.aa.user_auth_check)
           if(name === this.aa.user_auth_check.split('@')[0]){
               this.$router.push("/inside_edit/"+no);
           }else{
               alert("접근 권한이 없습니다.");
               return;
           }
       },
       deleteBtn : function(){
           var no = this.no;
           if(name === this.aa.user_auth_check.split('@')[0]){
                boardEdu_in.child(no).remove();
                history.back();
           }else{
               alert("접근 권한이 없습니다.");
               return;
           }
       },
       back : function(){
            this.$router.go(-1)
       },
       like : function(){
          boardEdu_in.child(this.no).update({like:(Number(this.aa.like)+1)});

       },
       cancel_list: function(){
         this.$modal.hide('register');
         var modal = this.$modal;
         var show_name = this.bb.user_name;
          var no = this.no;
          var ref_num = boardEdu_in.child(this.no).child('num');
          var num;
          ref_num.on("value", function(snapshot) {
                  num = snapshot.val();
                  console.log(snapshot.val())
            }, function (errorObject) {
                  console.log("The read failed: " + errorObject.code);
                });

          num = num-1;

          this.board.filter(function(item){
            boardEdu_in.child(no).child('list').once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot){
                  console.log(childSnapshot.val().name)

                   if(show_name == childSnapshot.val().name){
                      var temp = String(childSnapshot.key)
                        boardEdu_in.child(no).child('num').set(num);
                        boardEdu_in.child(no).child('list/'+temp).remove()
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