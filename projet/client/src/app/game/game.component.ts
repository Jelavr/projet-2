import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {Howl} from "howler";
import {timer, Observable, Subscription} from "rxjs";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import {TimerComponent} from "../timer/timer.component";
import { EndGameModalComponent } from "./end-game-modal/end-game-modal.component";

const THREE: number = 3;
const HALF_DIV_X: number = 30;
const HALF_DIV_Y: number = 20;
const ONE_SECOND: number = 1000;
const MAX_DIFF_MULTI: number = 4;
const MAX_DIFF_SINGLE: number = 7;

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {

  public maxDiff: number;
  public THOUSAND: number = 1000;
  public customErrorHandler: CustomErrorHandler;
  public sound: Howl = new Howl({
    src: ["../../assets/yes.mp3"],
  });

  public errorSound: Howl = new Howl({
    src: ["../../assets/no.mp3"],
  });

  public gameName: string;

  @ViewChild(TimerComponent)
  public timerComponent: TimerComponent;

  @ViewChild("error")
  public error: ElementRef;

  public timecountdown: number;
  public diffcounter: number;

  public loading: boolean;
  @Input()
  public start: boolean;
  public showcountdown: boolean;
  public ready: boolean;
  public opponent: string;
  public opponentDiffcounter: number;

  @Input()
  public isMulti: boolean;

  public canClick: boolean;
  public gameSessionID: string;
  public wingame: boolean;

  @Output() public startgame: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() public exitgame: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  public constructor( private modalService: NgbModal) {
    this.timecountdown = 0;
    this.diffcounter = 0;
    this.gameName = "...";
    this.start = false;
    this.showcountdown = false;
    this.ready = true;
    this.canClick = true;
    this.loading = true;
  }

  public ngOnInit(): void {
    if (!this.isMulti) {
        this.maxDiff = MAX_DIFF_SINGLE;
    } else {
        this.opponentDiffcounter = 0;
        this.opponent = "opponentTest";
        this.maxDiff = MAX_DIFF_MULTI;
    }
  }

  public countdown(): void {
    if (this.isMulti) {
      this.ready = false;
      this.startgame.emit(true);
    } else {
      this.ready = false;
      this.showcountdown = true;
      const countdown: Observable<number> = timer(this.THOUSAND, this.THOUSAND);
      this.timecountdown = THREE;
      const count: Subscription = countdown.subscribe((x) => {
        if (this.timecountdown === 1) {
          this.showcountdown = false;
          this.start = true;
          count.unsubscribe();
          this.startgame.emit(true);
          this.startTimer();
        }
        this.timecountdown--;
      });
    }
  }

  public startTimer(): void {
    this.timerComponent.start();
  }

  public stopTimer(): number {
    if (this.start) {
    return this.timerComponent.stop();
    } else {return 0; }
  }

  public opponentDifference(diff: number): void {
    this.opponentDiffcounter = diff;
    if (this.opponentDiffcounter === this.maxDiff) {
      this.wingame = false;
      this.endGame();
    }
  }

  public differenceFound(diff: number): void {
    this.sound.play();

    this.diffcounter = diff;
    if (diff === this.maxDiff) {
      this.wingame = true;
      this.endGame();
    }
  }

  public endGame(): void {
    this.stopTimer();
    this.canClick = false;
    if (!this.modalService.hasOpenModals()) {
      const config: NgbModalOptions = {backdrop: "static"};
      const modalconfirmation: NgbModalRef = this.modalService.open(EndGameModalComponent, config);
      modalconfirmation.componentInstance.wingame = this.wingame;
      modalconfirmation.result.then((result) => {
        if (result) {
          this.replay();
        } else {
          this.exit();
        }
      }).catch((error: Error) => {
          this.customErrorHandler.handleError(error);
        });
    }
  }

  public exit(): void {
    this.exitgame.emit(false);
  }

  public replay(): void {
    this.exitgame.emit(true);
  }

  public errorClick(event: MouseEvent): void {
    const xPosition: number = event.pageX - HALF_DIV_X;
    const yPosition: number = event.pageY - HALF_DIV_Y;
    this.error.nativeElement.style.left = xPosition + "px";
    this.error.nativeElement.style.top = yPosition + "px";
    this.error.nativeElement.style.display = "block";
    this.errorSound.play();
    this.canClick = false;
    setTimeout(() => {this.error.nativeElement.style.display = "none";
                      this.canClick = true; },
               ONE_SECOND );
  }

}
