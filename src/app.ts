import {Application, Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import { createConnection, Connection, getConnectionOptions } from "typeorm";
import { User } from "./models/entity/User";
import * as fs from "fs";

class App
{
    public app: express.Application;

    public router: Routes;

    private connection: Connection;

    public async initialize(): Promise<Application>
    {
        try {
            await this.setDatabaseConnection();
        } catch (error) {
            console.log("Não foi possível conectar ao banco de dados! MSG => " + error);
            return;
        }

        this.app = express();

        this.router = new Routes(this.app);

        this.setMiddlewares();

        return this.app;
    }

    private setMiddlewares(): void
    {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.app.use('/api', this.router.getApiRoutes());

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

    private async setDatabaseConnection()
    {        
        let entities = await fs.readdirSync(__dirname + "/models/entity").map(file => {
            if (!(file === __filename) && !(file.search(/\.map$/) > 0)) {
                let entity = require(__dirname + "/models/entity/" + file);
                return entity;
            }
        });

        entities = entities.filter((value, index, array) => {
            return (value !== undefined);
        });

        let connectionOptions = await getConnectionOptions();
        Object.assign(connectionOptions, {entities: [User]});

        this.connection = await createConnection(connectionOptions);
    }
}

export default new App();