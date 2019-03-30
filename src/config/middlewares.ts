import {Request, Response} from "express";
import {EntityNotFoundError} from "../exceptions/EntityNotFoundError";
export class Middlewares
{
    public static notFoundRequest(request: Request, response: Response, next: Function)
    {
        response.status(404).send();
    }

    public static entityNotFound(error: EntityNotFoundError, request: Request, response: Response, next: Function)
    {
        if (error.name === "EntityNotFoundError") {
            return response.status(404).send({code: 404, message: error.message});
        }
        
        next(error);
    }

    public static genericError(error: Error, request: Request, response: Response, next: Function)
    {
        response.status(500).json({ error: error.name, message: error.message });
    }
}