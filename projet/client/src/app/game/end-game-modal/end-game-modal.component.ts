import { Component, Input, OnInit} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

const IMG_WIN: string = "../../../assets/ezclap.gif";
const IMG_LOST: string = "../../../assets/sadpepe.gif";
const IMG_QUIT: string = "https://media.giphy.com/media/Hwq45iwTIUBGw/giphy.gif";

@Component({
  selector: "app-end-game-modal",
  templateUrl: "./end-game-modal.component.html",
  styleUrls: ["./end-game-modal.component.css"],
})
export class EndGameModalComponent implements OnInit {

  @Input()
  public wingame: boolean;

  public srcImg: string = "../../../assets/sadpepe.jpg";

  public constructor(public modal: NgbActiveModal ) { }

  public ngOnInit(): void {
    switch (this.wingame) {
      case undefined: {
        this.srcImg = IMG_QUIT;
        break;
      }
      case true: {
        this.srcImg = IMG_WIN;
        break;
      }
      case false: {
        this.srcImg = IMG_LOST;
        break;
      }
      default: {
        break;
      }
    }
  }
}
