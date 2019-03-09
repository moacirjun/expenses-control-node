import  { User } from "../models/entity/User";
import {Request, Response, NextFunction} from "express";
import {Repository, getRepository} from "typeorm";
import {ControllerInterface} from "./controllerInterface";
import { EntityNotFoundError } from "../exceptions/EntityNotFoundError";

export class UserController implements ControllerInterface
{
    private userRepository: Repository<User>;

    constructor()
    {
        this.userRepository = getRepository(User);
    }

    public async all(request: Request, response: Response, next: NextFunction)
    {
        let allUsers = await this.userRepository.find();
        response.status(200).send(allUsers);
    }

    public async one(request: Request, response: Response, next: NextFunction)
    {
        let user = await this.userRepository.findOne(request.params.id);

        if (user === null || user === undefined) {
            return next(new EntityNotFoundError("User", request.params.id));
        }

        response.status(200).send(user);
    }

    public async save(request: Request, response: Response, next: NextFunction)
    {
        let user = await this.userRepository.save(request.body);

        response.status(201).send(user);
    }

    public async remove(request: Request, response: Response, next: NextFunction)
    {
        let userToRemove = await this.userRepository.findOne(request.params.id);

        if (userToRemove === null || userToRemove === undefined) {
            return next(new EntityNotFoundError("User", request.params.id));
        }

        await this.userRepository.remove(userToRemove);

        response.status(204).send({});
    }
}