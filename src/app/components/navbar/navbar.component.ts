import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../services/layout/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogged = false;
  private subscription: Subscription;

  constructor(private NavbarService: NavbarService) {
    this.subscription = NavbarService.getLogged().subscribe(value => {
      this.isLogged = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
