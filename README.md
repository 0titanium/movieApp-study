# movieApp-study

## study with https://github.com/jaewonhimnae/react-movie-app-ko

* * *
3일동안 오류를 해결하는데 시간을 쓰다니.


logout시 url은 바뀌지만 refresh되지 않는 오류를 해결하려다가 점점 미궁에 빠져서


다시 만들어보기로 했다.

* * *
다시 시작하니


landing page, register page, login page, logout은 현재까지 잘 작동하고있다.


2021-07-29


// routes 폴더에서는 /api/...등을 지우고 /endpoint만 써줘야한다.

***
server /api/favorite에서 문제가 있는 것 같다.


로컬스토리지를 사용하지 않고 유저 아이디를 가져오고 싶다.


mongodb의 objectId와 쿠키에 저장된 user_id가 일치하지 않는 것 같다.


해결책은? 

-> user_id를 받을 때 document.cookie.toString()이 아니라

-> document.cookie 였고 favorite rotuer에서 (), {}의 bracket을 다시 잡아주니 작동한다.

2021-07-30