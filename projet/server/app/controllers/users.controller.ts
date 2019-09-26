import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { User } from "../../../common/communication/user";
import { UsersService } from "../services/users/users.service";
import Types from "../types";

@injectable()
export class UsersController {

    public constructor(@inject(Types.UsersService) private usersService: UsersService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/add",
                    (req: Request, res: Response, next: NextFunction) => {
                        const userToAdd: User = req.body as User;
                        res.json(this.usersService.addUser(userToAdd));
        });

        router.put("/remove",
                   (req: Request, res: Response, next: NextFunction) => {
                        const userToRemove: User = req.body as User;
                        res.json(this.usersService.removeUser(userToRemove));
        });

        router.put("/login",
                   (req: Request, res: Response, next: NextFunction) => {
                    res.json(this.usersService.checkUsername(req.body.username));
        });

        return router;
    }
}
