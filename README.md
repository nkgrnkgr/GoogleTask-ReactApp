## Google Tasks Client

build by

- React
- TypeScript
- Redux
- Redux-Saga

## How To Start

### create .env

```bash
touch .env
```

#### Google API client ID and key

```bash
REACT_APP_CLIENT_ID=xxxx
REACT_APP_API_KEY=yyyy

```

```bash
yarn
yarn start
```

[localhos:3000](http://localhost:3000)

## Google Tasks API

### Quick Start

https://developers.google.com/tasks/quickstart/js

### API リファレンス

https://developers.google.com/tasks/v1/reference/

### API Expolorer

https://developers.google.com/apis-explorer/#search/tasks/tasks/v1/tasks.tasks.insert

### API Example

#### Token の取得

```typescript
gapi.client.getToken();
```

getToken()で取れる型

```typescript
interface RootObject {
  token_type: string;
  access_token: string;
  scope: string;
  login_hint: string;
  expires_in: number;
  id_token: string;
  session_state: Sessionstate;
  first_issued_at: number;
  expires_at: number;
  idpId: string;
}

interface Sessionstate {
  extraQueryParams: ExtraQueryParams;
}

interface ExtraQueryParams {
  authuser: string;
}
```

#### Tasklist の一覧

```typescript
gapi.client.tasks.tasklists.list().then(response => console.log(response.body));
```

API 取得結果

```typescript
{
  "kind": "tasks#taskLists",
  "etag": "\"8MEupY6AVkDup3m0O6mGjMTpTY8/uttwJ5c33f2pTLrkfz8uAQfyWtU\"",
  "items": [
    {
      "kind": "tasks#taskList",
      "id": "MDM1MDQ3NTk4MTc1MjgwODA5MTE6MDow",
      "title": "John Smith さんのリスト",
      "updated": "2019-07-30T22:11:27.220Z",
      "selfLink": "https://www.googleapis.com/tasks/v1/users/@me/lists/MDM1MDQ3NTk4MTc1MjgwODA5MTE6MDow"
    },
    {
      "kind": "tasks#taskList",
      "id": "a3BNUWwxUGM5bGdXZ293OQ",
      "title": "NewTasks",
      "updated": "2019-08-06T21:36:17.218Z",
      "selfLink": "https://www.googleapis.com/tasks/v1/users/@me/lists/a3BNUWwxUGM5bGdXZ293OQ"
    }
  ]
}
```

#### タスク一覧

```typescript
gapi.client.tasks.tasks
  .list({tasklist: '@default'})
  .then(response => console.log(response.body));
```

```typescript
gapi.client.tasks.tasks
  .list({tasklist: 'a3BNUWwxUGM5bGdXZ293OQ'}) // id
  .then(response => console.log(response.body));
```

API 取得結果

```typescript
{
 "kind": "tasks#tasks",
 "etag": "\"8MEupY6AVkDup3m0O6mGjMTpTY8/MTc1OTI4MTIyOQ\"",
 "items": [
  {
   "kind": "tasks#task",
   "id": "UHRyNm1KVS0tWnVYQ0RaZQ",
   "etag": "\"8MEupY6AVkDup3m0O6mGjMTpTY8/MTc1OTI4MTE5OA\"",
   "title": "React",
   "updated": "2019-08-06T21:36:17.000Z",
   "selfLink": "https://www.googleapis.com/tasks/v1/lists/a3BNUWwxUGM5bGdXZ293OQ/tasks/UHRyNm1KVS0tWnVYQ0RaZQ",
   "position": "00000000000000000000",
   "status": "needsAction"
  },
  {
   "kind": "tasks#task",
   "id": "aXY0WEhkTWdxR3pQZk1pag",
   "etag": "\"8MEupY6AVkDup3m0O6mGjMTpTY8/MTQ5ODQzMDM5Ng\"",
   "title": "TypeScript",
   "updated": "2019-08-03T21:08:45.000Z",
   "selfLink": "https://www.googleapis.com/tasks/v1/lists/a3BNUWwxUGM5bGdXZ293OQ/tasks/aXY0WEhkTWdxR3pQZk1pag",
   "position": "00000000000000000002",
   "status": "needsAction"
  },
  {
   "kind": "tasks#task",
   "id": "M2hVcXRHMlJCWWxZeGVDdQ",
   "etag": "\"8MEupY6AVkDup3m0O6mGjMTpTY8/MTQ5ODQyNzgyOA\"",
   "title": "Redux",
   "updated": "2019-08-03T21:08:43.000Z",
   "selfLink": "https://www.googleapis.com/tasks/v1/lists/a3BNUWwxUGM5bGdXZ293OQ/tasks/M2hVcXRHMlJCWWxZeGVDdQ",
   "position": "00000000000000000001",
   "status": "needsAction"
  }
 ]
}

```

### タスク の操作

#### タスクの一覧取得

```typescript
gapi.client.tasks.tasks
  .list({tasklist: 'a3BNUWwxUGM5bGdXZ293OQ'})
  .then(response => console.log(response.result));
```

#### タスク情報の取得

```typescript
gapi.client.tasks.tasks
  .get({tasklist: 'a3BNUWwxUGM5bGdXZ293OQ', task: 'Y09hNkhHUHR3cnBVczV6cA'}) // id
  .then(response => console.log(response.result));
```

#### 新規作成

```typescript
gapi.client.tasks.tasks
  .insert({
    tasklist: 'a3BNUWwxUGM5bGdXZ293OQ',
    title: 'buy milk',
    status: 'needsAction',
  })
  .then(response => console.log(response.result));
```

#### 更新

```typescript
gapi.client.tasks.tasks
  .patch({
    tasklist: 'a3BNUWwxUGM5bGdXZ293OQ',
    task: 'bnhSZG5WckZYV2NZV2VlcQ',
    title: 'buy a milk',
    status: 'needsAction',
  })
  .then(response => console.log(response.result));
```

#### 削除

```typescript
gapi.client.tasks.tasks
  .delete({
    tasklist: 'a3BNUWwxUGM5bGdXZ293OQ',
    task: 'bnhSZG5WckZYV2NZV2VlcQ',
  })
  .then(response => console.log(response.result));
```

#### 完了済みタスクのクリア

status が completed のものを削除する

```typescript
gapi.client.tasks.tasks
  .clear({
    tasklist: 'a3BNUWwxUGM5bGdXZ293OQ',
  })
  .then(response => console.log(response.result));
```

#### Task の移動

previous で指定した Task の次の順番に移動する

```typescript
gapi.client.tasks.tasks
  .move({
    tasklist: 'a3BNUWwxUGM5bGdXZ293OQ',
    task: 'Y09hNkhHUHR3cnBVczV6cA',
    previous: 'UHRyNm1KVS0tWnVYQ0RaZQ',
  })
  .then(response => console.log(response.result));
```

### ログインユーザー情報の取得

#### Sign-In 時

https://developers.google.com/identity/sign-in/web/reference#googleauthcurrentuserget

```typescript
const user = await gapi.auth2.getAuthInstance().signIn(); // GoogleUser を SignIn() の　Promiseの戻り値として使える
console.log(user.getBasicProfile().getName());
console.log(user.getBasicProfile().getImageUrl());
```

#### Sign-In 後

```typescript
const user = gapi.auth2.getAuthInstance().currentUser.get(); // GoogleUser を取得できる
console.log(user.getBasicProfile().getName());
console.log(user.getBasicProfile().getImageUrl());
```
