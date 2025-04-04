import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-account-form',
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent implements OnInit {
  @Input() public user!: User;
  @Output() public userSaved = new EventEmitter<User>();

  public formGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    firstname: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    pseudo: new FormControl<string>('', [Validators.required]),
  });

  constructor() {
    this.formGroup.disable();
  }

  ngOnInit(): void {
    if (this.user) {
      this.formGroup.reset({
        firstname: this.user.firstname,
        name: this.user.name,
        password: this.user.password,
        pseudo: this.user.pseudo,
      });
    }
  }

  public save(): void {
    const fv = this.formGroup.value;

    this.userSaved.emit({
      email: this.user.email,
      firstname: fv.firstname!,
      name: fv.name!,
      password: fv.password!,
      pseudo: fv.pseudo!,
    });

    this.formGroup.disable();
  }
}
