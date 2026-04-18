import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login ( username: string, password: string ) {
    return this.http.post<any>(`${this.api}/api/authenticate`, { username, password }).pipe(
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
