
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


      <!--코드 시작-->
        <p class= "sub-title" ><a class="highlight">기술공유</a></p>
        <p class= "sec-title">기술 교류, 성공/실패 사례, 정보 공유를 하는 공간 입니다.</p>
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
          <a class="highlight" style="font-weight:bold; font-size:22px;">카테고리</a>
        </p>
        <p>
              <select v-model="selected" style="width:40%; height:45px;">
                          <option disabled value="">카테고리를 고르세요.</option>
                          <option>Shooting</option>
                          <option>Setting</option>
                          <option>Study</option>
                  </select>
        </p>
        <p>
          <a class="highlight" style="font-weight:bold; font-size:22px;">작성자</a>
        </p>
        <p>
          <a style="font-weight:normal; font-size:20px;">{{aa.user_team_name}} {{aa.user_name}} {{aa.user_company_level}}</a>
        </p>
        <p>
          <a class="highlight" style="font-weight:bold; font-size:22px;">메인 이미지</a>
        </p>

        <p>
        <input type="file" @change="onFileChange">
        </p>

        <p>
          <a class="highlight" style="font-weight:bold; font-size:22px;">내용</a>
          <a>&emsp;Need mark down help? <a href="https://ui.toast.com/tui-editor/" style="color:#04A4BC">Click</a></a>
        </p>


                <v-flex>
            <editor v-model="editorText" height="700px"/>
          </v-flex>
          <v-flex xs12 sm6>
           <viewer :value="editorText" previewStyle="tab"
    height="1000px"
/>
            </v-flex>


      </div>
    </div>
</template>

<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'
import FileUploader from 'tui-file-uploader';
import {boardStudy,login} from "../config/firebase"
import firebase from "firebase"

var name;
var img_link;


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
    'viewer': Viewer,
    'uploader': FileUploader
  },

  data () {
    return {
        editorText: '',
        writer : name,
        title : "",
        date : "",
        order : "",
        selected: "",
        file:""
    }
  },
    firebase : {
        board : boardStudy,
        auth: login
  },
    computed : {
       aa : function(){

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
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {

      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        //console.log(e.target.result);
        //console.log("!!!!");
        this.img_link = e.target.result;
        console.log(img_link);
      };
      reader.readAsDataURL(file);
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
            console.log(this.img_link);
            boardStudy.push({img:this.img_link ,category:this.selected,title:this.title,content:this.editorText,date:this.date,like:0, view:0,user_team_name:this.aa.user_team_name,user_name:this.aa.user_name,user_company_level:this.aa.user_company_level,user_auth_check:this.aa.email.split('@')[0]})
            alert("완료하였습니다.");
            this.$router.go(-1)
    }
  }
}
</script>
<style src="@/assets/mycss_lib.css"></style>