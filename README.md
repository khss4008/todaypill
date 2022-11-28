# 오늘의 영양제
 - 영양소별 성분을 자세하게 분석하여 사용자에게 가장 잘 맞는 영양제를 추천하는 모바일 어플리케이션

# 팀원을 소개합니다!
        고은민            권민지             김영진            김정서             나예인             최병성

![은민이](https://user-images.githubusercontent.com/63994962/202890139-78e1f0fd-5c1c-4fe6-b6e0-a46160d76039.png)
![민지](https://user-images.githubusercontent.com/63994962/202890134-d040968a-0987-4631-b5ab-8bc3a7b54d84.png)
![영진](https://user-images.githubusercontent.com/63994962/202890136-b5312f5a-0edb-43a7-8dc5-c782db10f17b.png)
![정서](https://user-images.githubusercontent.com/63994962/202890140-a45d2f63-a3bc-4dfe-bef0-c1c0983f289d.png)
![예인](https://user-images.githubusercontent.com/63994962/202890137-2b8d8214-37ad-4ff9-a386-121f1d04d6f7.png)
![병성이형](https://user-images.githubusercontent.com/63994962/202890135-39518a59-50ad-4e4b-ac9f-26d9b95c3080.png)


# 팀원 역할
고은민 : Frontend <br>
권민지 : 팀장, Backend <br>
김영진 : Backend <br>
김정서 : Frontend <br>
나예인 : Backend, CI/CD <br>
최병성 : Frontend <br>

<hr>

## 프로젝트 기간 : 2022.10.11 ~ 2022.11.21

## 오늘의 영양제 로고
![Image Pasted at 2022-11-20 15-33](https://user-images.githubusercontent.com/63994962/202890239-6c7f3c62-8fb9-41d5-8753-8b609567b46e.png)
<hr>

## 개발환경

- [ ]  협업툴
- Notion
- Jira
- Mattermost
- GitLab
- Webex
----------------------------- 
- React 18.0.0
- React Native 0.69.6
- Expo 46.0.16
- Typescript 4.3.5
- Recoil 0.7.6
- Axios 1.1.3
- React Navigation/Native 6.0.2
- Expo Notifications 0.16.1
- React Native Calendars 1.1290.0
- React Native Gifted Chat 1.0.4
- Expo Vector Icons 13.0.0

---

- [ ]  Backend
- openjdk 1.8.0_192
- Java Zulu 8.33.0.1
- eclipse 4.16.0 (2020-06)
- Spring Boot 2.7.5
- Spring Data JPA
- MySQL 5.7.37

---

- [ ]  CI/CD
- Docker version 20.10.18, build b40c2f6
- NGINX
- AWS EC2
- Jenkins 2.361.3
---

# 오늘의 영양제의 모토
영양제를 성분별로 자세하게 분석하여 보다 상세하게 맞춤형 추천을 제공

<hr>

# 서비스 설명
오늘의 영양제는 사용자의 건강검진 내역 및 자체 설문을 기반으로 사용자에게 가장 잘 맞는 영양제를 추천해줍니다.


# 주요 기능
- 크롤링을 통한 영양제 데이터 확보
- Codef 건강검진 내역 조회 API를 활용한 건강 정보 열람
- 설문조사를 통해 얻은 데이터를 통한 맞춤 영양소/영양제 추천
- 사용자에게 맞는 영양제에 관한 특이사항 제공

<hr>

# 시스템 아키텍쳐
![archi](https://user-images.githubusercontent.com/63994962/202890683-2a3b4376-1d66-4d08-9a3e-4ad4e50e007c.png)

<hr>

# CI/CD 구축 및 SSL 인증서 적용
프론트엔드 React.js는 Nginx와 함께 docker를 사용하여 빌드 및 배포하였고, 백엔드 Spring boot 또한 docker container를 통해 배포하였습니다. 
<br>
Nginx와 letsencrypt를 이용하여 SSL 인증서를 적용하고, 프론트엔드는 https의 기본값 443을 통해 분기, 백엔드는 /api의 경로로 프록시를 걸어주었습니다.

# 기술 특이점
- React-native, Expo를 이용한 앱 개발
- Rapid API, Papago API를 이용한 영어 논문 분석 및 번역 기능
- 찜한 영양제가 유사한 개인정보를 가진 유저에게 보이도록 하는 유사 추천 알고리즘
- React-natvie-gifted-chat을 이용한 영양제별 채팅방 구현
- Expo-notifications를 이용한 영양제 복용 푸시 알림 구현
- Docker, Jenkins 활용한 CI/CD

<hr>

# Git 컨벤션

```
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
DOCS:    문서를 수정한 경우(ex> Swagger)
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제
```

<hr>

# Git Flow 브랜치 전략
- 사용 브랜치
master - 배포
devleop - 개발
feature - 기능

- 진행 방식
feature의 기능이 완성되면 develop에 merge
배포 준비가 완료되면 develop 브랜치를 master에 merge


<hr>

# ER Diagram
![image](https://user-images.githubusercontent.com/63994962/202890758-19e04f57-fd53-45aa-a04f-c38f7e3a37ce.png)

<hr>

# EC2 포트 정리
|443 | HTTPS|
|-|-|
|80 | HTTP -> HTTPS로 Redirect|
|3306 | MySQL|
|8080 | Spring Boot |
|3000 | React |
|9090 | Jenkins|

<hr>

# 개발 후 회고
<hr>

고은민 : 앱 개발을 처음으로 해보면서 많은 것을 배울 수 있었고 흥미를 느낄 수 있었습니다. 웹과 달리 앱에서만 가능한 기능들이 신기했고 다음에는 이를 더 활용해서 프로젝트를 진행해보고 싶습니다. <br>

권민지 : 영양제에 대해 많은 것을 알게 된 프로젝트였습니다. 기능을 계속 추가하며 이것저것 요구했는데 잘 따라와주셔서 팀원분들께 감사하다고 말씀드리고 싶습니다. <br>

김영진 : 전에 진행했던 프로젝트에 비해 볼륨이 커서 더 바쁘게 진행했던 것 같습니다. 좋은 사람들과 함께해서 좋았어요! <br>

김정서 : 리액트 네이티브를 이용해 앱 개발을 처음 해봤는데, 재밌는 경험이였습니다~ <br>

나예인 : 데이터가 중요한 프로젝트여서 여러모로 신경쓸 점이 많았던 프로젝트였습니다. 이전에 비해 프로젝트 볼륨에 신경을 써봤는데 기대이상으로 잘 나온 것 같아서 뿌듯합니다. 다들 수고 많으셨습니다! <br>

최병성 : 앱 개발을 처음 해봤는데 웹 개발에 비해 비슷하면서도 다른 부분이 많아서 주의할 점들을 여러가지 배울 수 있었습니다. 다음에 앱 개발을 할 때는 좀 더 효율적인 방식으로 개발을 계획할 수 있을 것 같습니다. <br>
