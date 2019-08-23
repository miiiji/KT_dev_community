<template>
    <div class="list">
        <p class= "sub-title" ><a class="highlight">사외교육(후기)</a></p>
        <p class= "sec-title">외부 교육/세미나 후기를 올려드립니다.</p>
        <br/>

        <table ref="board">
            <colgroup>
                <col width="10%"/>
                <col width="70%" />
                <col width="10%" />
                <col width="10%" />
            </colgroup>
            <thead>
                <tr>
                    <th>번호</th>
                    <th style="font-size:20px;">제목</th>
                    <th>날짜</th>
                    <th>후기여부</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(text,key) in filterSearch" v-bind:key="text.key" >
                        <td style="text-align:left;"> {{key+1}}</td>
                        <td style="font-size:20px;"><router-link :to="'/view_outside_review/'+text.key">{{text.info}}</router-link></td>
                        <td>{{text.date}})</td>
                        <td v-if="text.review_exist">O</td>
                        <td v-else>X</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {boardEdu} from "../config/firebase"
var temp_list=[]
boardEdu.once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot){
              //console.log(childSnapshot.val())
              if(childSnapshot.child('review_list').exists()){
                console.log('zz')
                temp_list.push({review_exist:'true',review_list:childSnapshot.val().review_list,link:childSnapshot.val().link,key:childSnapshot.key,info:(childSnapshot.val().info.split('\n\n\n')[1]).split('\n')[1], date: childSnapshot.val().info.split(')')[0], time: childSnapshot.val().time})
              }else{
			          temp_list.push({link:childSnapshot.val().link,key:childSnapshot.key,info:(childSnapshot.val().info.split('\n\n\n')[1]).split('\n')[1], date: childSnapshot.val().info.split(')')[0], time: childSnapshot.val().time})
              }
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
        board : boardEdu
    },
     computed: {
        filterSearch: function(){
             return this.texts.filter((text)=>{
                 console.log(this.texts)
                 console.log(text)
                return text.info.match(this.searchText);
             })
    },
     },
}
</script>

<style src="@/assets/mycss_lib.css"></style>