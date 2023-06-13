import { Component } from '@angular/core';
import Table from 'src/app/interfaces/table.interface'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  tables = [{ number: 1, seats: 2, isAvailable: true },
  { number: 2, seats: 4, isAvailable: true },
  { number: 3, seats: 4, isAvailable: true },
  { number: 4, seats: 6, isAvailable: true },];

  editTable(table: Table) {
    console.log('Edit table', table);
  }

  deleteTable(table: Table) {
    console.log('Delete table', table);
  }

  addTable() {
    console.log('Add table');
  }
}
