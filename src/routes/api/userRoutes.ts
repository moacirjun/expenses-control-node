import {UserController} from "../../controllers/userController";
import {Router} from "express";

export function Routes(): Router
{
    const controller = new UserController();

    return Router()
    .get('/users/', controller.all.bind(controller))
    .get('/users/:id', controller.one.bind(controller))
    .post('/users/', controller.save.bind(controller))
    .delete('/users/:id', controller.remove.bind(controller));
}