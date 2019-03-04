import {Route} from "../utils/route";
import {readdirSync} from 'fs';
import {Application, Request, Response, Router} from "express";

export class Routes
{
    private app: Application;

    constructor(app: Application)
    {
        this.app = app;
    }

    public getApiRoutes(): Router[]
    {
        const apiDir = __dirname + "/api";

        return readdirSync(apiDir)
            .filter(file => this.isValidRouteFile(file, apiDir))
            .map(file => this.getRoutesFromFile(file, apiDir));
    }

    private getRoutesFromFile(file: string, dirname: string = __dirname): Router
    {
        return require(dirname + "/" + file).Routes();
    }

    private isValidRouteFile(file: string, dirname: string = __dirname): boolean
    {
        return (file.search(/\.js$/) > 0) && (dirname + "/" + file !== __filename);
    }
}