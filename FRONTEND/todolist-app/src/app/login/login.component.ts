import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  errorMsg: String | undefined;

  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  
  login(){
    let user:string = this.loginForm.value.username ?? '';
    let password:string = this.loginForm.value.password ?? '';

    this.authService.login(user, password)
    .then(loggedIn => {
      if(loggedIn){
        this.errorMsg = undefined;
        this.router.navigate(['/']);
      }else{
        this.errorMsg = 'Los datos ingresados no coinciden.'
      }
    })
    .catch(err => {
      this.errorMsg = 'Hubo un error al procesar la solicitud. ' + err;
    })
  }
}
