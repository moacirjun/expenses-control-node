import { ControllerInterface } from "./controllerInterface";
import { Repository, getRepository } from "typeorm";
import { Expense } from "../models/entity/Expense";
import { Response, Request } from "express-serve-static-core";
import { EntityNotFoundError } from "../exceptions/EntityNotFoundError";
import { Category } from "../models/entity/Category";


export class ExpenseController implements ControllerInterface
{
    private expenseRepository: Repository<Expense>;

    constructor()
    {
        this.expenseRepository = getRepository(Expense);
    }

    public async all(request: Request, response: Response, next: Function)
    {
        let expenses = await this.expenseRepository.find();
        response.status(200).send(expenses);
    }

    public async one(request: Request, response: Response, next: Function)
    {
        let expense = await this.expenseRepository.findOne(request.params.id);

        if (expense === undefined || expense === null) {
            return next(new EntityNotFoundError("Expense", request.params.id));
        }

        response.status(200).send(expense);
    }

    public async save(request: Request, response: Response, next: Function)
    {
        let category = await getRepository(Category).findOne(request.body.category);

        if (category === undefined || category === null) {
            return next(new EntityNotFoundError("Category", request.body.category));
        }

        let expense = new Expense();

        expense.name = request.body.name;
        expense.description = request.body.description;
        expense.amount = request.body.amount;
        expense.category = category;

        try {
            expense = await this.expenseRepository.save(expense);
        } catch (error) {
            next(error);
        }

        response.status(201).send(expense);
    }

    public async edit(request: Request, response: Response, next: Function)
    {
        let expense = await this.expenseRepository.findOne(request.params.id);

        if (expense === undefined || expense === null) {
            return next(new EntityNotFoundError("Expense", request.params.id));
        }
        
        let category = await getRepository(Category).findOne(request.body.category);

        if (category === undefined || category === null) {
            return next(new EntityNotFoundError("Category", request.body.category));
        }

        expense.name = request.body.name;
        expense.description = request.body.description;
        expense.amount = request.body.amount;
        expense.category = category;

        try {
            expense = await this.expenseRepository.save(expense);
        } catch (error) {
            next(error);
        }

        response.status(201).send(expense);
    }

    public async remove(request: Request, response: Response, next: Function)
    {
        let expense = await this.expenseRepository.findOne(request.params.id);

        if (expense === null || expense === undefined) {
            return next(new EntityNotFoundError("Expense", request.params.id));
        }

        await this.expenseRepository.remove(expense);

        response.status(204).send({});
    }
}