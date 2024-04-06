import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  errorMsg: String | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  signup(){
    let username:string = this.signupForm.value.username ?? '';
    let email:string = this.signupForm.value.email ?? '';
    let password:string = this.signupForm.value.password ?? '';

    this.authService.signup(username, email, password)
    .then(signedUp => {
      if(signedUp){
        this.errorMsg = undefined;
        this.router.navigate(['/']);
      }else{
        this.errorMsg = 'No se pudo realizar el registro.'
      }
    })
    .catch(err => {
      this.errorMsg = 'Hubo un error al procesar la solicitud. ' + err;
    })
  }
}
