import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Card, CardInfo, HighScore } from "../../../../common/communication/card";
import { GameType } from "../../../../common/communication/messages";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {

  private readonly TEN: number = 10;
  @Input()
  public card: Card;

  @Input()
  public button1: string = "Jouer";
  @Input()
  public button2: string = "Créer";
  @Input()
  public button3: string = "Joindre";

  @Output() public jouer: EventEmitter<CardInfo> = new EventEmitter<CardInfo>();
  @Output() public creer: EventEmitter<CardInfo> = new EventEmitter<CardInfo>();
  @Output() public join: EventEmitter<CardInfo> = new EventEmitter<CardInfo>();

  public constructor() {
      this.card = {
        gameID: "", gameType: GameType.Simple,
        name: "",
        logo: "",
        solo: new Array<HighScore>(),
        PVP: new Array<HighScore>(),
        joining: false,
      };
  }

  public clickJouer(): void {
    this.jouer.emit({gameID: this.card.gameID, name: this.card.name, gameType: this.card.gameType});
  }

  public clickCreer(): void {
    this.creer.emit({gameID: this.card.gameID, name: this.card.name, gameType: this.card.gameType});
  }

  public clickJoin(): void {
    this.join.emit({gameID: this.card.gameID, name: this.card.name, gameType: this.card.gameType});
  }

  public formatNumber(time: Number): string {
    return time < this.TEN ? "0" + time.toString() : time.toString();
  }

  public toggleJoining(active: boolean): void {
    this.card.joining = active;
  }
}
