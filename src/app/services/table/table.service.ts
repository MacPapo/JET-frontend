import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { JwtService } from '../auth/jwt.service';
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

  private accessToken = this.jwtService.getLoginData().accessToken;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': env.xApiKey,
    'Authorization': 'Bearer ' + this.accessToken
  });


  constructor(private jwtService: JwtService, private http: HttpClient) {}

  getTables(): Observable<GetTablesResponse> {
    return this.http.get<GetTablesResponse>(this.apiUrl, { headers: this.headers });
  }

  getTable(id: string): Observable<Table> {
    return this.http.get<Table>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  addTable(table: Table): Observable<Table> {
    return this.http.post<Table>(this.apiUrl, table, { headers: this.headers });
  }

  editTable(table: Table): Observable<Table> {
    return this.http.put<Table>(`${this.apiUrl}/${table._id}`, table, { headers: this.headers });
  }

  deleteTable(id: string): Observable<Table> {
    return this.http.delete<Table>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
