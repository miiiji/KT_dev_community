<template>
    <div class="list">
        <p class= "sub-title" ><a class="highlight">기술공유</a></p>
        <p class= "sec-title">기술 교류, 성공/실패 사례, 정보 공유를 하는 공간 입니다.</p>
        <br/>
        <p class="search">
            <input class="search_input" v-model="searchText" placeholder="검색어를 입력하세요." type="text" style="text-align:center; font-size:42px; font-weight:bold;px;"/>
            <img src="@/assets/search_button.svg" style="float:right">
        </p>
        <router-link to="/write"><img src="@/assets/write_button.svg" style="float:right"></router-link>
        <div ref="board" class="study_list">
            <div v-for="text in filterSearch.reverse()" v-bind:key="text.key" style="height:246px; margin-top:5%">
                        <div style="font-size:27px; float:left;"><img v-bind:src="text.img" style="height:246px; width:246px;"></div>
                        <div style="margin-left:18%; height:246px;">
                            <div style="font-size:27px; padding-top:3%" v-on:click="view(text.key,text.view)"><router-link :to="'/view_study/'+text.key">{{text.title}}</router-link></div>
                            <!-- <div class="see_first" style="font-size:24px; overflow: hidden; margin-top:2%">{{text.content}}</div> -->
                            <div style="font-size:20px; font-weight:100;  margin-top:2%; display:inline-block;">
                                <img src="@/assets/date picto.svg">
                                {{text.date}}
                            </div>
                            <div style="font-size:20px; font-weight:100;  margin-top:2%; margin-left:1%; display:inline-block;">
                                <img src="@/assets/view picto.svg">
                                {{text.view}}
                            </div>
                            <div style="font-size:20px; font-weight:100;  margin-top:2%; margin-left:1%; display:inline-block;">
                                <img src="@/assets/좋아요 picto.svg">
                                {{text.like}}
                            </div>
                            <div style="font-size:25px; font-weight:500;  margin-top:2%; margin-left:1%; display:inline-block;">
                            {{text.user_name}} {{text.user_company_level}}({{text.user_team_name}})
                            </div>
                        </div>
            </div>
        </div>
    </div>
</template>

<script>
import {boardStudy} from "../config/firebase"



var temp_list = [];

boardStudy.once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot){
              //console.log(childSnapshot.val())
              temp_list.push({key:childSnapshot.key,img:childSnapshot.val().img ,category:childSnapshot.val().category,title:childSnapshot.val().title,content:childSnapshot.val().content,date:childSnapshot.val().date,like:childSnapshot.val().like, view:childSnapshot.val().view,user_team_name:childSnapshot.val().user_team_name,user_name:childSnapshot.val().user_name,user_company_level:childSnapshot.val().user_company_level,user_auth_check:childSnapshot.val().user_auth_check})
			  //temp_list.push({start_date:childSnapshot.val().start_date,end_date:childSnapshot.val().end_date,title:childSnapshot.val().title,apply_total_number:childSnapshot.val().apply_total_number,content:childSnapshot.val().content,date:childSnapshot.val().date,order:childSnapshot.order,num:childSnapshot.val().num,like:childSnapshot.val().like,view:childSnapshot.val().view,user_team_name:childSnapshot.val().user_team_name,user_name:childSnapshot.val().user_name,user_company_level:childSnapshot.val().user_company_level,user_auth_check:childSnapshot.val().user_auth_check})
			  //console.log(temp_list)
          })
});

export default {
    name : "List",
     data() {
        return {
            texts : temp_list ,
            searchText: ""
        }
    },
    firebase : {
        board : boardStudy
    },computed : {
    filterSearch: function(){
             return this.texts.filter((text)=>{
                 console.log(this.texts)
                 console.log(text)
                return text.title.match(this.searchText);
             })
     },
       aa : function(){
           var no = this.no;
            console.log(no)
           var arr = this.board.filter(function(item){
               return item['.key'] == no;
           });
           if(arr.length ==1) return arr[0];
           else return {};
       }
   },
    methods: {
        view: function(no,view){
            this.no = no;
            console.log(no)
            console.log(view)
            console.log(boardStudy.child(no))
            boardStudy.child(no).update({view:(Number(view)+1)});
        }
    }
}
</script>

<style src="@/assets/mycss_lib.css"></style>

