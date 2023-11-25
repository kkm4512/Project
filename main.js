const express = require('express');
const app = express();
const mysql = require('mysql2')
const mysql_information = require('../mysql_information/mysql.json')
const templates = require('./Template')

var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('../Static'))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave:true, saveUninitialized:true}))

app.use(function (req, res, next) {
    res.locals.id = "";
    res.locals.nickname = "";

    if (req.session.member){
        res.locals.id = req.session.member.id
        res.locals.nickname = req.session.member.nickname
    }
    next()
})

var pool  = mysql.createPool({
    connectionLimit : 10,
    host : mysql_information.host,
    user : mysql_information.user,
    password : mysql_information.password,
    database : mysql_information.database,
    debug : false
});



//홈페이지
app.get('/',(req,res)=>{
    if (req.session.member){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err)
            }
            conn.query("select * from noticetable;",
            (err,result) => {
                if (err) {
                    console.log(err)
                }
                res.send(templates.INDEX_in_logout(res.locals.nickname,result))

                }
            )
        });
        
    } else {
        res.send(templates.INDEX_in_login)
    }
}); 

//영천시 아동복지급식정보
app.get('/school_lunch/',(req,res)=>{
    let result = req.query.result
    res.send(templates.SCHOOL_LUNCH(result))
})






//영화
app.get('/MOVIE',(req,res)=>{
    if (req.session.member){
        res.send(templates.MOVIES_IN_LOGOUT(res.locals.nickname))
    } else {
        res.send(templates.MOVIES_IN_LOGIN)
    }
})

app.get('/MOVIE',(req,res)=>{
    res.send(templates.MOVIES_IN_LOGOUT)
})
//기상-자외선
app.get('/WEATHER',(req,res)=>{
    if (req.session.member){
        res.send(templates.WEATHER_IN_LOGOUT(res.locals.nickname))
    } else {
        res.send(templates.WEATHER_IN_LOGIN)
    }
})

//지역,시간 입력
app.post('/weather_see',(req,res) => {
    var areaNo = req.body.areaNo

    let today = new Date(); //오늘
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 일
    let hour = today.getHours(); // 시

    let Current_Date = String(year) + String(month)+ String(date) + String(hour)
    var weatherHTML = templates.WEATHER_SEE(Current_Date, areaNo);
    res.send(weatherHTML);

})



//로그인
app.get('/sign_in',(req,res)=>{
    res.send(templates.sign_in)
})


//로그아웃
app.get('/sign_out',(req,res)=>{
    req.session.member = '';
    res.send("<script> alert('로그아웃 되었습니다.'); location.href=('/') </script>");
})



//회원가입
app.get('/sign_up',(req,res)=>{
    res.send(templates.sign_up)
})

//게시글 작성
app.get('/notice',(req,res)=>{
    res.send(templates.NOTICE(res.locals.nickname))
})



//로그인 정보 처리
app.post('/process/signin',(req,res)=>{
    const id = req.body.id 
    const pw = req.body.pw

    pool.getConnection(function(err, conn){
        conn.query("select * from studytable where id=? and pw=?;", 
        [id,pw],
        (err, result) => {
            conn.release();
            if(result.length > 0){
                req.session.member = result[0]
                res.send("<script> alert('로그인 되었습니다.'); location.href=('/') </script>");
            } else {
                res.send("<script> alert('아이디 또는 비밀번호가 일치하지 않습니다'); location.href=('/sign_in') </script>");
            }
        })
    })
});

//회원가입 처리
app.post('/process/signup',(req,res)=>{
    let id = req.body.id
    let pw = req.body.pw
    let nickname = req.body.nickname
    let email = req.body.email

    pool.getConnection(function(err, conn){
        conn.query("insert into studytable (id,pw,nickname,email) values (?,?,?,?);", 
        [id,pw,nickname,email],
        (err, result) => {
            conn.release();
            if(result){
                res.send("<script> alert('회원가입 되었습니다'); location.href=('/') </script>");
            } else {
                res.send("<script> alert('아이디가 중복되었습니다'); location.href=('/sign_up') </script>");
            }
        })
    })
});


//게시글 DB 전송
app.post('/process/Notice',(req,res)=>{
    let type = req.body.type
    let title = req.body.title
    let memo = req.body.memo
    
    pool.getConnection(function(err, conn){
        conn.query("insert into noticetable (type,title,memo) values (?,?,?);", 
        [type,title,memo],
        (err, result) => {
        conn.release();
        if (err) {
            res.write("<script> alert('게시판 등록이 실패하였습니다.'); location.href=('/notice') </script>");
            res.write(result);
            res.end();
        }
        res.send("<script> alert('게시판 등록이 완료되었습니다.'); location.href=('/') </script>");
        })
    })
});

app.listen(3000,()=>{
    console.log("PORT 3000 listening")
})


