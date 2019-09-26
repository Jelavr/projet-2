import { Component} from "@angular/core";
import {timer, Observable, Subscription} from "rxjs";

const TEN: number = 10;
const THOUSAND: number = 1000;
const SIXTY: number = 60;

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
})
export class TimerComponent {

  public time: number;
  public chronotime: Subscription;
  public min: string;
  public sec: string;

  public constructor() {
    this.time = 0;
    this.min = "00";
    this.sec = "00";
  }

  public start(): void {
    const chrono: Observable<number> = timer(0, THOUSAND);
    this.chronotime = chrono.subscribe((x) => this.timer());
  }

  public timer(): void {
    this.time++;
    const minute: number = Math.floor(this.time / SIXTY);
    const second: number = Math.floor((this.time % SIXTY));
    this.min = minute < TEN ? "0" + minute.toString() : minute.toString();
    this.sec = second < TEN ? "0" + second.toString() : second.toString();
  }

  public stop(): number {
    this.chronotime.unsubscribe();

    return this.time;
  }

}
