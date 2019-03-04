import {Router} from "express";

export function Routes(): Router
{
    return Router()
    .get('/moa/', (req, res, next) => {res.send({message:"Funfa"})});
}