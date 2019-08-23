import Vue from 'vue'
import Router from 'vue-router'
import List_Study from "../components/List_Study"
import Write from "../components/Write"
import View_Study from "../components/View_Study"
import Edit from "../components/Edit"
import login from "../components/Login"
import signup from "../components/SignUp"
import outside from "../components/outside"
import inside from "../components/inside"
import req from "../components/Request_Education"
import write_notice from "../components/Write_notice"
import View_Education from "../components/View_Education"
import write_request from "../components/Write_Request"
import view_request from "../components/View_Request"
import home from "../components/Home"
import Calendar from "../components/Calendar"
import outside_review from "../components/outside_review"
import view_outside_review from "../components/view_outside_review"
import request_edit from "../components/request_edit"
import inside_edit from "../components/inside_edit"
Vue.use(Router)

export default new Router({
  mode : "history",
  routes: [
        {
            path: '/',
            redirect:'/login'
        },{
            path: '/login',
            name: "login",
            component: login
        },{
            path: '/home',
            name: "home",
            component: home,
        },
        {
            path: '/List',
            name : "List_Study",
            component : List_Study
        },
        {
            path: '/view_study/:no',
            name : "View_Study",
            component : View_Study
        },{
            path: '/write',
            name : "Write",
            component : Write
        },{
            path: '/edit/:no',
            name : "Edit",
            component : Edit
        },{
            path: "/login",
            name : "login",
            component: login
        },
        {
            path: "/signup",
            name : "signup",
            component: signup
        },{
            path: "/outside",
            name : "outside",
            component: outside
        },{
            path: "/inside",
            name : "inside",
            component: inside
        },{
            path: "/request",
            name : "req",
            component: req
        },{
            path: "/writenotice",
            name : "write_notice",
            component: write_notice
        },{
            path: "/view_education/:no",
            name: "View_Education",
            component: View_Education
        },{
            path: "/writerequest",
            name: "write_request",
            component: write_request
        },{
            path:"/view_request/:no",
            name:"view_request",
            component: view_request
        },{
            path:"/Calendar",
            name:"Calendar",
            component:Calendar
        },{
            path:"/outside_review",
            name:"outside_review",
            component:outside_review
        },{
            path:"/view_outside_review/:no",
            name:"view_outside_review",
            component:view_outside_review
        },{
            path:"/inside_edit/:no",
            name:"inside_edit",
            component:inside_edit
        },{
            path:"/request_edit/:no",
            name:"request_edit",
            component:request_edit
        }
  ]
})
