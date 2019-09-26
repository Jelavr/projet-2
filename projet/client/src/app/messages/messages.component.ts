import { Component, OnInit} from "@angular/core";
import gameMessageType from "../../../../common/communication/gameMessageType";
import { SocketService } from "../service/socket/socket.service";

export interface MessageType {
  classCSS: string;
  text: string;
}
@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {

  public msgBox: MessageType[];
  public messageTypes: {[id: string]: MessageType; };
  public ngOnInit(): void {
    this.socketService.getMessages().subscribe((msg) => {
      this.addMessage(msg.messageType, msg.message);
    });
  }
  public constructor(private socketService: SocketService) {
    this.msgBox = new Array<MessageType>();
    this.messageTypes = {};

    this.messageTypes[gameMessageType.DIFFERENCE_FOUND] = {
      classCSS: "differenceFound",
      text: ""};
    this.messageTypes[gameMessageType.IDENTIFICATION_ERROR] = {
      classCSS: "identificationError",
      text: ""};
    this.messageTypes[gameMessageType.BEST_TIME] = {
      classCSS: "bestTime",
      text: ""};
    this.messageTypes[gameMessageType.CONNEXION] = {
      classCSS: "connexion",
      text: ""};
    this.messageTypes[gameMessageType.DECONNEXION] = {
      classCSS: "deconnexion",
      text: ""};
  }

  public joinRoom(room: string): void {
    this.socketService.joinRoom(room);
  }

  public addMessage(msgType: string, msg: string): void {
    this.msgBox.unshift({classCSS: this.messageTypes[msgType].classCSS, text: msg});
  }

}
