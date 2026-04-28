import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private _loginApiBase = environment.loginApiBase;
  private _signupApiBase = environment.signupApiBase;

  constructor(private _http: HttpClient) {}

  login(payload: { email: string; password: string }): Observable<any> {
    return this._http.post(this._loginApiBase, payload, { withCredentials: true }).pipe(catchError(this.handleError));
  }

  signup(payload: any = {}): Observable<any> {
    return this._http.post(this._signupApiBase, payload, { withCredentials: true }).pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any): Observable < any > {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.statusText || 'Network error'}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    throw (errMsg);
  }

}