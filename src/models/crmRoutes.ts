// import {Request, Response, Application} from "express";
// import {AppRoutes} from "./routes";

// export class Routes
// {
//     public setRoutes(app: Application)
//     {
//         // register express routes from defined application routes
//         AppRoutes.forEach(route => {
//             (app as any)[route.getMethod()](route.getPath(), (req: Request, res: Response, next: Function) => {
//                 const result = (new (route.getController() as any))[route.getAction()](req, res, next);
//                 if (result instanceof Promise) {
//                     result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

//                 } else if (result !== null && result !== undefined) {
//                     res.json(result);
//                 }
//             });
//         });
//     }
// }