import { Component } from '@angular/core';
import { BillService } from 'src/app/services/bill/bill.service';
import { MatDialog } from '@angular/material/dialog';
import { Bill } from 'src/app/interfaces/bill.interface';
import { SocketService } from 'src/app/services/socket/socket.service';

export interface GetBillsResponse {
  statusCode: string;
  message: string;
  data: any[];
}

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent {
  bills: Bill[] = [];

  constructor(
    public dialog: MatDialog,
    private billService: BillService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.getBills();
    this.socketService.connect();
    this.socketService.on('new-bill', (message) => this.getBills());
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  private getBills() {
    this.billService.getBills().subscribe((bills) => {
      this.bills = bills.data;
    });
  }
}
