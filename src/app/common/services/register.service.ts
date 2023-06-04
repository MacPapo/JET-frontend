import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    private apiUrl = '/api';
    
    constructor(private http: HttpClient) { }

    register(email: string, password: string, firstName: string, lastName: string, category: string): Observable<any> {
        const registerUrl =  `${this.apiUrl}/auth/register`;
        return this.http.post(registerUrl, { firstName, lastName, email, password, userCategory: category });
    }
}
