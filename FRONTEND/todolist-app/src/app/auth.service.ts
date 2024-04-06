import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router:Router = inject(Router);

  private authUrl = 'http://localhost:3000/api/auth'
  private localStorageKey = 'authKey';
  isLoggedIn = false; // Estado de la autenticación del usuario

  constructor(){
    this.isLoggedIn = !!localStorage.getItem(this.localStorageKey);
  }

  // Método para iniciar sesión
  async login(user:string, password:string): Promise<any> {
    let loggedIn:Boolean = false;
    let body = {username: user, password}

    loggedIn = await this.postDataUser(body, 'login')
    .then((data:any) => {
      let token = data['accessToken'];

      if(!token){
        return false;
      }

      localStorage.setItem(this.localStorageKey, token);
      this.isLoggedIn = true;
      return true;
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
      return false;
    });

    return await loggedIn;
  }

  async signup(username: string, email: string, password: string): Promise<any>{
    let signedUp:Boolean = false;
    let body = {username, email, password};

    signedUp = await this.postDataUser(body, 'signup')
    .then((data:any) => {
      let token = data['accessToken'];

      if(!token){
        return false;
      }

      localStorage.setItem(this.localStorageKey, token);
      this.isLoggedIn = true;
      return true;
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
      return false;
    });

    return await signedUp;
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem(this.localStorageKey);
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  async postDataUser(body:{}, action:string): Promise<any>{
    const response = await fetch(`${this.authUrl}/${action}`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  }
}
