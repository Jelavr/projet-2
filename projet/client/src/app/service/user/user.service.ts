import { Injectable } from "@angular/core";
import Axios, {AxiosPromise, AxiosResponse} from "axios";
import { BASE_SERVER_URL, LOGIN, USERS } from "src/app/constantes";
import { AskUsernameMessage, LoginMessage } from "../../../../../common/communication/messages";
import { User } from "../../../../../common/communication/user";

@Injectable({
  providedIn: "root",
})
export class UserService {

  public user: User;

  private outputServiceText: string;
  private readonly BASE_URL: string;

  public constructor() {
    this.user = {username: ""};
    this.outputServiceText = "";
    this.BASE_URL = BASE_SERVER_URL + USERS + LOGIN;
   }

  private setName(name: string): void {
    this.user = {username: name};
  }

  public async requestUsername(username: string): Promise < boolean> {
    return this.askLogin(username).then((message: AxiosResponse<LoginMessage>) => {

      if (message.data.usernameAccepted) {
        this.setName(username);
      }

      return message.data.usernameAccepted;
    });
  }

  public getOutputServiceText(): string {return this.outputServiceText; }

  public checkName(minValue: number, maxValue: number, input: string): boolean {
    this.outputServiceText = "";

    return (this.checkLength(minValue, maxValue, input) && this.isAlpha(input));
  }

  private checkLength(minValue: number, maxValue: number, input: string): boolean {
    const correctLength: boolean = (input.length >= minValue && input.length <= maxValue);
    this.outputServiceText = correctLength ? "" : "Le nom doit être d'une longueur comprise entre " +
    minValue + " et " + maxValue + " caractères.\n";

    return correctLength;
  }

  private isAlpha(input: string): boolean {
    const isAlpha: boolean = (input.match(/^[a-zA-Z0-9]+$/i) !== null);
    this.outputServiceText = isAlpha ? "" : "Le nom doit être composé de caractères alphanumériques seulement.\n";

    return isAlpha;
  }

  public askLogin(username: string): AxiosPromise<LoginMessage> {
    const msg: AskUsernameMessage = {username: username};

    return Axios.put<LoginMessage>(this.BASE_URL, msg);
  }
}
