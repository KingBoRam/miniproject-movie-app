![transparent](https://capsule-render.vercel.app/api?type=transparent&fontColor=339af0&text=The%20Movies&height=130&fontSize=60)

## 프로젝트 설명
React와 Vite로 제작된 영화 웹사이트입니다. 첫 화면에서 Top rated 영화와 현재 상영 중인 인기 영화 목록을 확인할 수 있습니다. 검색 기능을 통해 원하는 영화 정보를 찾을 수 있으며, 이메일 또는 구글 로그인을 통해 접속한 유저는 북마크 기능을 통해 원하는 영화를 찜할 수 있고 프로필 이미지와 닉네임을 변경할 수 있습니다.

## 주요 사용 라이브러리
- **Axios**: TMDB api에 영화 정보 요청을 보내기 위해서 사용한 데이터 통신 라이브러리
- **Swiper**: 슬라이드 구현을 위한 라이브러리
- **Redux-persist**: 유저 북마크 정보를 스토리지에 저장하기 위한 라이브러리
- **Firebase** : email-password 로그인과 구글 로그인, 현재 인증된 유저 정보와 로그아웃 기능을 위해 사용한 라이브러리

## 배포 도메인
- **vercel** : https://miniproject-movie-app.vercel.app
- **firebase** : https://themovies-a075b.web.app/

## 구현 후 회고

- 블로그 링크 : [미니프로젝트 - Movie App](https://velog.io/@bory2321/%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Movie-App)

## 개인 기록용 메모
- Vercel로 배포했는데 새로고침 시 404 에러가 발생 -> `vercel.json` 파일을 추가하여 해결.  [참고 블로그](https://velog.io/@hying/Vercel-Vite-Build-Error-Vercel-Vite-%EB%B0%B0%ED%8F%AC%EC%8B%9C-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8-404-%EC%97%90%EB%9F%AC) 
