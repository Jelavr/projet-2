import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { API, BASE_SERVER_URL, UPLOAD } from "src/app/constantes";
import { GameCreationMessage } from "../../../../../common/communication/messages";

@Injectable()
export class ImageService {
  private readonly BASE_URL: string;
  public constructor(private http: HttpClient) {
      this.BASE_URL = BASE_SERVER_URL + API + UPLOAD;
   }

  public generateImageOfDifferences(images: FormData): Observable<GameCreationMessage> {
    return this.http.post<GameCreationMessage>(this.BASE_URL, images).pipe(
      catchError(this.handleError<GameCreationMessage>("generateImageOfDifferences")));
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
