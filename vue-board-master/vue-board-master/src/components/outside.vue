<template>
    <div class="list">

        <p class= "sub-title" ><a class="highlight">사외교육</a></p>
        <p class= "sec-title">외부 교육/세미나 관련 공지사항을 올려드립니다. 제목을 클릭하면 링크로 이동합니다.</p>
        <br/>
        <p class="search">
            <input v-model="searchText" placeholder="검색어를 입력하세요." class="search_input" type="text"/>
            <img src="@/assets/search_button.svg" style="float:right">
        </p>
        <table ref="board">
            <caption style="display:none;">게시글 목록</caption>
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
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(text,key) in filterSearch.reverse()" v-bind:key="text.key" >
                        <td style="text-align:left;"> {{key+1}}</td>
                        <td style="font-size:20px;"><a :href="text.link" target="_blank">{{(text.info)}}</a></td>
                        <td>{{text.date}})</td>
                        <td>{{text.time}}</td>
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
			  temp_list.push({link:childSnapshot.val().link,key:childSnapshot.key,info:(childSnapshot.val().info.split('\n\n\n')[1]).split('\n')[1], date: childSnapshot.val().info.split(')')[0], time: childSnapshot.val().time})
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
    }
     },
}
</script>

<style src="@/assets/mycss_lib.css"></style>