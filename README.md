### movieApp-study

#### study with https://github.com/jaewonhimnae/react-movie-app-ko

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

***


favorite button과 db에 담는 것 까지 완료했다.

구조적인(?) 문제가 있다. favorite 기능은 유저가 로그인 했다고 가정하고 만들어진 것 같다.

로그인하지않은 유저가 들어오면 user_id가 없으므로 서버에 보내지도 못하고 서버도 응답할 수 없다.

클라이언트에서 로그인 하지 않은 유저에 대한 처리를 해줘야 한다.

아마 auth()를 이용한 처리가 될 것이다.


auth() === true ? origin : alert("로그인 하세요");