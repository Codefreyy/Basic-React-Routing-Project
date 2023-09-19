## Intro

This is a simple blog project which combines almost all the react router knowledge. There is a NavBar above which navigates you through different pages including **Posts**, **Users** and **Todos**. Each Pages has their nested pages.

There are two main folders in the project.

The **api** folder contains the code for the **fake API**, while the **client** folder contains the static HTML files for each page in our application as well as the CSS file for all the styling needed.

## How to run

### Start the API

In order to start the API you need to run `npm run dev` inside the api folder (make sure you run `npm i` first to install the dependencies).

This should start up an API on `http://localhost:3000`. This API is built on the **json-server** package, which is a great tool for quickly building fake APIs.

Essentially, whenever you make a request to the API it will **read/write** to the `db.json` file to get your data. I also included a `db.example.json` file which is the same as the `db.json file`, but it will never be modified so if you want to reset the API data to its original state you can copy the JSON from the `db.example.json` file into the db.json file.

## Start the Client

In the client dir, simply run `npm run dev`(make sure you run `npm i` first to install the dependencies).

## API Information

The API has the following endpoints:

```
GET /posts - Returns all of the posts
GET /posts/:id - Returns a single post
GET /posts/:id/comments - Returns all of the comments for a single post
GET /users - Returns all of the users
GET /users/:id - Returns a single user
GET /posts?userId=<userId> - Returns all of the posts for a single user
GET /todos - Returns all of the todos
GET /todos?userId=<userId> - Returns all of the todos for a single user
```
