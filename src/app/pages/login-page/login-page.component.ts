import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SubscribeFormComponent } from '../../components/subscribe-form/subscribe-form.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, SubscribeFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  public isLogin = true;

  public userService = inject(UserService);
  public router = inject(Router);

  constructor() {
    console.log(this.userService.getList());
  }

  public createUser(user: User): void {
    this.userService.addUserToList(user);
    this.isLogin = !this.isLogin;
  }

  public logUser(email: string, password: string) {
    const passwordIsValid = this.userService.checkUserPassword(email, password);

    if (passwordIsValid) {
      const user = this.userService.getUserByEmail(email);
      if (user) {
        this.userService.setUserLogged(user);
        this.router.navigateByUrl('/pokemon-list')
        console.log('Utilisateur connecté');
      }
    } else {
      alert('Mot de passe incorrect');
    }
  }
}
