import "express-async-errors";
import express, {Express, Request, Response, NextFunction} from "express";
import {StartUpConfig} from "./config/start-up-config";
import {RuntimeError} from "./error/runtime-error";

const app: Express = express();
app.use(express.json());


const startUpConfig: StartUpConfig = StartUpConfig.getConfig();
const PORT: number = startUpConfig.getPort();
const isProd: boolean = startUpConfig.getIsProd();



app.use((error: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(error instanceof RuntimeError ?  (error as RuntimeError).getStatus() : 500)
       .json({
        error: {
            message: error.message,
        },
    });
});

app.listen(PORT, (err: Error | void): void => {
    err ? console.log(err) : console.log(`Listening ${PORT} port`);
});