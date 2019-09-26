import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import Axios from "axios";
import { Card, CardInfo } from "../../../../common/communication/card";
import { GameType, UpdateGameMessage } from "../../../../common/communication/messages";
import { ADMIN, BASE_SERVER_URL, DELETE, RESET } from "../constantes";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { SocketService } from "../service/socket/socket.service";
import { ConfirmationModalComponent } from "./confirmation-modal/confirmation-modal.component";
import { FreeViewModalComponent } from "./free-view-modal/free-view-modal.component";
import { SimpleViewModalComponent } from "./simple-view-modal/simple-view-modal.component";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"],
})
export class AdminPageComponent implements OnInit {

  private readonly DELETE: string = "delete";
  private readonly RESET: string = "reset";

  public nameInput: string;
  public loading: boolean;
  public textConfirmation: string;
  public typeUpdate: string;
  public cardInfo: CardInfo;

  public simpleCards: Card[];
  public freeCards: Card[];
  public customErrorHandler: CustomErrorHandler;

  public constructor(
    public dialog: MatDialog,
    private socketService: SocketService,
    private router: Router,
    private modalService: NgbModal ) {
      this.typeUpdate = "";
      this.loading = true;
      this.cardInfo = {gameID: "", gameType: GameType.Simple, name: ""};
    }

  public ngOnInit(): void {
    this.getGames();
  }

  public openSimpleView(): void {
   this.dialog.open(SimpleViewModalComponent, {disableClose: true});
  }

  public openFreeView(): void {
    this.dialog.open(FreeViewModalComponent, {disableClose: true});
  }

  public toSelection(): void {
    this.router.navigate(["selection"]).catch((error: Error) => {
      this.customErrorHandler.handleError(error);
    });
  }
  public getGames(): void {
    this.socketService.getGames().subscribe((cards) => {
      this.simpleCards = cards[0];
      this.freeCards = cards[1];
      this.loading = false;
  });
  }

  public askToDeleteGame(cardInfo: CardInfo): void {
    this.cardInfo = cardInfo;
    this.typeUpdate = this.DELETE;
    this.textConfirmation = "Voulez-vous vraiment supprimer le jeu " + this.cardInfo.name + " ?";
    const modalconfirmation: NgbModalRef = this.modalService.open(ConfirmationModalComponent);
    modalconfirmation.componentInstance.confirmationName = this.textConfirmation;
    modalconfirmation.result.then((result) => {
      if (result) {
        this.confirm();
        }
      }).catch((error: Error) => {
        this.customErrorHandler.handleError(error);
      });
  }

  public askToResetGame(cardInfo: CardInfo): void {
    this.cardInfo = cardInfo;
    this.typeUpdate = this.RESET;
    this.textConfirmation = "Voulez-vous vraiment réinitialiser les temps du jeu " + this.cardInfo.name + "?";
    const modalconfirmation: NgbModalRef = this.modalService.open(ConfirmationModalComponent);
    modalconfirmation.componentInstance.confirmationName = this.textConfirmation;
    modalconfirmation.result.then((result) => {
        if (result === true) {
        this.confirm();
        }
      }).catch((error: Error) => {
        this.customErrorHandler.handleError(error);
      });
  }

  public confirm(): void {
    if (this.typeUpdate === this.DELETE) {
      this.deleteSelectedGame();
    } else if (this.typeUpdate === this.RESET) {
      this.resetSelectedGame();
    }
  }

  private setUpdateGameMessage(): UpdateGameMessage {
    return {
      gameId: this.cardInfo.gameID,
      gameType: this.cardInfo.gameType,
    };
  }

  private deleteSelectedGame(): void {
    const msg: UpdateGameMessage = this.setUpdateGameMessage();
    Axios.post(BASE_SERVER_URL + ADMIN + DELETE, msg)
      .then(() => this.getGames())
      .catch(() => alert("Le jeu n'a pas pu être supprimé, veuillez réessayer"));
  }

  private resetSelectedGame(): void {
    const msg: UpdateGameMessage = this.setUpdateGameMessage();
    Axios.post(BASE_SERVER_URL + ADMIN + RESET, msg)
      .then(() => this.getGames())
      .catch(() => alert("Le jeu n'a pas pu être réinitialisé, veuillez réessayer"));
  }
}
