import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImagenesServices {
  public urlBack: string;
  hidden: boolean = true;
  constructor(private _http: HttpClient) {
    this.urlBack = 'http://localhost:3000/api/prueba';
  }

  public getImage(id: number): Observable<TResponseDetail> {
    const $URL = `${this.urlBack}/${id}`;
    return this._http.get<any>($URL);
  }

  public getImageAll(): Observable<TResponseDetail> {
    const $URL = `${this.urlBack}`;
    return this._http.get<any>($URL);
  }
}

export type TResponseDetail = {
  code: number;
  status: string;
  message: string;
  response: any;
};
