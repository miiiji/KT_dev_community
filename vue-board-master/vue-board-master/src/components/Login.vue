<template>
    <div class="list_login">
    <b-form>
      <v-container
        fluid
        fill-height
      >
       <v-layout
          align-center
          justify-center
        >
        <v-flex
            xs12
            sm8
            md4
          >

      <img style="margin-top:30%;display: block; margin-left: auto; margin-right: auto; width: 50%;" src="@/assets/로고.png" ><img>
        <label class="sr-only" for="inlineFormInputName2">Name</label>
      <div  style="box-shadow: 0px -4px 10px #e6e6e6; display: block; margin-left: auto; margin-right: auto; width: 40%; height: 280px; ">
        <br/><a style="margin-left:13%;">ID</a><br/>
        <b-form-input type="text" v-model="email" placeholder="이메일을 입력해주세요." style="width:74%;display: block; margin-left: auto; margin-right: auto;"/><br/>
        <a style="margin-left:13%;">Password</a><br/>
        <b-form-input type="password" v-model="password" placeholder="비밀번호를 입력해주세요." style="width:74%;display: block; margin-left: auto; margin-right: auto;"/><br/>


        <img style="margin-left:13%;" src="@/assets/로그인 hover.svg" @click="signIn">
      </div>

      <div class="link">
      <p class="link_text" style=" display: block; margin-left: auto; margin-right: auto; width: 40%; margin-top:2%">
        Don’t have an account?
        <router-link class="link_btn" to="/signup"><a style="color:#009DB5">Sign up</a></router-link>
      </p>
      </div>
        </v-flex>
        </v-layout>
      </v-container>
   </b-form>
  </div>
</template>


<script>
import firebase from 'firebase';

export default {
  name:"login",
  props: ["authentication"],
  data:function(){
    return {
      email:'',
      password:''
    }
  },
  methods:{
    signIn: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('/home');
        },
        (err) => {
          alert('Opps.'+err.messages)
        })

  }
}
}
</script>
<style src="@/assets/mycss_lib.css"></style>


