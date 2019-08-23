<template>
    <div class="list">
      <!-- <div class="home_first">
        <p class= "sub-title" ><a class="highlight" style="font-size:30px">이달의 나의 등급은?</a></p>
        <p class= "sec-title"></p>
        <br/>

        <div class="for_level">
          <a class="for_level_text" style="margin-left:20%; font-size:39px; color:#707070;">LV</a>
          <a class="for_level_text" style="margin-left:7%; font-size:130px; color:black;">{{aa.user_level}}</a>
        </div>
        <div class="for_level_bottom">
          <a>{{aa.user_name}} ({{aa.user_team_name}})
            나의 레벨 </a>
        </div>
      </div> -->

      <div class="home_second" style="margin-top:2%;">
        <p class= "sub-title" ><a class="highlight" style="font-size:30px">PizzaSaver 명예의 전당</a></p>
        <p class= "sec-title">SW단 PizzaSaver 명예의 전당을 소개합니다 ~</p>
        <p class= "sec-title"></p>
        <br/>

      <div v-for="(text,key) in orderedUsers" v-bind:key="text.key" style="display:inline-block" class="total_Group_for_level">
        <div>
            <img v-if="key<5" style="height: 300px; width:220px;" v-bind:src="text.user_pic"><br/>
            <div v-if="key<5" class="honor_text"><p style="color:#707070; font-weight:500; margin-bottom:0;">{{text.user_team_name}}</p><p>{{text.user_name}} {{text.user_company_level}}</p></div>
        </div>
      </div>

      </div>
    </div>
</template>

<script>
import {login} from "../config/firebase"
import firebase from 'firebase'
import _ from 'lodash';

var orderBy = require('lodash.orderby');

var temp_list=[];

login.once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot){
			        temp_list.push({user_pic:childSnapshot.val().user_pic,user_name:childSnapshot.val().user_name,user_company_level:childSnapshot.val().user_company_level,user_team_name:childSnapshot.val().user_team_name,user_level:childSnapshot.val().user_level})
			        //console.log(childSnapshot.val())
          })
});

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
    name : "List",
    firebase : {
        auth: login
    },
    data : function(){
       return {
           no : "",
           writer : "",
           title : "",
           content : "",
           items: temp_list
       }
    },
    computed : {
        orderedUsers: function(){
          console.log(this.items)
            return _.orderBy(this.items,'user_level', "desc");
      },
       aa : function(){
          var arr = this.auth.filter(function(item){
               return item['.key'] == name;
           });
           if(arr.length ==1) return arr[0];
           else return {};
       }
   },
    methods: {
    }

}
</script>

<style src="@/assets/mycss_lib.css">
  body{
    font-family: ng
  }
</style>

