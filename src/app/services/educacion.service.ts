import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private API_URL = `${environment.baseURL}/educacion`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.API_URL);
  }

  add(educacion: Educacion): Observable<String> {
    return this.http.post<String>(`${this.API_URL}/nueva`, educacion);
  }

  delete(educacion: Educacion): any {
    return this.http.delete(`${this.API_URL}/borrar/${educacion.id}`);
  }

  update(educacion: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(`${this.API_URL}/editar/${educacion.id}`, educacion);
  }
}