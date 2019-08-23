<template>
<div class="list">
    <div class="signup container align-items-center">

   <img style="margin-top:30%;display: block; margin-left: auto; margin-right: auto; width: 50%;" src="@/assets/로고.png" ><img>
      <label class="sr-only" for="inlineFormInputName2">Name</label>
    <h2 style="text-align:center;margin-top: 50px;">회원가입</h2>
      <label class="sr-only" for="inlineFormInputName2">Name</label>
      <input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName1" type="text" v-model="email" placeholder="이메일을 입력해주세요." />
      <input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" type="password" v-model="password" placeholder="비밀번호를 입력해주세요." />
      <input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName3" type="text" v-model="user_name" placeholder="이름을 입력해주세요." />
      <input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName4" type="text" v-model="company_level" placeholder="직급을 입력해주세요." />
      <input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName5" type="text" v-model="team_name" placeholder="팀,부서명을 입력해주세요." />
    <div class="text-center">
        <button variant="primary" v-on:click="signUp">회원가입</button>
    </div>
     <p class="link_text" style="text-align:center">
       <router-link to="/login" >로그인 돌아가기 </router-link>
      </p>
      <br>
    </div>
  </div>
</template>



<script>
import firebase from 'firebase'
import {login} from "../config/firebase"

export default {
  name:"signup",
  props: ["authentication"],
  data:function(){
    return {
      email: '',
      password: '',
      user_name: '',
      company_level:'',
      team_name:''
    }
  },
  methods:{
    insert_db() {
          console.log('welcome');
          var root_dir = (this.email).split('@')[0]
          login.child(String(root_dir)).set({
          email: this.email,
          user_name: this.user_name,
          user_company_level: this.company_level,
          user_team_name: this.team_name,
          user_level: 1,
          user_pic : '@/assets/temp.png'

        })
    },
    signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.insert_db();
            this.$router.replace('/home');
          },
          (err) => {
            alert('Opps.'+err.messages)
          })

  }
}
}
</script>

<style scoped>
</style>


