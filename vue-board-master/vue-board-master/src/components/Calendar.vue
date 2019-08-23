<template>
<div class="list">
	<!-- <div v-for="text in this.board.slice().reverse()" v-bind:key="text['.key']">
		{{text.title}}
		{{text.start}}
		{{text.end}}
	</div> -->
		<p class= "sub-title" ><a class="highlight">사내교육 캘린더</a></p>
    <p class= "sec-title">사내에서 주최하는 교육/세미나 정보 캘린더입니다.</p>
    <br/>
		<img src="@/assets/show_list_button.svg" @click="back" style="float:right">
		<full-calendar :config="config" :events="fcEvents"/>
</div>
</template>

<script>

import "fullcalendar/dist/fullcalendar.min.css";
import moment from 'moment'
import {boardEdu_in} from "../config/firebase"

var list =[]

// var name;
 boardEdu_in.once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot){
             // console.log(childSnapshot.val())
							list.push({start:childSnapshot.val().start_date,end:childSnapshot.val().end_date,title:childSnapshot.val().title})
							//console.log(list)
          })
});

// name = boardEdu_in_calendar.slice().reverse;
// console.log(name)

	var demoEvents = list

	export default {

  firebase : {
        board : boardEdu_in
  },
  data : function() {
    return {
			fcEvents : demoEvents,
			events: [
				{
					title: 'test',
					allDay: true,
					start: moment(),
					end: moment().add(1, 'd'),
				},
				{
					title: 'another test',
					start: moment().add(2,'d'),
					end: moment().add(2, 'd').add(2, 'h'),
				},
			],
			config: {
        defaultView: 'month',
				eventRender: function(event, element) {
          console.log(event)
    		}
      },
    }
	},
 	components : {
		 'full-calendar': require('vue-fullcalendar')
	},
	methods: {
		back : function(){
            this.$router.go(-1)
		}
	}
}

</script>
<style src="@/assets/mycss_lib.css"></style>