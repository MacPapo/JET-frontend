import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import Table from 'src/app/interfaces/table.interface';
import { FormControl, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table/table.service';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css'],
})
export class TableFormComponent {
  number = new FormControl(0, [Validators.required, Validators.min(1)]);
  seats = new FormControl(0, [Validators.required, Validators.min(1)]);
  isAvailable = new FormControl(true);

  buttonText = 'Add';
  editMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, table?: Table },
    private tableService: TableService,
    public dialogRef: MatDialogRef<TableFormComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    if (data.table) {
      this.number.setValue(data.table.number);
      this.seats.setValue(data.table.seats);
      this.isAvailable.setValue(data.table.isAvailable);
      this.buttonText = 'Update';
      this.editMode = true;
    }
  }

  private triggerValidators(): void {
    if (this.number.untouched || this.seats.untouched || this.isAvailable.untouched) {
      this.number.updateValueAndValidity();
      this.seats.updateValueAndValidity();
      this.isAvailable.updateValueAndValidity();
    }
    this.number.markAsTouched();
    this.seats.markAsTouched();
    this.isAvailable.markAsTouched();
  }

  private openDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title, errorMessage }
    });
  }

  private openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
    });
  }

  addTable() {
    if (this.number.invalid || this.seats.invalid || this.isAvailable.invalid) {
      this.triggerValidators();
    } else {

      const table: Table = {
        number: this.number.value!,
        seats: this.seats.value!,
        isAvailable: this.isAvailable.value!
      };

      if (this.editMode) {
        this.updateTable(table);
      } else {

        this.tableService.addTable(table).subscribe(
          (response: any) => {
            console.log(response);
            this.dialogRef.close('added');
            this.openSnackBar('Table created successfully!', 'Close', 4000);
          },
          (error: any) => {
            this.openDialog('500ms', '500ms', 'Table not added', error.error.message);
          }
        );

      }
    }
  }

  private updateTable(table: Table) {
    table._id = this.data.table!._id;
    this.tableService.editTable(table).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close('updated');
        this.openSnackBar('Table updated successfully!', 'Close', 4000);
      },
      (error: any) => {
        console.log(error);
        this.openDialog('500ms', '500ms', 'Table not updated', error.error.message);
      }
    );
  }


  cancel() {
    this.dialogRef.close('cancel');
  }
}
