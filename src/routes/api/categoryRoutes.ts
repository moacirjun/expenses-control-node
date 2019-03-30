import {CategoryController} from "../../controllers/categoryController";
import {Router} from "express";

export function Routes(): Router
{
    const controller = new CategoryController();

    let routes = Router();
    
    routes.route('/category/:id(\\d+)')
        .get(controller.one.bind(controller))
        .delete(controller.remove.bind(controller));

    routes.route('/category/')
        .get(controller.all.bind(controller))
        .post(controller.save.bind(controller));

    return routes;
}