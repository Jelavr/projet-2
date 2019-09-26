import { Injectable } from "@angular/core";
import { RenderService } from "../render/render.service";

@Injectable({
  providedIn: "root",
})
export class KeyEventsService {

  public constructor(private renderService: RenderService) {}

  public handle(event: KeyboardEvent): void {
    if (event.defaultPrevented || !this.renderService["camera"]) {
      return;
    }
    switch (event.key) {
      case "s":
        this.renderService.cameraBackward();
        break;

      case "w":
        this.renderService.cameraFoward();
        break;

      case "a":
        this.renderService.cameraLeft();
        break;

      case "d":
        this.renderService.cameraRight();
        break;
      case "t":
        this.renderService.cheat();
        break;
      default:
        event.preventDefault();

        return;
    }
  }

}
