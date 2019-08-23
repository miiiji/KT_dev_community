<template>
    <div class="list">
        <p class= "sub-title" ><a class="highlight">사내교육</a></p>
        <p class= "sec-title">사내에서 주최하는 교육/세미나 관련 공지사항을 올려드립니다.</p>
        <br/>
        <p class="search">
            <input v-model="searchText" placeholder="검색어를 입력하세요." class="search_input" type="text" />
            <img  src="@/assets/search_button.svg" style="float:right">
        </p>
        <p class="write">
            <router-link to="/writenotice"><img src="@/assets/ok_notice_button.svg" style="float:right; margin-left:10px"></router-link>
        </p>
         <p class="write">
            <router-link to="/Calendar"><img src="@/assets/calendar.svg" style="float:right"></router-link>
        </p>

        <table ref="board">
            <caption style="display:none;">게시글 목록</caption>
            <colgroup>
                <col width="10%" />
                <col width="55%" />
                <col width="20%" />
                <col width="5%" />
                <col width="5%" />
                <col width="5%" />ㄴ
            </colgroup>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>신청</th>
                    <th>대기</th>
                    <th>날짜 </th>
                    <!-- <th>작성일</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(text,key) in filterSearch.reverse()" v-bind:key="text.key" >
                        <td>{{key+1}}</td>
                        <td style="font-size:20px;" v-on:click="view(text.key,text.view)"><router-link :to="'/view_education/'+text.key">{{text.title}}</router-link></td>
                        <td>{{text.user_name}} {{text.user_company_level}}({{text.user_team_name}})</td>
                        <td v-if="text.num<=text.apply_total_number">{{text.num}}/{{text.apply_total_number}}</td>
                        <td v-else>{{text.apply_total_number}}/{{text.apply_total_number}}</td>
                        <td v-if="text.num<=text.apply_total_number">0</td>
                        <td v-else>{{Number(text.num)-Number(text.apply_total_number)}}</td>
                        <td>{{text.start_date}}~{{text.end_date}}</td>
                        <!-- <td>{{text.date}}</td> -->
                </tr>
            <!-- <div v-if="this.texts.length!=0">
                <tr v-for="text in this.texts" v-bind:key="'Education_Inside'+text['.key']" >
                        <td v-on:click="view(text['.key'],text.view)"><router-link :to="'/view_education/'+text['.key']">{{text.title}}</router-link></td>
                        <td style="font-size:20px;">{{text.user_name}} {{text.user_company_level}}({{text.user_team_name}})</td>
                        <td>{{text.num}}/{{text.apply_total_number}}</td>
                        <td>{{text.date}}</td>
                </tr>
            </div> -->

            </tbody>
        </table>
    </div>
</template>

<script>
import {boardEdu_in,login} from "../config/firebase"
import firebase from 'firebase'
import _ from 'lodash';



var orderBy = require('lodash.orderby');

var name;
var temp_list = [];

boardEdu_in.once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot){
            console.log(childSnapshot.val())
			temp_list.push({key:childSnapshot.key,start_date:childSnapshot.val().start_date,end_date:childSnapshot.val().end_date,title:childSnapshot.val().title,apply_total_number:childSnapshot.val().apply_total_number,content:childSnapshot.val().content,date:childSnapshot.val().date,order:childSnapshot.order,num:childSnapshot.val().num,like:childSnapshot.val().like,view:childSnapshot.val().view,user_team_name:childSnapshot.val().user_team_name,user_name:childSnapshot.val().user_name,user_company_level:childSnapshot.val().user_company_level,user_auth_check:childSnapshot.val().user_auth_check})
			console.log(temp_list)
          })
});

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
    name : "List",
     data() {
        return {
            texts : temp_list,
            searchText: ""
        }
    },
    firebase : {
        board : boardEdu_in,
        auth: login
    },
    created() {
    },
    computed: {
        filterSearch: function(){
             return this.texts.filter((text)=>{
                 console.log(this.texts)
                 console.log(text)
                return text.title.match(this.searchText);
             })
    }
     },
    methods: {
        // searching: function(){
        // },
        // filterSearch: function(){
        //      return this.texts.filter((text)=>{
        //          console.log(this.texts)
        //          console.log(text)
        //         return text.title.match(this.searchText);
        //      })
        view: function(no,view){
            this.no = no;
            console.log(no)
            console.log(view)
            console.log(boardEdu_in.child(no))
            boardEdu_in.child(no).update({view:(Number(view)+1)});
        },
        getUsers: function(){
            this.texts = this.board.slice().reverse();
            console.log(this.texts)
        }
    }
}


</script>

<style src="@/assets/mycss_lib.css">
</style>

