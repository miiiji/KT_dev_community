import firebase from "firebase"


var config = {
  apiKey: "AIzaSyCt1-5QjAEOiVEdFSBjbbecoYf8Mymxajs",
  authDomain: "kt-developer-community.firebaseapp.com",
  databaseURL: "https://kt-developer-community.firebaseio.com",
  projectId: "kt-developer-community",
  storageBucket: "",
  messagingSenderId: "832647892664",
};

var app = firebase.initializeApp(config);

export var db = app.database();
export var boardStudy = db.ref('category/Study');
export var boardEdu = db.ref('category/Education');
export var boardEdu_in = db.ref('category/Education_Inside');
export var boardEdu_in_list = db.ref('category/Education_Inside/list');
export var boardEdu_in_calendar = db.ref('category/Education_Inside_Calendar');
export var boardEdu_re = db.ref('category/Education_Request');
export var login = db.ref('User');


// console.log(a)
// var temp = a.slice().reverse();

//1. 로그아웃을 할때까지
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)