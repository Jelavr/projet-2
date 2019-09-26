import { TestBed } from "@angular/core/testing";
import { Subscriber } from "rxjs";
import { Card } from "../../../../../common/communication/card";
import { GameType } from "../../../../../common/communication/messages";
import socketEvents from "../../../../../common/communication/socketEvents";
import { SocketService } from "./socket.service";

describe("SocketService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  let service: SocketService;

  beforeEach((done) => {
    service = TestBed.get(SocketService);
    service.startConnection();
    done();
  });

  afterEach((done) => {
    service.endConnexion();
    done();
  });

  it("should be created", () => {
   expect(service).toBeTruthy();
  });

  it("should be able to call getGames() correctly", () => {
    spyOn(service, "getGames").and.callThrough();
    service.getGames();
    expect(service.getGames).toHaveBeenCalled();
  });

  it("should be able to call startUserConnection() correctly", () => {
    spyOn(service, "startUserConnection").and.callThrough();
    service.startUserConnection("gorgie");
    expect(service.startUserConnection).toHaveBeenCalled();
  });

  it("should be able to emit an initialization message to the server", () => {
    const expectedUsername: string = "bruuuh";
    // tslint:disable-no-any
    spyOn(service["socket"], "emit").and.callFake((event: string, username: string) => {
      expect(expectedUsername).toBe(JSON.parse(username).username);
    });
    service.emitInitialization(expectedUsername)();
  });

  it("should be able to subscribe new cards to a subscriber.", () => {
    const sub: Subscriber<Card[][]> = new Subscriber<Card[][]>();
    const cards: Card[][] = [ [ { gameID: "123",
                                  gameType: GameType.Free,
                                  name: "bruh",
                                  logo: "",
                                  solo: [],
                                  PVP: [],
                                  joining: false, }]];
    const spy: jasmine.Spy = spyOn(sub, "next");
    spy.and.callFake(() => {
      //
    });
    service.next(sub)(cards);
    expect(spy).toHaveBeenCalled();
  });

  it("should be able to call getMultiDifferences() correctly", () => {
    spyOn(service, "getMultiDifferences").and.callThrough();
    service.getMultiDifferences();
    expect(service.getMultiDifferences).toHaveBeenCalled();
  });

  it("should be able to call getJoinedSession() correctly", () => {
    spyOn(service, "getJoinedSession").and.callThrough();
    service.getJoinedSession();
    expect(service.getJoinedSession).toHaveBeenCalled();
  });

  it("should be able to subscribe an observer", () => {
    const spy: jasmine.Spy = spyOn(service["socket"], "on");
    spy.and.callFake((event: string, fn: Function) => {
      //
    });
    const sub: Subscriber<string> = new Subscriber<string>();
    service.subscribeObserver<string>(socketEvents.JoinedSession)(sub);
    expect(spy).toHaveBeenCalled();
  });
});
