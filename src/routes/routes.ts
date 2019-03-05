import {readdirSync} from 'fs';
import {Router} from "express";

export class Routes
{
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