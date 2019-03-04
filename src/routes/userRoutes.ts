import {UserController} from "../controllers/userController";
import {Route} from "../utils/route";
import {Router, RouterOptions} from "express";

export const Routes = [
    new Route(
        "get",
        "/users/:id",
        UserController,
        "one"
    ),
    new Route(
        "get",
        "/users",
        UserController,
        "all"
    ),
    new Route(
        "post",
        "/users",
        UserController,
        "save"
    ),
    new Route(
        "delete",
        "/users/:id",
        UserController,
        "remove"
    ),
];