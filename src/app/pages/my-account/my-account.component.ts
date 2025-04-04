import { Component, inject } from '@angular/core';
import { AccountFormComponent } from '../../components/account-form/account-form.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-my-account',
  imports: [AccountFormComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent {
  public userService = inject(UserService);

  public saveUser(user: User): void {
    this.userService.updateUser(user);

    console.log(this.userService.getUserLogged())
  }
}
