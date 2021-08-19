### movieApp-study


#### study with https://github.com/jaewonhimnae/react-movie-app-ko


***


- change title, css in navBar 


- add utils folder, getCookie.js


2021-08-19


***


- movieDetail - favorite에서 post error는 user_id로 해결했다.


- FavoritePage에서 Unhandled Rejection (TypeError): Cannot read property 'map' of undefined가


   뜬다. 데이터가 오기 전에 렌더링하려고해서 그런듯하다.


-> Favorites.map()을 {Favorites && Favorites.map()}으로 바꿨다. 


- FavoritePage에서 tbody내용을 따로 빼주니까 또 에러가 생겼다.


-> favorite list에서 한 아이템을 삭제하면 TypeError: Cannot read property 'map' of undefined 메세지가


   뜬다. list에 하나가 들어있든 여러개가 들어있든 뜬다. 새로고침하면 잘 나온다.


-> 서버에서 favorite list를 받아오는 함수를 만들어서 처음 페이지 진입할 때, 리스트에서 삭제할 때 실행하도록 하니까


   해결되었다.


- 좋아요, 싫어요, 댓글, 대댓글 기능은 다른 강의에서 듣고 추가하기.


2021-08-02


***


-favorite button과 db에 담는 것 까지 완료했다.


-구조적인(?) 문제가 있다. favorite 기능은 유저가 로그인 했다고 가정하고 만들어진 것 같다.


로그인하지않은 유저가 들어오면 user_id가 없으므로 서버에 보내지도 못하고 서버도 응답할 수 없다.


클라이언트에서 로그인 하지 않은 유저에 대한 처리를 해줘야 한다.


-아마 auth()를 이용한 처리가 될 것이다.


auth() === true ? origin : alert("로그인 하세요");


2021-07-31


***


-server /api/favorite에서 문제가 있는 것 같다.


로컬스토리지를 사용하지 않고 유저 아이디를 가져오고 싶다.


mongodb의 objectId와 쿠키에 저장된 user_id가 일치하지 않는 것 같다.


-해결책은? 


-> user_id를 받을 때 document.cookie.toString()이 아니라


-> document.cookie 였고 favorite rotuer에서 (), {}의 bracket을 다시 잡아주니 작동한다.


2021-07-30


* * *


3일동안 오류를 해결하는데 시간을 쓰다니.


logout시 url은 바뀌지만 refresh되지 않는 오류를 해결하려다가 점점 미궁에 빠져서


다시 만들어보기로 했다.


다시 시작하니


landing page, register page, login page, logout은 현재까지 잘 작동하고있다.


- routes 폴더에서는 /api/...등을 지우고 /endpoint만 써줘야한다.


2021-07-29