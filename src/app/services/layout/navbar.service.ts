import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setLogged(value: boolean) {
    this.isLogged.next(value);
  }

  getLogged() {
    return this.isLogged.asObservable();
  }
}
