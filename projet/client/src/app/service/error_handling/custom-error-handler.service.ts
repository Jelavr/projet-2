import { ErrorHandler, Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
  })
export class CustomErrorHandler implements ErrorHandler {

    public handleError(error: Error): void {
          console.error("An error has occured:", error.message);
    }

}
