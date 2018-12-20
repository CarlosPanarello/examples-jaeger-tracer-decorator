import { Controller } from "./controller";
import * as restify from "restify";
import { JaegerTracer, middlewareTracer, EndpointForTracing, TransformPathInSpanName, RequestTags } from "jaeger-tracer-decorator";

const jaegerTracer = new JaegerTracer();

const server = restify.createServer({
  name: "Exemple Restify Server Typescript",
  version: "1.0.0",
});


const endpointForTracing: EndpointForTracing = (path: string) => {
  return path.indexOf("/ping") === -1;
};

const transformPathInSpanName: TransformPathInSpanName = (path: string) => {
  switch (true) {
    case path.indexOf("/receive") > 0:
      return "Receive_API_Restify_TS";
    case path.indexOf("/send") > 0:
      return "Send_API_Restify_TS";
    default:
      return path;
  }
};

const requestTags: RequestTags[] = ["id","params", "headers"];

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.use(middlewareTracer({tracer: jaegerTracer.tracer, requestTags ,endpointForTracing, transformPathInSpanName}));

/**
 * Routers
 * */
server.get('/receive', (req: any, res: any, next: any) => {
  const ctrl = new Controller();
  res.send(ctrl.receive(req));
  next();
});

server.get('/receive/:valorReceive', (req: any, res: any, next: any) => {
  const ctrl = new Controller();
  res.send(ctrl.receive(req));
  next();
});

server.get('/send', (req: any, res: any, next: any)  => {
  const ctrl = new Controller();
  ctrl.send(req).then((result) => {
    res.send(result);
    next();
  }).catch((e) => {
    next(e);
  });
});

server.get('/ping', (req: any, res: any, next: any) => {
  res.send("pong");
  next();
});
/**
  * Start Server
  */
server.listen(3002, function () {
  console.log('Example Restify listening on port 3002!');
});