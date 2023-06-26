import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor() {
    this.accordion = new MatAccordion();
  }

}
