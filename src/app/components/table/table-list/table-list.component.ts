import { Component } from '@angular/core';
import Table from 'src/app/interfaces/table.interface'
import { TableService } from 'src/app/services/table/table.service';
import { MatDialog } from '@angular/material/dialog';
import { TableFormComponent } from '../table-form/table-form.component';

interface GetTablesResponse {
  statusCode: string;
  message: string;
  data: Table[];
}

@Component({
  selector: 'app-table-list',
  providers: [TableService],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  tables: Table[] = [];

  constructor(private tableService: TableService,
    private dialog: MatDialog,) {}

  ngOnInit() {
    this.getTables();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TableFormComponent, {
      width: '500px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  getTables() {
    this.tableService.getTables().subscribe((response: GetTablesResponse) => {
      this.tables = response.data;
    });
  }

  getTable(id: number) {
    console.log('Get table', id);
  }

  addTable() {
    this.openDialog('500ms', '500ms');
  }

  editTable(table: Table) {
    console.log('Edit table', table);
  }

  deleteTable(table: Table) {
    console.log('Delete table', table);
  }

}
