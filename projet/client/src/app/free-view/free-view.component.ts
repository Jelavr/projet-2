import { AfterViewInit, Component, ElementRef, HostListener, ViewChild} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Axios, { AxiosResponse } from "axios";
import { Subscription } from "rxjs";
import { CheckDifferencesMessage,
        FreeID,
        GameSessionCreationMessage,
        GameType,
        JoinGameSessionMessage,
        MultiEvent,
        MultiMessage,
        MultiSession,
        NewGameSessionMessage,
        QuitGameMessage, } from "../../../../common/communication/messages";
import { JSON3DWrapper } from "../../../../common/communication/scene";
import { API, BASE_SERVER_URL, CHECK_FREE, JOIN, MICRO, NEW, NYAN_CAT_GIFS, QUIT, REQUEST_MULTI, SESSION, STARTGAME } from "../constantes";
import { GameComponent } from "../game/game.component";
import { MessagesComponent } from "../messages/messages.component";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { FreeViewGameError } from "../service/error_handling/customErrors/freeViewGameError";
import { KeyEventsService } from "../service/key-events/key-events.service";
import { RenderService } from "../service/render/render.service";
import { SocketService } from "../service/socket/socket.service";
import { UserService } from "../service/user/user.service";

const ONE_SECONDS: number = 1000;

@Component({
  selector: "app-free-view",
  templateUrl: "./free-view.component.html",
  styleUrls: ["../free-view/free-view.component.css"],
})
export class FreeViewComponent implements AfterViewInit {
  private readonly RIGHT_CLICK: number = 2;

  @ViewChild("msgBoxHTML")
  public msgBox: MessagesComponent;

  @ViewChild("containerOriginal")
  public originalRef: ElementRef;

  @ViewChild("containerModified")
  public modifiedRef: ElementRef;

  @ViewChild(GameComponent)
  public gameComponent: GameComponent;

  @ViewChild("image")
  public image: ElementRef;
  public objectsOriginal: JSON3DWrapper[];
  public objectsModified: JSON3DWrapper[];
  public gameSessionID: string;
  public gameID: string;
  public start: boolean;
  public customErrorHandler: CustomErrorHandler;
  public loadingGif: string[] = [];

  public isMulti: boolean;

  public multiSubscription: Subscription;

  public errorSound: Howl = new Howl({
    src: ["../../assets/no.mp3"],
  });

  public constructor(private renderService: RenderService,
                     private userService: UserService,
                     private keyEventsService: KeyEventsService,
                     private _Activatedroute: ActivatedRoute,
                     private socketService: SocketService,
                     public router: Router) {
                       this.gameSessionID = "";
                       this.gameID = "";
                       this.start = true;
                       this.customErrorHandler = new CustomErrorHandler;
                       this.isMulti = (this._Activatedroute.snapshot.params["type"] === "MultiPlayer");
                       this.loadingGif.push(this.getRandomGif());
                       this.loadingGif.push(this.getRandomGif());
                     }

  @HostListener("window:resize", ["$event"])
  public onResize(): void {
      this.renderService.onResize();
  }

  @HostListener("document:keydown", ["$event"])
  public keyEventHandle(event: KeyboardEvent): void {
    this.keyEventsService.handle(event);
  }

  @HostListener("document:mousemove", ["$event"])
  public mouseRightClick(event: MouseEvent): void {
    if (event.buttons === this.RIGHT_CLICK) {
      this.renderService.cameraRotate(event);
    }
  }

  @HostListener("window:beforeunload", [])
  public quitGame(): void {
    if (this.isMulti) {this.multiSubscription.unsubscribe(); }
    if (this.renderService.cheatMode) { this.renderService.cheat(); }
    const msg: QuitGameMessage = {
      gameSessionId: this.gameSessionID,
      gameType: GameType.Free,
    };
    Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + QUIT, msg);
  }

  public throwError(): (error: Error) => void {
    return (error: Error): void => {
      this.customErrorHandler.handleError(error);
    };
  }

  public mouseLeftClick(event: MouseEvent): void {
    if (event && this.gameComponent.canClick) {
      if (!this.renderService["camera"]) { return; }
      const ids: FreeID = { objId: "", gameSessionID: this.gameSessionID, user: this.userService.user.username};
      ids.objId = this.renderService.getObjectId(event);
      Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + CHECK_FREE, ids).then((msg: AxiosResponse<CheckDifferencesMessage>) => {
      if (msg.data.differenceFound && msg.data.differencesCount) {
        if (this.renderService.checkDifferences(ids.objId)) {
          this.differenceFound(msg.data.differencesCount);
        }
      } else {
        this.gameComponent.errorClick(event);
        this.image.nativeElement.style.cursor = "not-allowed";
        setTimeout(() => { this.image.nativeElement.style.cursor = "default"; }, ONE_SECONDS);
      }
    }).catch(this.throwError);
  }
}

  public ngAfterViewInit(): void {
    if (this.isMulti) {
      this.joinSession().then(() => {
        this.multiSubscription = this.socketService.getMultiDifferences().subscribe((msg: MultiMessage) => {
          this.handleMultiMessage(msg);
        });
        this.socketService.joinRoom(this.gameSessionID);
      }).catch(this.throwError);
    } else {
      this.createSession();
    }
  }

  private createSession(): void {
    const msg: NewGameSessionMessage = {
      user: this.userService.user.username,
      gameID: this._Activatedroute.snapshot.params["id"],
      gameType: GameType.Free,
    };
    Axios.put<GameSessionCreationMessage>(BASE_SERVER_URL + API + MICRO + SESSION + NEW, msg)
    .then((res: AxiosResponse<GameSessionCreationMessage>) => {
      this.initializeGame(res.data);
    }).catch(this.throwError);
  }

  private async joinSession(): Promise<void> {
    const joinMessage: JoinGameSessionMessage = { gameSessionId: this._Activatedroute.snapshot.params["id"],
                                                  user: this.userService.user.username,
                                                  gameType: GameType.Free };

    return Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + JOIN, joinMessage)
    .then((res: AxiosResponse<GameSessionCreationMessage>) => {
      this.initializeGame(res.data);
    })
    .catch(this.throwError as ((error: Error) => void));
  }

  public initializeGame(message: GameSessionCreationMessage): void {
    if (message.gameSessionCreated && message.freeGameSession) {
      this.gameComponent.gameName = message.freeGameSession.name;
      this.gameSessionID = message.freeGameSession.id;
      this.objectsOriginal = message.freeGameSession.objectsOriginal;
      this.objectsModified = message.freeGameSession.objectsModified;
      this.renderService.initialize(this.originalRef.nativeElement, this.modifiedRef.nativeElement,
                                    this.objectsOriginal, this.objectsModified);
      this.start = false;
      this.gameComponent.loading = false;
      this.msgBox.joinRoom(this.gameSessionID);
    } else {
      alert(message.errorMessage);
      this.quitGame();
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
          this.gameComponent.opponentDifference(msg.differenceCount);
          if (msg.objectId) { this.renderService.checkDifferences(msg.objectId); }
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

  public onStartGame(): void {
    Axios.put(BASE_SERVER_URL + API + MICRO + SESSION + STARTGAME + this.gameSessionID).then((msg: AxiosResponse<boolean>) => {
      if (msg.data) {
        this.start = true;
      } else {
        throw new FreeViewGameError;
      }
    }).catch(this.throwError);
  }

  public onExitGame(replay: boolean): void {
    if (replay) {
      this.onReplay();
    } else {
      this.quitGame();
      this.router.navigate(["selection"]).catch(this.throwError);
    }
  }

  public onEndGame(): void {
    this.gameComponent.endGame();
  }

  public differenceFound(diff: number): void {
    this.gameComponent.differenceFound(diff);
  }

  public onReplay(): void {
    this.multiSubscription.unsubscribe();
    Axios.get(BASE_SERVER_URL + API + MICRO + SESSION + REQUEST_MULTI)
    .then((response: AxiosResponse<MultiSession[]>) => {
      const idx: number = response.data.findIndex((session: MultiSession) => session.gameId === this.gameID);
      if (idx >= 0) { // join
        this.router.navigate(["selection"], {skipLocationChange: true})
        .then(() => {
          this.router.navigate(["FreeView", "MultiPlayer", response.data[idx].gameSessionId])
          .catch(this.throwError);
        }).catch(this.throwError);
      } else {        // create
        const type: GameType = GameType.Free;
        this.router.navigate(["lobby", type, this.gameID]).catch(this.throwError);
      }
    })
    .catch(this.throwError);
  }

  public getRandomGif(): string {
    return NYAN_CAT_GIFS[Math.floor(Math.random() * NYAN_CAT_GIFS.length)];
  }
}
