# 🚧 README em construção 🚧

```
.
├── app
│   ├── backend
│   │   ├── Dockerfile
│   │   ├── nyc.config.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── packages.npm
│   │   ├── src
│   │   │   ├── app.ts
│   │   │   ├── controllers
│   │   │   │   ├── leaderBoardController.ts
│   │   │   │   ├── loginController.ts
│   │   │   │   ├── matchController.ts
│   │   │   │   └── teamController.ts
│   │   │   ├── database
│   │   │   │   ├── config
│   │   │   │   │   └── database.ts
│   │   │   │   ├── migrations
│   │   │   │   │   ├── 20220823194831-users.js
│   │   │   │   │   ├── 20220823203656-teams.js
│   │   │   │   │   ├── 20220823203713-matches.js
│   │   │   │   │   └── 99999999999999-create-z.js
│   │   │   │   ├── models
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── match.ts
│   │   │   │   │   ├── team.ts
│   │   │   │   │   └── user.ts
│   │   │   │   └── seeders
│   │   │   │       ├── 20211116145440-teams.js
│   │   │   │       ├── 20211116145458-matches.js
│   │   │   │       └── 20211205212238-user.js
│   │   │   ├── middlewares
│   │   │   │   ├── errorCreate.ts
│   │   │   │   └── errorMiddleware.ts
│   │   │   ├── routes
│   │   │   │   ├── leaderBoardRoute.ts
│   │   │   │   ├── loginRoute.ts
│   │   │   │   ├── matchRoute.ts
│   │   │   │   └── teamRoute.ts
│   │   │   ├── server.ts
│   │   │   ├── services
│   │   │   │   ├── awayLeaderBoardService.ts
│   │   │   │   ├── homeLeaderBoardService.ts
│   │   │   │   ├── leaderBoardService.ts
│   │   │   │   ├── loginService.ts
│   │   │   │   ├── matchService.ts
│   │   │   │   ├── teamService.ts
│   │   │   │   ├── tokenService.ts
│   │   │   │   └── userService.ts
│   │   │   └── tests
│   │   │       ├── login.test.ts
│   │   │       ├── match.test.ts
│   │   │       └── team.test.ts
│   │   ├── tsc_eval.sh
│   │   └── tsconfig.json
│   ├── docker-compose.dev.yml
│   ├── docker-compose.yml
│   └── frontend
│       ├── Dockerfile
│       ├── package.json
│       ├── package-lock.json
│       ├── public
│       │   ├── favicon.ico
│       │   ├── index.html
│       │   └── robots.txt
│       └── src
│           ├── App.js
│           ├── components
│           │   ├── AddNewMatchBtn.jsx
│           │   ├── CreateNewGame.jsx
│           │   ├── EditGame.jsx
│           │   ├── GameFilter.jsx
│           │   ├── GamesTable.jsx
│           │   ├── Header.jsx
│           │   ├── LeaderboardBtn.jsx
│           │   ├── LeaderboardTable.jsx
│           │   ├── Loading.jsx
│           │   ├── LoginBtn.jsx
│           │   ├── MatchesBtn.jsx
│           │   ├── Scoreboard.jsx
│           │   ├── TableFilter.jsx
│           │   └── TeamOption.jsx
│           ├── images
│           │   ├── check.png
│           │   ├── exit_to_app.png
│           │   ├── index.js
│           │   ├── negative_logo.png
│           │   ├── pencil.png
│           │   └── positive_logo.png
│           ├── index.js
│           ├── pages
│           │   ├── Games.jsx
│           │   ├── Leaderboard.jsx
│           │   ├── Login.jsx
│           │   └── MatchSettings.jsx
│           ├── services
│           │   └── requests.js
│           └── styles
│               ├── app.css
│               ├── components
│               │   ├── header.css
│               │   └── leaderboardTable.css
│               └── pages
│                   ├── games.css
│                   ├── leaderboard.css
│                   ├── login.css
│                   └── matchSettings.css
├── apps_install.sh
├── db.example.sql
├── dockerfile_denylist.sh
├── first-commit.txt
├── package.json
├── package-lock.json
└── README.md
```
