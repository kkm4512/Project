templates  = {
    INDEX_in_login : 
    `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .table{
                border: solid;
            }
            td{
                border:solid;
                border-color: powderblue;
                margin:100px;
            }
        </style>
        <title>볼거없나</title>
    </head>
    <body>
        <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>
        <img src="bener.jpg" style="position:absolute; top:200px; width:500px;"></img>
        
        <table class="table">
            <thead>
                <td><a href="/MOVIE">영화</a></td>
                <td><a href="/WEATHER">기상</a></td>
                <td><a href="/school_lunch">영천시 아동복지급식정보</a></td>
            </thead>
            <a href="sign_in" style="position: relative; left: 65rem; bottom: 2rem;">로그인</a>
            <a href="sign_up" style="position: relative; left: 57rem; bottom: 2rem;">회원가입</a>
            
        </table>
    </body>
    </html>    
    `
    ,

    INDEX_in_logout : function(Nickname,result){
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .table{
                border: solid;
            }
            .table > td{
                border:solid;
                border-color: powderblue;
                margin:100px;
            }
            .Notice{
                position: relative; left: 30rem; top:10px;
            }            
        </style>
        <title>볼거없나</title>
    </head>
    <body>
        <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>
        
        <table class="table">
            <thead>
                <td><a href="/MOVIE">영화</a></td>
                <td><a href="/WEATHER">기상</a></td>
                <td><a href="/school_lunch">영천시 아동복지급식정보</a></td>
            </thead>
            <a href="sign_out" style="position: relative; left: 66rem; bottom: 30px;">로그아웃</a>
            <a href="sign_up" style="position: relative; left: 57rem; bottom: 30px;">회원가입</a>
            <a href="self_information" style="position: relative; left: 66rem; bottom: 30px;">${Nickname}님 환영합니다!</a>
        </table>
    
    <div class="menu">
        <nav>
            <ul>
                <hr>
                    <a href="/notice"><li>게시판</li></a><br>
                    <li>미구현</li>

                <hr>
            </ul>
        </nav>        
    </div>
    


    <table border="1" class="btn_table">
        <h2>익명게시글</h2>
            <tr>
                <th>제목</th>
                <th>내용</th>
                <th>삭제</th>
            </tr>
                ${result.map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${item.memo}</td>
                <td><button onclick="remove(this)" type="button">삭제</button></td>
            </tr>
                
                `).join('')}
    </table>
    
    <script>
        
        function remove(node){
            var Current = node.parentElement.parentElement
            Current.remove()
        }

    </script>

        


    </body>
    </html>       
    `
}
    ,

    MOVIES_IN_LOGIN : 
    `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>볼거없나</title>
    <a href="sign_in" style="position: relative; left: 65rem; bottom: 2rem;">로그인</a>
    <a href="sign_up" style="position: relative; left: 57rem; bottom: 2rem;">회원가입</a>
    <style>
        .table{
            border:solid;
        }
        td{
            border:solid 1px;
        }
    </style>
    <title>볼거없나</title>
</head>
<body>
    <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>
    
    <h1>영화리스트</h1>
    <table class="table">
        <h2>영화장르</h2>
        <thead>
            <td><button type="button" class="Thriller">Thriller</button></td>
            <td><button type="button" class="Horror">Horror</button></td>
            <td><button type="button" class="Comedy">Comedy</button></td>
            <td><button type="button" class="Documentary">Documentary</button></td>
            <td><button type="button" class="Drama">Drama</button></td>
            <td><button type="button" class="Romance">Romance</button></td>
            <td><button type="button" class="Biography">Biography</button></td>
            <td><button type="button" class="Crime">Crime</button></td>
            <td><button type="button" class="Action">Action</button></td>
        </thead>
    </table>
    <div class="tags">

    </div>
    

    <script>

        /*영화 오픈 API 가져오기*/

        function ajax(){
            fetch("https://yts.mx/api/v2/list_movies.json").then((response)=>{
                return response.json()
            }).then((data)=>{
                var moveis = data.data.movies;
                var tag = '';
                var tags = document.querySelector(".tags")
                for (i=0;i<moveis.length;i++){
                        var genres = moveis[i].genres
                        var img = moveis[i].medium_cover_image
                        var runtime  = moveis[i].runtime
                        var summary = moveis[i].summary
                        var title = moveis[i].title
                        tag += '<h2>제목 :' + title + ' </h2>'
                        tag += '<img src=' + img + '>'
                        tag += '<h3>장르 : ' + genres + '</h3>'
                        tag += '<h4>줄거리 : ' + summary + '</h4>'
                    }
                    tags.innerHTML = tag
                })
            }
        ajax()

        /*영화 장르 클릭*/
        var table = document.querySelector('.table');
        table.onclick = function(){
            var target_genres = event.target.className

            function ajax_2(){
                fetch("https://yts.mx/api/v2/list_movies.json").then((response)=>{
                    return response.json()
                }).then((data)=>{
                    
                var moveis = data.data.movies;
                var tag = '';
                var tags = document.querySelector(".tags")
                for (i=0;i<moveis.length;i++){
                    if(moveis[i].genres[0] == target_genres){
                        var genres = moveis[i].genres
                        var img = moveis[i].medium_cover_image
                        var runtime  = moveis[i].runtime
                        var summary = moveis[i].summary
                        var title = moveis[i].title
                        tag += '<h2>제목 :' + title + ' </h2>'
                        tag += '<img src=' + img + '>'
                        tag += '<h3>장르 : ' + genres + '</h3>'
                        tag += '<h4>줄거리 : ' + summary + '</h4>'
                    } 
                    tags.innerHTML = tag
                }
            })
        }

        (function(){
            ajax_2()
        })()
    }        


    </script>

</body>
</html>
    `
,
    MOVIES_IN_LOGOUT :(Nickname) =>{
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>볼거없나</title>
    <a href="sign_out" style="position: relative; left: 66rem; bottom: 30px;">로그아웃</a>
    <a href="sign_up" style="position: relative; left: 57rem; bottom: 30px;">회원가입</a>
    <a href="self_information" style="position: relative; left: 66rem; bottom: 30px;">${Nickname}님 환영합니다!</a>
    <style>
        .table{
            border:solid;
        }
        td{
            border:solid 1px;
        }
    </style>
    <title>볼거없나</title>
</head>
<body>
    <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>
    
    <h1>영화리스트</h1>
    <table class="table">
        <h2>영화장르</h2>
        <thead>
            <td><button type="button" class="Thriller">Thriller</button></td>
            <td><button type="button" class="Horror">Horror</button></td>
            <td><button type="button" class="Comedy">Comedy</button></td>
            <td><button type="button" class="Documentary">Documentary</button></td>
            <td><button type="button" class="Drama">Drama</button></td>
            <td><button type="button" class="Romance">Romance</button></td>
            <td><button type="button" class="Biography">Biography</button></td>
            <td><button type="button" class="Crime">Crime</button></td>
            <td><button type="button" class="Action">Action</button></td>
        </thead>
    </table>
    <div class="tags">

    </div>
    

    <script>

        /*영화 오픈 API 가져오기*/

        function ajax(){
            fetch("https://yts.mx/api/v2/list_movies.json").then((response)=>{
                return response.json()
            }).then((data)=>{
                var moveis = data.data.movies;
                var tag = '';
                var tags = document.querySelector(".tags")
                for (i=0;i<moveis.length;i++){
                        var genres = moveis[i].genres
                        var img = moveis[i].medium_cover_image
                        var runtime  = moveis[i].runtime
                        var summary = moveis[i].summary
                        var title = moveis[i].title
                        tag += '<h2>제목 :' + title + ' </h2>'
                        tag += '<img src=' + img + '>'
                        tag += '<h3>장르 : ' + genres + '</h3>'
                        tag += '<h4>줄거리 : ' + summary + '</h4>'
                    }
                    tags.innerHTML = tag
                })
            }
        ajax()

        /*영화 장르 클릭*/
        var table = document.querySelector('.table');
        table.onclick = function(){
            var target_genres = event.target.className

            function ajax_2(){
                fetch("https://yts.mx/api/v2/list_movies.json").then((response)=>{
                    return response.json()
                }).then((data)=>{
                    
                var moveis = data.data.movies;
                var tag = '';
                var tags = document.querySelector(".tags")
                for (i=0;i<moveis.length;i++){
                    if(moveis[i].genres[0] == target_genres){
                        var genres = moveis[i].genres
                        var img = moveis[i].medium_cover_image
                        var runtime  = moveis[i].runtime
                        var summary = moveis[i].summary
                        var title = moveis[i].title
                        tag += '<h2>제목 :' + title + ' </h2>'
                        tag += '<img src=' + img + '>'
                        tag += '<h3>장르 : ' + genres + '</h3>'
                        tag += '<h4>줄거리 : ' + summary + '</h4>'
                    } 
                    tags.innerHTML = tag
                }
            })
        }

        (function(){
            ajax_2()
        })()
    }        


    </script>

</body>
</html>
    `
}
    ,

    sign_in : 
    `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>볼거없나</title>
    </head>
    <body>
        <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>
        
        <form action = "/process/signin" method="post">
            <input type = "text" name="id" placeholder="ID"><br>
            <input type = "password" name="pw" placeholder="PW"><br>
            <button type="submit">로그인</button>
        </form>
    </body>
    </html>    
    `
    ,
    sign_up : 
    `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>볼거없나</title>
    </head>
    <body>
        <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>
        
        <form action = "/process/signup" method="post">
            <input type = "text" name="id" placeholder="ID"><br>
            <input type = "password" name="pw" placeholder="PW"><br>
            <input type = "text" name="nickname" placeholder="NICKNAME"><br>
            <input type = "text" name="email" placeholder="EMAIL"><br>
            <button type="submit">회원가입</button>
        </form>
    </body>
    </html>    
    `
    ,
    NOTICE : function(nickname){
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .table{
                border: solid;
            }
    
            td{
                border:solid;
                border-color: powderblue;
                margin:100px;
            }
    
            li{
    
                border-color: black;
                margin:20px;
            }
            .Notice{
                position: relative;
                left: 70rem; 
                top:21rem;
            }
        </style>
        <title>볼거없나</title>
    </head>
    <body>
        <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>
        
        <table class="table">
            <thead>
                <tr>
                    <td><a href="/MOVIE">영화</a></td>
                    <td><a href="drama.html">드라마</a></td>
                    <td><a href="webtoon.html">웹툰</a></td>
                </tr>
            </thead>

            <a href="sign_out" style="position: relative; left: 66rem; top: 1rem;">로그아웃</a>
            <a href="sign_up" style="position: relative; left: 57rem; top: 1rem;">회원가입</a>
            <a href="self_information" style="position: relative; left: 66rem; top: 1rem;">${nickname}님 환영합니다!</a>
        </table>
    
        <div class="Notice">
            <form action = "/process/Notice" method="post">
                <ul>
                    <li>제목 <input type="text" name="title" ></li>
                    <li>유형</li>
                        <select name="type">
                            <option value="none">=== 선택 ===</option>
                            <option value="free_noticeboard">자유게시판</option>
                            <option value="content_share_noticeboard">컨텐츠 자료 공유 게시판</option>
                        </select>
                    <li>내용 <br>
                    <textarea name="memo"  cols="50" rows="10" ></textarea></li>
                </ul>
                <button type="subimit" style="position: relative; left: 25rem; ">등록</button>
            </form>
        </div>
    
    </body>
    </html>        
    `
    }
    ,
    WEATHER_IN_LOGIN :
    `
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .table{
                border: solid;
            }
            .table > td{
                border:solid;
                border-color: powderblue;
                margin:100px;
            }
            .Notice{
                position: relative; left: 30rem; top:10px;
            }            
        </style>
        <title>볼거없나</title>
        <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>    
        <a href="sign_in" style="position: relative; left: 65rem; bottom: 2rem;">로그인</a>
        <a href="sign_up" style="position: relative; left: 57rem; bottom: 2rem;">회원가입</a>
    </head>
    <body>
        <form action="/weather_see" method="post">
            <h3>지역번호</h3><br>
            <h4>서울특별시 : 1100000000</h4>
            <h4>부산광역시 : 2600000000</h4>
            <h4>대구광역시 : 2700000000</h4>
            <h4>인천광역시 : 2800000000</h4>
            <h4>광주광역시 : 2900000000</h4>
            지역번호 : <input type="text" name="areaNo"<br>
            <button type="submit" style="position: absolute; right: 1520px; top: 100px;">제출</button>
        </form>        
    </body>
</html>
    `
    ,
    WEATHER_IN_LOGOUT : function(Nickname)  {
    return `
    <!DOCTYPE html>
    <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                .table{
                    border: solid;
                }
                .table > td{
                    border:solid;
                    border-color: powderblue;
                    margin:100px;
                }
                .Notice{
                    position: relative; left: 30rem; top:10px;
                }            
            </style>
            <title>볼거없나</title>
        </head>
        <body>
            <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>   
            <a href="sign_out" style="position: relative; left: 66rem; bottom: 30px;">로그아웃</a>
            <a href="sign_up" style="position: relative; left: 57rem; bottom: 30px;">회원가입</a>
            <a href="self_information" style="position: relative; left: 66rem; bottom: 30px;">${Nickname}님 환영합니다!</a> 

            <form action="/weather_see" method="post">
            <h3>지역번호</h3><br>
            <h4>서울특별시 : 1100000000</h4>
            <h4>부산광역시 : 2600000000</h4>
            <h4>대구광역시 : 2700000000</h4>
            <h4>인천광역시 : 2800000000</h4>
            <h4>광주광역시 : 2900000000</h4>
            지역번호 : <input type="text" name="areaNo"<br>
            <button type="submit" style="position: absolute; right: 1520px; top: 100px;">제출</button>
        </form>                    
        </body>
    </html>
        `    
        }
        ,
        WEATHER_SEE : function(time,areaNo){
        return `
        <!DOCTYPE html>
        <html lang = 'ko'>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>WEB</title>
        </head>
        <body> 
        
            <div class="items">
        
            </div>

            <div>
                <canvas id="myChart"></canvas>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

            <script>

    
        
                function ajax(){
                    var url = 'https://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?ServiceKey=Dc7U191LY%2F6m6B25e8qKLsdbHPpOUo01bmxTnpBtmy0qbZbqTZYlL3WVYZyS%2FLcDiw5OUhJDqn9jaFFb50%2B3Cw%3D%3D&dataType=JSON&areaNo=${areaNo}&time=${time}'
        
        
                    fetch(url).then(function(res){
                        return res.json()
                    }).then((data)=>{
                        let json_data = data.response.body.items.item
                        let json_data_lst_keys = [];
                        let json_data_lst_values = [];

                        
                        for (var i in json_data[0]){
                            if (i !== 'code' && i !== 'areaNo' && i !== 'date'){
                                json_data_lst_keys.push(i)
                                json_data_lst_values.push(Object.values(json_data[0][i]))
                            }
                            

                        }

                        const ctx = document.getElementById('myChart');

                        new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: json_data_lst_keys,
                                datasets: [{
                                label: '# 자외선 수치 예상표',
                                data: json_data_lst_values,
                                borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                y: {
                                    beginAtZero: true
                                    }
                                }
                            }
                        });     
                        
                        console.log(this)                          
        
                    })
                    


                }

                
                
        
        
                (function() {
                    ajax();
                })();


        
            </script>
        </body>            
        </html>                
        `
        
    }
    ,
    SCHOOL_LUNCH : function(Number){
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .table{
                border: solid;
            }
            td{
                border:solid;
                border-color: powderblue;
                margin:100px;
            }
        </style>
        <title>볼거없나</title>
    </head>
    <body>
        <a href="/"><img src="Logo.jpg" style="border: solid; width:120px;"></img></a>


        <a href="sign_in" style="position: relative; left: 65rem; bottom: 2rem;">로그인</a>
        <a href="sign_up" style="position: relative; left: 57rem; bottom: 2rem;">회원가입</a> 
        
        <form action="/school_lunch" method="Get">
            한페이지 결과수 : <input type="text" name="result">
            <input type="submit" value ="검색">
        <form>

        <table>
            <tr>
                <div class="Main">

                </div>  
            <tr>
        </table>

        


        
        <script>

        var url = "https://apis.data.go.kr/5100000/yeongcheon_child_welfr_mlsv_inf1/getYeongcheonChildWelfrMlsvInf1?serviceKey=Dc7U191LY%2F6m6B25e8qKLsdbHPpOUo01bmxTnpBtmy0qbZbqTZYlL3WVYZyS%2FLcDiw5OUhJDqn9jaFFb50%2B3Cw%3D%3D&pageNo=1&numOfRows=${Number}"
            function ajax(){
                fetch(url)
                    
                    .then((res)=>{
                        return res.json();
                    })

                    .then((Data)=>{
                        let JsonData = Data.response.body.items.item
                        let tags = '<table>'
                        for (let i=0;i<JsonData.length;i++){
                            tags += '<tr><th style="boarder:solid"><h3>' + JsonData[i].frcs_nm + '</h3></th></tr>'
                            tags += '<td><h4> 주소 : ' +JsonData[i].lctn_lotno_addr + '</h4></td>'
                            tags += '<td><h4> 주소 : ' +JsonData[i].lctn_road_nm_addr + '</h4></td>'
                        }
                        tags += '</table>'
                        let Main = document.querySelector(".Main")
                        Main.innerHTML = tags;
                    })
                }

            (function(){
                ajax()
            })()



        </script>
    </body>
    </html>    
    `
    }
}


module.exports = templates;