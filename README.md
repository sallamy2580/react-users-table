<p>
  <div align="center">
  <h2>
    MERN App with User Authentication & Custom React Table Component<br /> <br />
    <a href="https://github.com/skyme5/react-users-table">
      <img
        src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"
        alt="Javascript"
      />
    </a>
    <a href="https://github.com/skyme5/react-users-table">
      <img
        src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
        alt="Node.JS"
      />
    </a>
    <a href="https://github.com/skyme5/react-users-table">
      <img
        src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"
        alt="Next.js"
      />
    </a>
    <a href="https://github.com/skyme5/react-users-table">
      <img
        src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
        alt="React.js"
      />
    </a>
    <a href="https://github.com/skyme5/react-users-table">
      <img
        src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"
        alt="MongoDB"
      />
    </a>
    <a href="https://github.com/skyme5/react-users-table">
      <img
        src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white"
        alt="ESLint"
      />
    </a>
    <a href="https://opensource.org/licenses/MIT">
      <img
        src="https://img.shields.io/github/license/skyme5/puppeteer-bulk-print?color=blue&style=for-the-badge"
        alt="License: MIT"
      />
    </a>
  </h2>
  </div>
</p>

Built using Next.js, React.js, and Tailwindcss

### Features

- [x] It should be SPA(React/Angular)
- [x] At least 3 core feature on client side (Sorting, Filtering (Searching), Pagination(Should be done by candidate not by any external package/library like ANTD, Chakra, react tabel etc...))
  - [x] Sorting
  - [x] Searching
  - [x] Pagination
- [x] Should have at least 3 Route (sign-up, sign-in, dashboard)
  - [x] Sign-up Route
  - [x] Sign-in Route
  - [x] Dashboard (React Table Component)
- [x] It should communicate to backend if MERN/MEAN task. Or to API if only frontend task(you can use <https://reqres.in/> or any other service you are familiar with).
  - [x] Connect with MongoDB
  - [x] Store User Auth
  - [x] Store Mock Accounts data
- [x] It should be able to save data (In local storage or in db).
- [x] It should be deployed & running in production (You can use ~~~Vercel~~~/Netlify or any other service you are familiar with for this)
  - [x] Deployed to Netlify
- [x] Mobile Responsive(Not mandatory)
  - [x] TODO TailwindCSS

### Table Component

Table component implements sorting, search, pagination and fetching data, for this it takes
following props

```js
const TableComponent = ({
  columns,
  tableData,
  currPage,
  perPage,
  total,
  loadMore,
  hasMore,
}) => {}
```

### API

#### POST: /api/login

Endpoint for authenticating with Server, upon successful validation authentication data
will be stored using cookie token

```json
{
  "email": "foo@example.com",
  "password": "foobarPassword"
}
```

#### GET: /api/logout

Endpoint for deauthentication, this will simply delete the cookie

#### /api/user

##### GET

Returns currently authenticated user

##### POST

Create new user

```json
{
  "email": "foo@example.com",
  "password": "example",
  "firstName": "First",
  "lastName": "Last"
}
```

##### PUT

Update `firstName` and `lastName` for current user

```json
{
  "firstName": "first",
  "lastName": "last"
}
```

##### DELETE

Delete current user

#### /api/users

##### GET

Returns all registered Users

##### POST

Create new user and login

```json
{
  "email": "foo@example.com",
  "password": "example",
  "firstName": "First",
  "lastName": "Last"
}
```

#### /api/accounts/<page>/<limit>

Fetch accounts list by `page` with maximum document count of specified by `limit`,
return Pagination object

```json
{
  "docs": [{
      "createdAt": "1970-01-20T01:43:29.811Z"
      "email": "sombun.cano@orange.io"
      "firstName": "Carlos"
      "lastName": "Wilson"
      "updatedAt": "1970-01-20T01:43:29.811Z"
      "__v": 0
      "_id": "62379513f32bf566bb0f7c17"
    }
  ]
  "hasNextPage": true
  "hasPrevPage": false
  "limit": 100
  "nextPage": 2
  "page": 1
  "pagingCounter": 1
  "prevPage": null
  "totalDocs": 200
  "totalPages": 2
}
```

### Deployment Configuration

Create `.env.production` file with following content

```config
TOKEN_SECRET="add-your-value-here"
MONGODB_URI="add-your-value-here"
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
