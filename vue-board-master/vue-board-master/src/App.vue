<template>
        <div id="app">
            <div>
                <Header v-if="!isOnLoginPage()"/>
                <!--<Side />-->
                <!-- <aside style=" display:inline-block;">
                        <div class="head_drop" style="position:relative; z-index: 100; right:0">
                            <div class="dropdown-group-1">
                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:24px; margin-top:100px" to="/outside">교육&세미나</router-link></p>
                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:18px; margin-bottom:0px;" to="/outside">사외교육</router-link></p>
                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:18px; margin-bottom:0px;" to="/inside">사내교육</router-link></p>
                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:18px;" to="/request">교육요청</router-link></p>
                            </div>
                            <div class="dropdown-group-2">
                                <p class="dropdown_list"><router-link style="color:#CDF1F4; font-size:24px;" to="/List">기술공유</router-link></p>
                            </div>
                            </div>
                    </aside>
                    <article style="display:inline-block;">

                    </article> -->
                 <router-view></router-view>
                <!--<Footer />-->
            </div>
        </div>
</template>

<script>
import Media from 'vue-media'
import Header from "@/components/Header"
import Footer from "@/components/Footer"

global.vm = app;

export default {
    name: 'App',
    components : {Media,Header,Footer},
    methods :{
        isOnLoginPage: function() {
            return this.$route.path === '/login' || this.$route.path === '/signup'
        }
    }
}

</script>

<style>

@font-face{
    font-family:ng;
    src:url(assets/NanumGothicCoding.ttf);
}


body{font-family: ng,'나눔고딕', 'NanumGothic' }


.head_drop{
      margin-left:60px;
      width: 275px;
      height: 700px;
      background-color:#2C3344;
}
.dropdown-group-2{
      margin-left:60px;
      width: 275px;
      color: #CDF1F4;
      padding-top: 15%;
}
.dropdown-group-1{
    margin-left:60px;
     width: 275px;
     color: #CDF1F4;
      padding-top: 15%;
}
.dropdown_list{
  padding:0;
  margin:0;
}

@media only screen and (max-width:768px){

}

</style>



