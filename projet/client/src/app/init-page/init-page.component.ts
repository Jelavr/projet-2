import { Component,  } from "@angular/core";
import { Router } from "@angular/router";
import { EZCLAPS_LOGO, MAX_CHARACTER, MIN_CHARACTER} from "../constantes";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { SocketService } from "../service/socket/socket.service";
import { UserService } from "../service/user/user.service";
@Component({
  selector: "app-init-page",
  templateUrl: "./init-page.component.html",
  styleUrls: ["./init-page.component.css"],
})

export class InitPageComponent  {

  public nomjeu: string;
  public nameInput: string;
  public outputText: string;
  public srcLogo: string;
  public customErrorHandler: CustomErrorHandler;
  public constructor(private userService: UserService,
                     private socketService: SocketService,
                     private router: Router) {
    this.nomjeu = "jeu des différences";
    this.nameInput = "";
    this.outputText = "";
    this.srcLogo = EZCLAPS_LOGO;
    this.customErrorHandler = new CustomErrorHandler;
  }

  public requestCreateUser(): void {

    const checkNameBool: boolean = this.userService.checkName(MIN_CHARACTER, MAX_CHARACTER, this.nameInput);
    this.outputText = this.userService.getOutputServiceText();
    if (checkNameBool) {
      this.outputText = "Vérification...";

      this.userService.requestUsername(this.nameInput).then((usernameAvailable: boolean): void => {
        if (usernameAvailable) {
          this.socketService.startUserConnection(this.nameInput);
        }

        this.outputText = usernameAvailable ? "Vous êtes connecté.e" : "Ce nom est déjà pris!";
        if (usernameAvailable) {
          this.router.navigate(["selection"]).catch((error: Error) => {
           this.customErrorHandler.handleError(error);
        });
        }
      }).catch((error: Error) => {
        if (error.message === "Network Error") {
            this.outputText = "Le serveur n'est pas allumé!";
        }
        this.customErrorHandler.handleError(error);
     });
    }

  }

}
