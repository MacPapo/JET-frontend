import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  category: string | null;

  constructor() {
    this.category = localStorage.getItem('category');
    console.log(this.category);
  }
}
