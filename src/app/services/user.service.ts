import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USER_KEY = 'USER';

  private _users: User[] = [];
  private _userLogged: User | undefined;

  private readonly router = inject(Router);

  constructor() {
    const existingUsers = localStorage.getItem(this.USER_KEY);
    if (existingUsers) {
      this._users = JSON.parse(existingUsers);
    }
  }

  public getList(): User[] {
    return this._users;
  }

  public addUserToList(user: User): void {
    this._users.push(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(this._users));
  }

  public checkUserPassword(userEmail: string, password: string): boolean {
    const user = this.getUserByEmail(userEmail);

    if (user) {
      return user.password === password;
    } else {
      return false;
    }
  }

  public getUserByEmail(email: string): User | undefined {
    return this._users.find((user) => user.email === email);
  }

  public setUserLogged(user: User | undefined): void {
    this._userLogged = user;
  }

  public getUserConnectedFullName(): string | undefined {
    if (this._userLogged) {
      return `${this._userLogged.firstname} ${this._userLogged.name}`;
    } else {
      return undefined;
    }
  }

  public logout(): void {
    this.setUserLogged(undefined);
    this.router.navigateByUrl('login');
  }

  public isUserLoggedIn(): boolean {
    return !!this._userLogged;
  }

  public getUserLogged() {
    return this._userLogged;
  }

  public updateUser(user: User) {
    const userDB = this._users.find((userDb) => userDb.email === user.email);
    if (userDB) {
      userDB.password = user.password;
      userDB.name = user.name;
      userDB.firstname = user.firstname;
      userDB.pseudo = user.pseudo;
    }
    this.setUserLogged(userDB);
    localStorage.setItem(this.USER_KEY, JSON.stringify(this._users));
  }
}
