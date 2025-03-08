import express, {Express} from "express";
import {StartUpConfig} from "./config/start-up-config";
import {HashEvaluator} from "./domain/hash/hash-evaluator";
import {GostHashEvaluator} from "./domain/hash/impl/gost-hash-evaluator";
import {HashEvaluatorDispatcher} from "./domain/hash/dispatcher/hash-evaluator-dispatcher";
import {DefaultHashEvaluatorDispatcher} from "./domain/hash/dispatcher/impl/default-hash-evaluator-dispatcher";
import {HashController} from "./controller/hash-controller";
import {RestHashController} from "./controller/impl/rest-hash-controller";
import {HashRouter} from "./router/hash-router";

const apiPrefix: string = "/api/cryptography";

const app: Express = express();
app.use(express.json());

const startUpConfig: StartUpConfig = StartUpConfig.getConfig();
const PORT: number = startUpConfig.getPort();
const isProd: boolean = startUpConfig.getIsProd();

const gostHashEvaluator: HashEvaluator = new GostHashEvaluator();
const defaultHashEvaluatorDispatcher: HashEvaluatorDispatcher = new DefaultHashEvaluatorDispatcher(Array.of(gostHashEvaluator));

const restHashController: HashController = new RestHashController(defaultHashEvaluatorDispatcher);

const hashRouter: HashRouter = new HashRouter(restHashController);

app.use(apiPrefix, hashRouter.getRouter());

app.listen(PORT, (err: Error | void): void => {
   err ? console.log(err) : console.log(`Listening ${PORT} port`);
});