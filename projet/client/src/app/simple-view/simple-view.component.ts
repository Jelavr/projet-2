import { Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Axios, { AxiosResponse } from "axios";
import { Subscription } from "rxjs";
import { CheckDifferencesMessage,
         GameSessionCreationMessage,
         GameType,
         JoinGameSessionMessage,
         MultiEvent,
         MultiMessage,
         MultiSession,
         NewGameSessionMessage,
         QuitGameMessage,
         SimpleCoordinates, } from "../../../../common/communication/messages";
import { API, BASE_SERVER_URL, CHECK_SIMPLE,
         JOIN, MICRO, NEW,
         NYAN_CAT_GIFS, QUIT, REQUEST_MULTI, SESSION, STARTGAME } from "../constantes";
import { GameComponent } from "../game/game.component";
import { MessagesComponent } from "../messages/messages.component";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { SimpleGameCreationError } from "../service/error_handling/customErrors/simpleGameCreationError";
import { SocketService } from "../service/socket/socket.service";
import { UserService } from "../service/user/user.service";

const PICTURE_WIDTH: number = 440;
const PICTURE_HEIGHT: number = 330;
const IMAGE_BMP_WIDTH: number = 640;
const IMAGE_BMP_HEIGHT: number = 480;
const ONE_SECOND: number = 1000;

@Component({
  selector: "app-simple-view",
  templateUrl: "./simple-view.component.html",
  styleUrls: ["./simple-view.component.css"],
})
export class SimpleViewComponent implements OnInit {

  @ViewChild("msgBoxHTML")
  public msgBox: MessagesComponent;

  @ViewChild("image")
  public image: ElementRef;

  @ViewChild(GameComponent)
  public gameComponent: GameComponent;

  public customErrorHandler: CustomErrorHandler;

  public srcOriginalImage: string;
  public srcModifiedImage: string;
  public baseSrcModifiedImage: string;

  public clientX: number;
  public clientY: number;
  public coords: number[];
  public start: boolean;
  public gameSessionID: string;
  public gameID: string;
  public loadingGif: string[] = [];

  public isMulti: boolean;

  public multiSubscription: Subscription;

  public constructor(private userService: UserService,
                     public router: Router,
                     private _Activatedroute: ActivatedRoute,
                     private socketService: SocketService) {
    this.customErrorHandler = new CustomErrorHandler;
    this.clientX = 0;
    this.clientY = 0;
    this.gameSessionID = "";
    this.gameID = "";
    this.start = false;
    this.coords = new Array<number>();
    this.srcModifiedImage = "";
    this.srcOriginalImage = "";
    this.baseSrcModifiedImage = "";
    this.isMulti = (this._Activatedroute.snapshot.params["type"] === "MultiPlayer");
    this.loadingGif.push(this.getRandomGif());
    this.loadingGif.push(this.getRandomGif());
  }

  @HostListener("window:beforeunload", [])
  public quitGame(): void {
    if (this.isMulti) {this.multiSubscription.unsubscribe(); }
    const msg: QuitGameMessage = {
      gameSessionId: this.gameSessionID,
      gameType: GameType.Simple,
    };
    Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + QUIT, msg);
  }

  public ngOnInit(): void {
    if (this.isMulti) {
      this.joinSession().then(() => {
        this.multiSubscription = this.socketService.getMultiDifferences().subscribe((msg: MultiMessage) => {
          this.handleMultiMessage(msg);
        });
        this.socketService.joinRoom(this.gameSessionID);
      }).catch((error: Error) => {
        this.customErrorHandler.handleError(error);
      });
    } else {
      this.createSession();
    }
  }

  private createSession(): void {
    const msg: NewGameSessionMessage = {
      user: this.userService.user.username,
      gameID: this._Activatedroute.snapshot.params["id"],
      gameType: GameType.Simple,
    };
    Axios.put<GameSessionCreationMessage>( BASE_SERVER_URL + API + MICRO + SESSION + NEW, msg)
      .then((res: AxiosResponse<GameSessionCreationMessage>) => {
        this.initializeGame(res.data);
    }).catch((error: Error) => {
      this.customErrorHandler.handleError(error);
    });
  }

  private async joinSession(): Promise<void> {
    const joinMessage: JoinGameSessionMessage = { gameSessionId: this._Activatedroute.snapshot.params["id"],
                                                  user: this.userService.user.username,
                                                  gameType: GameType.Simple };

    return Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + JOIN, joinMessage)
    .then((res: AxiosResponse<GameSessionCreationMessage>) => {
      this.initializeGame(res.data);
    })
    .catch((error: Error) => {
      this.customErrorHandler.handleError(error);
    });
  }

  public initializeGame(message: GameSessionCreationMessage): void {
    if (message.gameSessionCreated && message.simpleGameSession) {
      this.gameComponent.gameName = message.simpleGameSession.name;
      this.gameSessionID = message.simpleGameSession.id;
      this.srcOriginalImage = message.simpleGameSession.originalImage;
      this.baseSrcModifiedImage = message.simpleGameSession.modifiedImage;
      this.srcModifiedImage = this.baseSrcModifiedImage;
      this.msgBox.joinRoom(this.gameSessionID);
      this.gameComponent.loading = false;
    } else {
      this.quitGame();
      throw new SimpleGameCreationError;
    }
  }

  private handleMultiMessage(msg: MultiMessage): void {
    switch (msg.event) {
      case MultiEvent.Start: {
        this.start = true;
        this.gameComponent.startTimer();
        if (msg.gameId) {this.gameID = msg.gameId; }
        if (msg.players) {
          msg.players.forEach((name: string) => { if (name !== this.userService.user.username) {this.gameComponent.opponent = name; }});
        }
        break;
      }
      case MultiEvent.Difference: {
        if (msg.player !== this.userService.user.username) {
          this.srcModifiedImage = this.baseSrcModifiedImage + "?" + Date.now().toString();
          this.gameComponent.opponentDifference(msg.differenceCount);
        }
        break;
      }
      case MultiEvent.Quit: {
        this.gameComponent.endGame();
        break;
      }
      default: {
        break;
      }
    }
  }

  public coordinates(event: MouseEvent): void {
    if (event && this.gameComponent.canClick) {
      const coordonee: SimpleCoordinates = {
        coord: {
          row: Math.round((event.offsetY * IMAGE_BMP_HEIGHT) / (PICTURE_HEIGHT)),
          col: Math.round((event.offsetX * IMAGE_BMP_WIDTH) / (PICTURE_WIDTH)),
        },
        gameSessionID: this.gameSessionID,
        user: this.userService.user.username,
      };

      Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + CHECK_SIMPLE, coordonee).then((msg: AxiosResponse<CheckDifferencesMessage>) => {
        if (msg.data.differenceFound) {
            this.differenceFound(msg.data);
        } else {
          this.gameComponent.errorClick(event);
          this.image.nativeElement.style.cursor = "not-allowed";
          setTimeout(() => {this.image.nativeElement.style.cursor = "default"; }, ONE_SECOND );
        }

      }).catch((error: Error) => {
        this.customErrorHandler.handleError(error);
      });
    }
  }

  public async onStartGame(t: boolean): Promise<boolean> {

    return Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + STARTGAME + this.gameSessionID).then((msg: AxiosResponse<boolean>) => {
        if (msg.data) {
          return this.start = true;
        } else {
          return this.start = false;
        }
    }).catch((error) => {
      this.customErrorHandler.handleError(error);

      return false;
    });
  }

  public onExitGame(replay: boolean): void {
    if (replay) {
      this.onReplay();
    } else {
      this.quitGame();
      this.router.navigate(["selection"]).catch((error: Error) => {
        this.customErrorHandler.handleError(error);
      });
    }
  }

  public onEndGame(): void {
    this.gameComponent.endGame();
  }

  public differenceFound(diff: CheckDifferencesMessage): void {
    if (diff.differencesCount) {
      this.gameComponent.differenceFound(diff.differencesCount);
    }
    this.srcModifiedImage = this.baseSrcModifiedImage + "?" + Date.now().toString();
  }

  public onReplay(): void {
    this.multiSubscription.unsubscribe();
    Axios.get(BASE_SERVER_URL + API + MICRO + SESSION + REQUEST_MULTI)
    .then((response: AxiosResponse<MultiSession[]>) => {
      const idx: number = response.data.findIndex((session: MultiSession) => session.gameId === this.gameID);
      if (idx >= 0) { // join
        this.router.navigate(["selection"], {skipLocationChange: true}).then(() => {
          this.router.navigate(["SimpleView", "MultiPlayer", response.data[idx].gameSessionId]).catch((error: Error) => {
            this.customErrorHandler.handleError(error);
          });
        }).catch((error: Error) => {
          this.customErrorHandler.handleError(error);
        });
      } else { // create
        const type: GameType = GameType.Simple;
        this.router.navigate(["lobby", type, this.gameID]).catch((error: Error) => {
          this.customErrorHandler.handleError(error);
        });
      }
    })
    .catch((error: Error) => {
      this.customErrorHandler.handleError(error);
    });
  }

  public getRandomGif(): string {
    return NYAN_CAT_GIFS[Math.floor(Math.random() * NYAN_CAT_GIFS.length)];
  }

}
