import { ControllerInterface } from "./controllerInterface";
import { Repository, getRepository } from "typeorm";
import { Category } from "../models/entity/Category";
import { Response, Request } from "express-serve-static-core";
import { EntityNotFoundError } from "../exceptions/EntityNotFoundError";


export class CategoryController implements ControllerInterface
{
    private categoryRepository: Repository<Category>;

    constructor()
    {
        this.categoryRepository = getRepository(Category);
    }

    public async all(request: Request, response: Response, next: Function)
    {
        let categories = await this.categoryRepository.find();
        response.status(200).send(categories);
    }

    public async one(request: Request, response: Response, next: Function)
    {
        let category = await this.categoryRepository.findOne(request.params.id);

        if (category === undefined || category === null) {
            return next(new EntityNotFoundError("Category", request.params.id));
        }

        response.status(200).send(category);
    }

    public async save(request: Request, response: Response, next: Function)
    {
        let category: Promise<Category>;

        try {
            category = await this.categoryRepository.save(request.body);
        } catch (error) {
            return next(error);
        }

        response.status(201).send(category);
    }

    public async remove(request: Request, response: Response, next: Function)
    {
        let category = await this.categoryRepository.findOne(request.params.id);

        if (category === null || category === undefined) {
            return next(new EntityNotFoundError("Category", request.params.id));
        }

        try {
            await this.categoryRepository.remove(category);
        } catch (error) {
            return next(error);
        }

        response.status(204).send({});
    }
}