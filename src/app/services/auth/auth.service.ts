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
        this.saveToken(response.token);
      })
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
