import {ExpenseController} from "../../controllers/expenseController";
import {Router} from "express";

export function Routes(): Router
{
    const controller = new ExpenseController();

    return Router()
    .get('/expense/', controller.all.bind(controller))
    .post('/expense/', controller.save.bind(controller))
    .get('/expense/:id(\\d+)', controller.one.bind(controller))
    .delete('/expense/:id(\\d+)', controller.remove.bind(controller))
    .put('/expense/:id(\\d+)', controller.edit.bind(controller));
}