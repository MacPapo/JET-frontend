import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface GetBillsResponse {
  statusCode: string;
  message: string;
  data: any[];
}


@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = '/api/bills';

  constructor(private httpClient: HttpClient) {}

  getBills(): Observable<GetBillsResponse> {
    return this.httpClient.get<GetBillsResponse>(this.apiUrl);
  }

  getBill(id: string): Observable<GetBillsResponse> {
    return this.httpClient.get<GetBillsResponse>(`${this.apiUrl}/${id}`);
  }

  createBill(bill: any): Observable<GetBillsResponse> {
    return this.httpClient.post<GetBillsResponse>(this.apiUrl, bill);
  }

  updateBill(id: string, bill: any): Observable<GetBillsResponse> {
    return this.httpClient.put<GetBillsResponse>(`${this.apiUrl}/${id}`, bill);
  }

  deleteBill(id: string): Observable<GetBillsResponse> {
    return this.httpClient.delete<GetBillsResponse>(`${this.apiUrl}/${id}`);
  }

}
