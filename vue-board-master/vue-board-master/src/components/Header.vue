<template>
    <div class="header">
        <div style="float:right; margin-right:9%;">

            <!-- <router-link to="/home"><img src="@/assets/mypage_not_hover.svg" @mouseover="myImage = otherImage" style="float:left;padding-top: 30px;padding-left: 30px;"></router-link> -->
            <img v-on:click="logout" src ="@/assets/logout_not_hover.svg" style="float:left;padding-top: 30px;padding-left: 30px;">

          </div>
          <div style="float:right; margin-top:2%;margin-right:0;">

            <!-- <router-link to="/home"><img src="@/assets/mypage_not_hover.svg" @mouseover="myImage = otherImage" style="float:left;padding-top: 30px;padding-left: 30px;"></router-link> -->
            <a style="font-size:20px; font-weight:500">환영합니다. {{aa.user_name}}님</a>

          </div>
          <div class="logo">
            <router-link to="/home"><img src ="@/assets/logo_top.png" style="float:left;padding-top: 30px;padding-left: 14px;"></router-link>
          </div>
          <div class="head_drop" style="position:relative; z-index: 100; right:0">
                            <div class="dropdown-group-3" >
                                <a style="font-size:24px;">나의 레벨</a>
                                <div>
                                    <a style="font-size:50px;">LV.</a>
                                    <a style="font-size:100px;">{{aa.user_level}}</a>
                                </div>

                              </div>
                            <div class="dropdown-group-1">
                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:24px; margin-top:100px" to="/outside">교육&세미나</router-link></p>

                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:18px; margin-bottom:0px;" to="/outside">사외교육</router-link></p>
                                 <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:18px;" to="/outside_review">사외교육(후기)</router-link></p>
                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:18px; margin-bottom:0px;" to="/inside">사내교육</router-link></p>
                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:18px;" to="/request">교육요청</router-link></p>

                            </div>
                            <div class="dropdown-group-2">
                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:24px;" to="/List">기술공유</router-link></p>
                            </div>
                            </div>
          <!-- <div>
              <b-dropdown toggle-class="rounded" id="dropdown-header" variant="dark" class="m-0">
                 <b-dropdown-group id="dropdown-group-1" header="기술공유">
                  <b-dropdown-item :to="{ path: '/' }">기술공유</b-dropdown-item>
                </b-dropdown-group>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-group id="dropdown-group-2" header="교육&세미나">
                  <b-dropdown-item :to="{ path: '/outside' }">사외교육</b-dropdown-item>
                  <b-dropdown-item :to="{ path: '/inside' }">사내교육</b-dropdown-item>
                  <b-dropdown-item :to="{ path: '/request' }">요청게시판</b-dropdown-item>
                </b-dropdown-group>
              </b-dropdown>
        </div> -->

    </div>
</template>

<script>
import {login} from "../config/firebase"
import firebase from 'firebase'


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
    name : "Header",
    data() {
      return {
    }
  }, firebase : {
        auth: login
    },
  computed: {
          aa : function(){
          var arr = this.auth.filter(function(item){
               return item['.key'] == name;
           });
           if(arr.length ==1) return arr[0];
           else return {};
       }
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(()=>{
        this.$router.replace('/login');
      })
    }
  }
}
</script>

<style scoped>
.header{height:100px;width:100%;background: rgb(255,255,255);


filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c5deea', endColorstr='#066dab',GradientType=1 );
border-bottom: 0.07px solid black;
}

/* .buttons{
  margin-left: 600%
} */
.header h1{color:#fff;font-weight:500;font-size:20px;line-height:50px;text-align:center;text-shadow:1px 1px #666;}

.logo{
  width: 275px;
  height: 100px;
  box-shadow: 0px -4px 7px #e6e6e6;
  margin-left: 60px;
}
.head_drop{
      margin-left:60px;
      width: 275px;
      height: 3000px;
      background-color:#2C3344;
}
.dropdown-group-2{
      margin-left:60px;
      width: 275px;
      color: #CDF1F4;
      padding-top: 15%;
}
.dropdown-group-1,.dropdown-group-3{
    margin-left:60px;
     width: 275px;
     color: #CDF1F4;
      padding-top: 15%;
}
.dropdown-group-3{
  font-size: 30px;
}
.dropdown_list{
  padding:0;
  margin:0;
}

image{
  padding-top: 30px;
}
</style>