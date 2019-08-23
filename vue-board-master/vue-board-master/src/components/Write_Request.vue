<template>
    <div class="list">

      <!--modal창-->
        <modal  width="100%" height="440px" name="register">
          <p style="font-size:30px; margin-top:100px; margin-left:410px;font-weight:bold;">공지를 등록하시겠습니까?</p>
          <div style="margin-left:410px; margin-top:100px; display: inline-block;" @click="submit">
            <img src="@/assets/o red picto.svg" >
            <a style="font-size:30px; margin-left:10px; vertical-align:bottom; margin-top:100px;color:red;">네,등록하겠습니다.</a>
          </div>
          <div style="display: inline-block; margin-left:30px;" @click="hide_register">
            <img src="@/assets/x gray picto.svg" >
            <a style="font-size:30px; vertical-align:bottom; color:#DFE6E9">아니요.</a>
          </div>
        </modal>


        <modal  width="100%" height="440px" name="done">
          <p style="font-size:30px; margin-top:100px; margin-left:410px; font-weight:bold;">글이 등록되었습니다.</p>
          <div style="margin-left:410px; margin-top:100px; display: inline-block;" @click="hide_done">
            <img src="@/assets/back.svg" >
          </div>
        </modal>

        <modal width="100%" height="440px" name="cancel">
          <p style="font-size:30px; margin-top:100px; margin-left:410px;font-weight:bold;">작성 중인 글을 삭제하고 목록으로 돌아가시겠습니까?</p>
          <div style="margin-left:410px; margin-top:100px; display: inline-block;" @click="hide_cancel">
            <img src="@/assets/x red picto.svg" >
            <a style="font-size:30px; margin-left:10px; vertical-align:bottom; margin-top:100px;color:red;">아니요</a>
          </div>
          <div style="display: inline-block; margin-left:30px;" @click="back">
            <img src="@/assets/o gray picto.svg" >
            <a style="font-size:30px; vertical-align:bottom; color:#DFE6E9">네. 목록으로 돌아가겠습니다.</a>
          </div>
        </modal>

        <p class= "sub-title" ><a class="highlight">요청게시판</a></p>
        <p class= "sec-title">원하는 교육/세미나를 신청하는 공간입니다.</p>
        <br/>
      <div class="btn-right">
          <img src="@/assets/show_list_button.svg" @click="show_cancel" style="float:right">
          <img src="@/assets/ok_button.svg" @click="show_register" style="float:right">
            <!-- <button v-on:click="submit">완료</button> -->
        </div>
        <div class="for_write">
        <p>
          <a class="highlight" style="font-weight:bold; font-size:22px;">제목</a>
        </p>
        <p>
        <input type="text" v-model="title" style="width:100%; height:45px;"/>
        <p/>
        <p>
          <a class="highlight" style="font-weight:bold; font-size:22px;">작성자</a>
        </p>
        <p>
          <a style="font-weight:normal; font-size:20px;">{{aa.user_team_name}} {{aa.user_name}} {{aa.user_company_level}}</a>
        </p>

        <p>
          <a class="highlight" style="font-weight:bold; font-size:22px;">내용</a>
          <a>&emsp;Need mark down help? <a href="https://ui.toast.com/tui-editor/" style="color:#04A4BC">Click</a></a>
        </p>
          <v-flex>
            <editor v-model="editorText" height="700px"/>
          </v-flex>
          <v-flex xs12 sm6>
           <viewer :value="editorText" previewStyle="vertical" height="1000px" />
            </v-flex>
    </div>

    </div>
</template>

<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'
import {boardEdu_re,login} from "../config/firebase"
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

  data () {
    return {
        editorText: '',
        writer : name,
        password :"",
        title : "",
        date : "",
        order : ""
    }
  },
  firebase : {
        board : boardEdu_re,
        auth: login
  },
    computed : {
       aa : function(){
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
        this.$modal.show('register');
    },
    hide_register () {
        this.$modal.hide('register');
    },
    hide_done(){
        this.$modal.hide('done');
    },
    hide_cancel(){
        this.$modal.hide('cancel');
    },
    show_cancel(){
      this.$modal.show('cancel');
    },
    back : function(){
      this.$router.go(-1)
    },
    submit: async function(){
        this.$modal.hide('register');
        this.$modal.show('done');
        var date = new Date();
            var dateInfo = ""
            var Month = (date.getMonth()+1)
            if(Month < 10){
                Month = "0" + (date.getMonth()+1)
            }
            dateInfo = date.getFullYear()+'.'+ Month +'.'+date.getDate();
            this.date = dateInfo;
            if(this.title.length == 0 || this.editorText.length == 0 ){
                alert("공백은 불가합니다.")
                this.$modal.hide('done');
               return false
            }

            console.log(this.password)
            console.log(this.title);
            console.log(this.editorText);
            console.log(this.date);
            console.log(this.selected);
            //let new_ref = boardRef.child(this.selected+'/');
            //console.log(new_ref)
            //console.log(boardRef)
            boardEdu_re.push({title:this.title,content:this.editorText,date:this.date,order:this.board.length+1,num:0,like:0,view:0,user_team_name:this.aa.user_team_name,user_name:this.aa.user_name,user_company_level:this.aa.user_company_level,user_auth_check:this.aa.email.split('@')[0],agree_num:0})
            alert("완료하였습니다.");
            this.$router.go(-1)
    }
  }
}
</script>
<style src="@/assets/mycss_lib.css"></style>