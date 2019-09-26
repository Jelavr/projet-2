import { Injectable } from "@angular/core";
import { Observable, Subscriber, TeardownLogic } from "rxjs";
import * as io from "socket.io-client";
import { BASE_SERVER_URL } from "src/app/constantes";
import { Card } from "../../../../../common/communication/card";
import { GameMessage } from "../../../../../common/communication/gameMessage";
import { MultiMessage, MultiSession } from "../../../../../common/communication/messages";
import SocketEvents from "../../../../../common/communication/socketEvents";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private readonly BASE_URL: string;

  private socket: SocketIOClient.Socket;

  public constructor() {
    this.BASE_URL = BASE_SERVER_URL;
  }

  public startConnection(): void {
    this.socket = io(this.BASE_URL);
  }

  public emitInitialization(username: string): Function {
    return () => { this.socket.emit(SocketEvents.Initialisation, JSON.stringify({ "username": username })); };
  }

  public next<T>(obs: Subscriber<T>): Function {
    return (elem: T) => { obs.next(elem); };
  }

  public subscribeObserver<T>(event: string):
  (subscriber: Subscriber<T>) => TeardownLogic {
    return (subscriber: Subscriber<T>): TeardownLogic => {
      this.socket.on(event.toString(), this.next(subscriber));
    };
  }

  public startUserConnection(username: string): void {
     this.startConnection();
     this.socket.on(SocketEvents.Connect, this.emitInitialization(username));
  }

  public getGames(): Observable<Card[][] > {
    this.startConnection();
    this.socket.emit(SocketEvents.LoadGames);

    return new Observable<Card[][]>((obs) => {
      this.socket.on(SocketEvents.LoadGames, this.next(obs));
    });
  }

  public getMessages(): Observable <GameMessage> {
    this.startConnection();

    return new Observable<GameMessage>((obs) => {
      this.socket.on(SocketEvents.Message, this.next(obs));
    });
  }

  public getMultiplayer(): Observable <MultiSession[]> {
    this.startConnection();

    return new Observable<MultiSession[]>((obs) => {
      this.socket.on(SocketEvents.Multi, this.next(obs));
    });
  }

  public getMultiDifferences(): Observable <MultiMessage> {
    this.startConnection();

    return new Observable<MultiMessage>(this.subscribeObserver<MultiMessage>(SocketEvents.MultiDiff));
  }

  public getJoinedSession(): Observable <string> {
    this.startConnection();

    return new Observable<string>(this.subscribeObserver<string>(SocketEvents.JoinedSession));
  }

  public joinRoom(room: string): void {
    this.socket.emit(SocketEvents.Join, room);
  }

  public endConnexion(): void {
    this.socket.close();
  }
}
