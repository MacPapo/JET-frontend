import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLoggedSubject.asObservable();

  constructor() {}

  setLoggedState(isLogged: boolean): void {
    this.isLoggedSubject.next(isLogged);
  }

  getLoggedState(): boolean {
    return this.isLoggedSubject.value;
  }
}
