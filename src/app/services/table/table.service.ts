import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Table from 'src/app/interfaces/table.interface';

interface GetTablesResponse {
  statusCode: string;
  message: string;
  data: Table[];
}

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private apiUrl = '/api/tables';

  constructor(private http: HttpClient) {}

  getTables(): Observable<GetTablesResponse> {
    return this.http.get<GetTablesResponse>(this.apiUrl);
  }

  getTable(id: string): Observable<Table> {
    return this.http.get<Table>(`${this.apiUrl}/${id}`);
  }

  addTable(table: Table): Observable<Table> {
    return this.http.post<Table>(this.apiUrl, table);
  }

  editTable(table: Table): Observable<Table> {
    return this.http.put<Table>(`${this.apiUrl}/${table._id}`, table);
  }

  deleteTable(id: string): Observable<Table> {
    return this.http.delete<Table>(`${this.apiUrl}/${id}`);
  }
}
