import {Route} from "../utils/route";
import {readdirSync} from 'fs';
import {Application, Request, Response} from "express";

export class Routes
{
    private app: Application;
    private routes: Route[];

    constructor(app: Application)
    {
        this.app = app;
        this.routes = this.getRoutesInDirectory();
    }

    private getRoutesInDirectory(): Route[]
    {
        return readdirSync(__dirname)
            .filter(file => this.isValidRouteFile(file))
            .map(file => this.getRoutesFromFile(file))
            .reduce((accumulator, current) => (accumulator === undefined) ? current : accumulator.concat(current));
    }

    private getRoutesFromFile(file: string): Route[]
    {
        return require(__dirname + "/" + file).Routes;
    }

    private isValidRouteFile(file: string): boolean
    {
        return (file.search(/\.js$/) > 0) && (__dirname + "/" + file !== __filename);
    }

    public setAppRoutes()
    {
        this.routes.forEach(route => {

            (this.app as any)[route.getMethod()](route.getPath(), (req: Request, res: Response, next: Function) => {
                const result = (new (route.getController() as any))[route.getAction()](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });
    }
}