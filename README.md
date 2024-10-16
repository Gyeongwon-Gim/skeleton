# SKELETON
<div align="center>
 <img src="https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=white"/>
 <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"/>
 <img src="https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white"/>
 <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
 <img src="https://img.shields.io/badge/ESlint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
 <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white"/>
</div>
 
## 프로젝트 소개

Skeleton은 SQL 쿼리를 쉽게 작성하고 데이터베이스와 상호작용할 수 있도록 도와주는 도구입니다.

`select`, `insert`, `update`, `delete`와 같은 쿼리를 동적으로 생성할 수 있으며, literalize함수를 통해 서브쿼리도 지원합니다.

🌐 [배포사이트](https://www.npmjs.com/package/devcourse_skeleton) | 발표 영상

## 주요 기능

-   동적 SQL 생성: `select`, `insert`, `update`, `delete` 쿼리를 동적으로 생성
-   서브쿼리 지원: 서브쿼리를 쉽게 처리할 수 있는 literalize 함수 제공
-   유효성 검사: 입력된 값에 대한 강력한 유효성 검사 및 에러 처리

## 기술 스택

### Common
<div align="center>
 <img src="https://img.shields.io/badge/ESlint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
 <img src="https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=white"/>
 <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white"/>
 <img src="https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white"/>
 <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
</div>


### Cooperation
<div align="center>
 <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&003545lor=white"/>
 <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&003545lor=white"/>
 <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
</div>

### Deployment
<div align="center>
 <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&003545lor=white"/>
 <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&003545lor=white"/>
 <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
</div>


## 패키지 구조

```
 devcourse_skeleton/
├── lib/
│    ├── constants
│    ├── utils
│    ├── crud.js
│    ├── Parser.js
│    ├── QueryExecutor.js
│    ├── skeleton.js
│    └── index.js
├── LICENSE
└── package.json
```

## 설치 방법

npm 을 통해 Skeleton을 설치할 수 있습니다.
새로운 프로젝트를 생성하는 경우라면

`npm init`명령어를 사용하여 `package.json`파일을 생성하세요.

```bash
$ npm install devcourse_skeleton
```

혹은 GitHub에서 직접 클론하여 사용할 수 있습니다.

```bash
git clone https://github.com/Gyeongwon-Gim/skeleton.git
```

### 의존성 설치

```bash
$ npm install
```

## 팀원

|                              이재혁                              |                              조성민                              |                              김경원                              |
| :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/55015406?v=4"> | <img src="https://avatars.githubusercontent.com/u/80831228?v=4"> | <img src="https://avatars.githubusercontent.com/u/92427216?v=4"> |
|                   https://github.com/JaeHye0k                    |                    https://github.com/Ss0Mae                     |                 https://github.com/Gyeongwon-Gim                 |
|                       ahhpc2012@gmail.com                        |                       ssomae@protonmail.ch                       |                         nwgmig@gmail.com                         |
