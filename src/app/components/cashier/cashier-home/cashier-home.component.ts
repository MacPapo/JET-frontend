import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SocketService } from 'src/app/services/socket/socket.service';
import { BillFormComponent } from '../../bills/bill-form/bill-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-cashier-home',
    templateUrl: './cashier-home.component.html',
    styleUrls: ['./cashier-home.component.css']
})
export class CashierHomeComponent {

    constructor(public dialog: MatDialog,
        private socketService: SocketService,
        private snackBar: MatSnackBar) {}

    private openDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ) {
        const dialogRef = this.dialog.open(BillFormComponent, {
            width: '80%',
            height: '70%',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {}
        });
    }

    private openSnackBar(message: string, action: string, duration: number) {
        this.snackBar.open(message, action, {
            duration,
        });
    }

    ngOnInit(): void {
        this.socketService.connect();
        this.socketService.on('cashier-bill-available', (message) => {
            this.openSnackBar(message, 'Close', 4000);
        });
    }

    ngOnDestroy(): void {
        this.socketService.disconnect();
    }

    addBill() {
        this.openDialog('500ms', '500ms');
    }
}
