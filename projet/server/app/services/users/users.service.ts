import { injectable } from "inversify";
import "reflect-metadata";
import { MAX_CHARACTER, MIN_CHARACTER } from "../../../../client/src/app/constantes";
import { LoginMessage } from "../../../../common/communication/messages";
import { User } from "../../../../common/communication/user";

@injectable()
export class UsersService {

    private users: User[];

    public constructor() {
        this.users = new Array();
    }

    public addUser(u: User): number {
        return this.users.push(u);
    }

    public removeUser(u: User): boolean {
        const idx: number = this.findIdxByUsername(u.username);
        const userExists: boolean = idx >= 0;
        if (userExists) {
            this.users.splice(idx, 1);
        }

        return userExists;
    }

    public findIdxByUsername(username: string ): number {
        return this.users.findIndex((user: User) => user.username === username);
    }

    public checkUsername (username: string): LoginMessage {

        const isAlpha: boolean = (username.match(/^[a-zA-Z0-9]+$/i) !== null);
        const correctLength: boolean = (username.length >= MIN_CHARACTER && username.length < MAX_CHARACTER);
        const available: boolean = this.findIdxByUsername(username) < 0;

        if (isAlpha && correctLength && available) {
            return {
                usernameAccepted: true,
            };
        } else {
            let errorMsg: string = "";
            errorMsg += isAlpha ? "" : "Le nom doit être composé de caractères alphanumériques seulement.\n" ;
            errorMsg += correctLength ? "" : "Le nom doit avoir une longueur comprise entre 3 et 15 caractères.\n";
            errorMsg += available ? "" : "Ce nom d'utilisateur est déjà pris.\n";

            return {
                usernameAccepted: false,
                errorMessage: errorMsg,
            };
        }

    }

}
