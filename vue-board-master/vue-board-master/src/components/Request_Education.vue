<template>
    <div class="list">
        <p class= "sub-title" ><a class="highlight">요청게시판</a></p>
        <p class= "sec-title">원하는 교육/세미나를 신청하는 공간입니다.</p>
        <br/>
            <router-link to="/writerequest"><img src="@/assets/ok_notice_button.svg" style="float:right"></router-link>
        <br/>
        <table ref="board">
            <caption style="display:none;">게시글 목록</caption>
            <colgroup>
                <col width="10%" />
                <col width="50%" />
                <col width="20%" />
                <col width="15%" />
                <col width="15%" />
            </colgroup>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>동의</th>
                    <th>작성일</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(text,key) in board.slice().reverse()" v-bind:key="'Education_Request'+text['.key']" >
                        <td>{{key+1}}</td>
                        <td style="font-size:20px;" v-on:click="view(text['.key'],text.view)"><router-link :to="'/view_request/'+text['.key']">{{text.title}}</router-link></td>
                        <td >{{text.user_name}} {{text.user_company_level}}({{text.user_team_name}})</td>
                        <td>{{text.num}}</td>
                        <td>{{text.date}}</td>

                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import {boardEdu_re} from "../config/firebase"

export default {
    name : "List",
    firebase : {
        board : boardEdu_re
    },
    methods: {
        view: function(no,view){
            this.no = no;
            console.log(no)
            console.log(view)
            console.log(boardEdu_re.child(no))
            boardEdu_re.child(no).update({view:(Number(view)+1)});
        }
    }

}
</script>
<style src="@/assets/mycss_lib.css"></style>