import express, {Express, NextFunction, Request, Response} from "express";
import {StartUpConfig} from "./config/start-up-config";
import {HashEvaluator} from "./domain/hash/hash-evaluator";
import {GostHashEvaluator} from "./domain/hash/impl/gost-hash-evaluator";
import {HashEvaluatorDispatcher} from "./domain/hash/dispatcher/hash-evaluator-dispatcher";
import {DefaultHashEvaluatorDispatcher} from "./domain/hash/dispatcher/impl/default-hash-evaluator-dispatcher";
import {HashController} from "./controller/hash-controller";
import {RestHashController} from "./controller/impl/rest-hash-controller";
import {HashRouter} from "./router/hash-router";
import {RuntimeError} from "./error/runtime-error";
import "express-async-errors";

const apiPathPrefix: string = "/api/cryptography";
const apiPathHashPrefix: string = "/hash";

const apiFullHashPathPrefix: string = apiPathPrefix + apiPathHashPrefix;

const app: Express = express();
app.use(express.json());

const startUpConfig: StartUpConfig = StartUpConfig.getConfig();
const PORT: number = startUpConfig.getPort();

const gostHashEvaluator: HashEvaluator = new GostHashEvaluator();
const defaultHashEvaluatorDispatcher: HashEvaluatorDispatcher = new DefaultHashEvaluatorDispatcher(Array.of(gostHashEvaluator));

const restHashController: HashController = new RestHashController(defaultHashEvaluatorDispatcher);

const hashRouter: HashRouter = new HashRouter(restHashController);

app.use(apiFullHashPathPrefix, hashRouter.getRouter());

app.use((error: Error, req: Request, res: Response, next: NextFunction): void => {
   res.status(error instanceof RuntimeError ?  (error as RuntimeError).getStatus() : 500);
   res.json({
      error: {
         message: error.message,
      },
   });
});


app.listen(PORT, (err: Error | void): void => {
   err ? console.log(err) : console.log(`Listening ${PORT} port`);
});