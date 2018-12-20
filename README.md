# Examples jaeger-tracer-decorator

Examples of implementation of [jaeger-tracer-decorator](https://www.npmjs.com/package/jaeger-tracer-decorator)

Examples of Express and Restify server with javascript and typescript.
Two examples without server in javascript and typescript.

## Run

You can start all examples with docker compose

```sh
docker-compose up --build
```

## Use

Basic in Javascript and Typescript it will create a new tracer every 3 seconds.

For api you can use the follow endpoints

http:localhost:xxxx/send?value=http://app-express-ts:4002/receive?value=teste2
This endpoint it will realize a get using adddres in value for make nested tracer between endpoints that use tracer.
You have to use the docker name of container for access.

http:localhost:xxxx/receive?value=someValue

Express in Javascript it will run on port 4001.
Docker name : app-express-js

Express in Typescript it will run on port 4002.
Docker name : app-express-ts

Restify in Javascript it will run on port 3001.
Docker name : app-restify-js

Restify in Javascript it will run on port 3002.
Docker name : app-restify-ts
