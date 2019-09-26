import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import Axios, { AxiosResponse } from "axios";
import { GameType, MultiCreationMessage, NewGameSessionMessage, QuitGameMessage } from "../../../../common/communication/messages";
import { API, BASE_SERVER_URL, MICRO, NEW_MULTI, QUIT, SESSION } from "../constantes";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { SocketService } from "../service/socket/socket.service";
import { UserService } from "../service/user/user.service";
import { AlertDeleteComponent } from "./alert-delete/alert-delete.component";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"],
})
export class LobbyComponent implements OnInit {

  public customErrorHandler: CustomErrorHandler;

  private gameId: string;
  private gameType: GameType;

  private gameSessionId: string;
  public constructor(private userService: UserService,
                     private socketService: SocketService,
                     private _Activatedroute: ActivatedRoute,
                     public router: Router,
                     private modalService: NgbModal) {
                       this.gameId = this._Activatedroute.snapshot.params["id"];
                       this.gameType = this._Activatedroute.snapshot.params["type"] === "0" ? GameType.Simple : GameType.Free;
                     }

  public ngOnInit(): void {
    const msg: NewGameSessionMessage = {
      user: this.userService.user.username,
      gameID: this.gameId,
      gameType: this.gameType,
    };
    Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + NEW_MULTI, msg)
    .then((res: AxiosResponse<MultiCreationMessage>) => {
      const message: MultiCreationMessage = res.data;
      if (message.gameSessionCreated) {
        this.gameSessionId = message.gameSessionId;
        this.socketService.getJoinedSession().subscribe((sessionId: string) => {
          if (sessionId === this.gameSessionId) {
            const type: string = this.gameType === GameType.Simple ? "SimpleView" : "FreeView";
            this.router.navigate([type, "MultiPlayer", this.gameSessionId])
            .catch((error: Error) => {
              this.customErrorHandler.handleError(error);
            });
          } else if (sessionId === this.gameSessionId + "deleted") {
            this.gameDeleted();
          }
        });
      }
    })
    .catch((error: Error) => {
      this.customErrorHandler.handleError(error);
    });
  }

  public gameDeleted(): void {
    const config: NgbModalOptions = {backdrop: "static"};
    const modalconfirmation: NgbModalRef = this.modalService.open(AlertDeleteComponent, config);
    modalconfirmation.result
    .then((result) => {
      this.cancelGame();
    }).catch((error: Error) => {
        this.customErrorHandler.handleError(error);
    });
  }

  public cancelGame(): void {
    const msg: QuitGameMessage = {
      gameSessionId: this.gameSessionId,
      gameType: this.gameType,
    };
    Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + QUIT, msg).then(() => {
      this.router.navigate(["selection"]).catch((error: Error) => {
        this.customErrorHandler.handleError(error);
     });
    }).catch((error: Error) => this.customErrorHandler.handleError(error));
  }
}
