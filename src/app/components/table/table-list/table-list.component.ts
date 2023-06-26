import { Component } from '@angular/core';
import Table from 'src/app/interfaces/table.interface'
import { TableService } from 'src/app/services/table/table.service';
import { MatDialog } from '@angular/material/dialog';
import { TableFormComponent } from '../table-form/table-form.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getTables();
  }

  private openTableDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, table?: Table): void {
    const dialogRef = this.dialog.open(TableFormComponent, {
      width: '300px',
      height: '345px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: title,
        table: table
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added' || result == 'updated') {
        this.getTables();
      }
    });
  }

  private openConfirmDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, message: string, table_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title, message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirmed') {
        this.deleteTable(table_id);
      }
    });
  }

  private openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }

  getTables() {
    this.tableService.getTables().subscribe((response: GetTablesResponse) => {
      this.tables = response.data;
    });
  }

  addTable() {
    this.openTableDialog('500ms', '500ms', 'Add Table');
  }

  editTable(table: Table) {
    this.openTableDialog('500ms', '500ms', 'Edit Table', table);
  }

  deleteTable(table_id: string) {
    this.tableService.deleteTable(table_id).subscribe((response: any) => {
      this.getTables();
      this.openSnackBar('Table deleted successfully!', 'Close', 4000);
    },
      (error: any) => {
        console.log(error);
      });
  }

  deleteTableDialog(table_id: string) {
    this.openConfirmDialog('500ms', '500ms', 'Delete Table', 'Are you sure you want to delete this table?', table_id);
  }
}
