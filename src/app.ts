import {Application} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import {Middlewares} from "./config/middlewares";

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

        this.app.use(Middlewares.entityNotFound);
        this.app.use(Middlewares.genericError);

        this.app.use(Middlewares.notFoundRequest);
    }
}

export default new App();