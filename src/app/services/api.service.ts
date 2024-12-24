import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getDataWithHeaders(apiUrl: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // or any custom header
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDE1ZTIzNjgyMmY3ODgxZDUwN2E4NjIyMWM1ZTQxMiIsIm5iZiI6MTczNDk3MTk2MS43NTIsInN1YiI6IjY3Njk5MjM5Y2Q1Y2I3ZWQxZDBiMWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XS9eVav1I8Zsg1azdU3-wX84I1mCrme8E_s9TeAkXOk' // replace 'YOUR_TOKEN' with the actual token
    });
    return this.http.get<any>(apiUrl, { headers });
  }
}
