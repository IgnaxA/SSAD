import {ParseHelper} from "../util/parse-helper";

export class StartUpConfig {
    private port: number;
    private isProd: boolean;

    public setPort(port: number): void {
        this.port = port;
    }

    public getPort(): number {
        return this.port;
    }

    public setIsProd(isProd: boolean): void {
        this.isProd = isProd;
    }

    public getIsProd(): boolean {
        return this.isProd;
    }

    public static getConfig(): StartUpConfig {
        const startUpConfig: StartUpConfig = new StartUpConfig();
        startUpConfig.setPort(ParseHelper.parseNumber(process.env.PORT));
        startUpConfig.setIsProd(ParseHelper.parseBoolean(process.env.IS_PROD));

        return startUpConfig;
    }
}


