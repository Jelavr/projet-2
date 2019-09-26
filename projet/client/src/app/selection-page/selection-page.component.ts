import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import Axios, { AxiosResponse } from "axios";
import { Card, CardInfo } from "../../../../common/communication/card";
import { GameType, MultiSession } from "../../../../common/communication/messages";
import { API, BASE_SERVER_URL, MICRO, REQUEST_MULTI, SESSION } from "../constantes";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { SocketService } from "../service/socket/socket.service";
import { UserService } from "../service/user/user.service";

export let selectedGameID: string;
export let gameSessionToJoin: string;

@Component({
  selector: "app-selection-page",
  templateUrl: "./selection-page.component.html",
  styleUrls: ["../admin-page/admin-page.component.css"],
})
export class SelectionPageComponent implements OnInit {

  public simpleCards: Card[];
  public freeCards: Card[];
  public multiSessions: MultiSession[];

  public loading: boolean = true;
  public customErrorHandler: CustomErrorHandler;
  public constructor(
    private socketGames: SocketService,
    private socketMulti: SocketService,
    public router: Router,
    private userService: UserService) { }

  public updateCardsStatusEvent(): (cards: Card[][]) => void {
    return (cards: Card[][]): void => {
      this.simpleCards = cards[0];
      this.freeCards = cards[1];
      this.loading = false;

      Axios.get(BASE_SERVER_URL + API + MICRO + SESSION + REQUEST_MULTI)
      .then((response: AxiosResponse<MultiSession[]>) => {
        this.multiSessions = response.data;
        this.updateCardsMulti();
      })
      .catch((error: Error) => { this.customErrorHandler.handleError(error); });
    };
  }

  public throwError(): Function {
    return (error: Error): void => {
      this.customErrorHandler.handleError(error);
    };
  }

  public refreshMultiCallback(): (value: MultiSession[]) => void {
    return (multi: MultiSession[]): void => {
      this.multiSessions = multi;
      this.updateCardsMulti();
    };
  }

  public ngOnInit(): void {
    this.socketGames.getGames().subscribe(this.updateCardsStatusEvent());
    this.socketMulti.getMultiplayer().subscribe(this.refreshMultiCallback());
  }

  private updateCardsMulti(): void {
    this.simpleCards.forEach((card: Card) => {
      const idx: number = this.multiSessions.findIndex((session: MultiSession) => session.gameId === card.gameID);
      card.joining = idx >= 0;
    });

    this.freeCards.forEach((card: Card) => {
      const idx: number = this.multiSessions.findIndex((session: MultiSession) => session.gameId === card.gameID);
      card.joining = idx >= 0;
    });
  }

  public clickJouer(cardInfo: CardInfo): void {
    if (this.userService.user.username && this.userService.user.username !== "") {
      selectedGameID = cardInfo.gameID;
      if (cardInfo.gameType === GameType.Simple) {
        this.router.navigate(["SimpleView", "SinglePlayer", cardInfo.gameID]).catch(this.throwError);
      } else {
        this.router.navigate(["FreeView", "SinglePlayer", cardInfo.gameID]).catch(this.throwError);
      }
    } else {
      alert("Veuillez vous connecter avant de commencer a jouer.");
      this.router.navigate(["init"]).catch(this.throwError);
    }
  }

  public clickCreer(cardInfo: CardInfo): void {
    if (this.userService.user.username && this.userService.user.username !== "") {
      selectedGameID = cardInfo.gameID;
      this.router.navigate(["lobby", cardInfo.gameType, cardInfo.gameID]).catch(this.throwError);
    } else {
      alert("Veuillez vous connecter avant de commencer a jouer.");
      this.router.navigate(["init"]).catch(this.throwError);
    }
  }

  public clickJoin(cardInfo: CardInfo): void {

    const idx: number = this.multiSessions.findIndex((session: MultiSession) => cardInfo.gameID === session.gameId);
    if (idx >= 0) {
      const ourSessionToJoin: MultiSession = this.multiSessions[idx];

      if (this.userService.user.username && this.userService.user.username !== "") {
        if (cardInfo.gameType === GameType.Simple) {
          this.router.navigate(["SimpleView", "MultiPlayer", ourSessionToJoin.gameSessionId]).catch(this.throwError);
        } else {
          this.router.navigate(["FreeView", "MultiPlayer", ourSessionToJoin.gameSessionId]).catch(this.throwError);
        }
      } else {
        alert("Veuillez vous connecter avant de commencer a jouer.");
        this.router.navigate(["init"]).catch(this.throwError);
      }
    }

  }

  public toAdmin(): void {
    this.router.navigate(["admin"]).catch(this.throwError);
  }
}
