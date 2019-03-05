import {Application, Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";

class App
{
    public app: express.Application;

    public routes: Routes;

    public async initialize(): Promise<Application>
    {
        this.routes = new Routes();

        this.app = express();
        this.setMiddlewares();

        return this.app;
    }

    private setMiddlewares(): void
    {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.app.use('/api', this.routes.getApiRoutes());

        this.app.use(this.notFoundRequest);
        this.app.use(this.genericError);
    }

    private notFoundRequest(request: Request, response: Response, next: Function)
    {
        response.status(404).send();
    }

    private genericError(error: Error, request: Request, response: Response, next: Function)
    {
        response.status(500).json({ error: error.name, message: error.message });
    }
}

export default new App();