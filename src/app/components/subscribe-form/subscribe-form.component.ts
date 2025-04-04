import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-subscribe-form',
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './subscribe-form.component.html',
  styleUrl: './subscribe-form.component.scss',
})
export class SubscribeFormComponent {
  @Output() public loginClicked = new EventEmitter<void>();
  @Output() public userCreated = new EventEmitter<User>();

  public formGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    firstname: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    pseudo: new FormControl<string>('', [Validators.required]),
  });

  public userSubscribed(): void {
    this.userCreated.emit({
      ...(this.formGroup.value as User),
    });
  }
}
