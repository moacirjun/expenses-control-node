import {ControllerInterface} from "../controllers/controllerInterface";

export class Route
{
    private method: string;
    private path: string;
    private controller: ControllerInterface;
    private action: string;

    constructor(method: string, path: string, controller: ControllerInterface, action: string)
    {
        this.method = method;
        this.path = path;
        this.controller = controller;
        this.action = action;
    }

    public getMethod(): string
    {
        return this.method;
    }

    public getPath(): string
    {
        return this.path;
    }

    public getController(): ControllerInterface
    {
        return this.controller;
    }

    public getAction(): string
    {
        return this.action;
    }
};