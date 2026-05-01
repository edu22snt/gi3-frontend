import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected domain: string | undefined;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
   }

  login ( username: string, password: string ) {
    return this.http.post<any>(`${this.domain}/api/authenticate`, { username, password }).pipe(
      tap(response => {
        this.saveToken(response.jwt);
      })
    );
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt');
  }
}
