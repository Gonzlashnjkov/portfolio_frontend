import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private API_URL = `${environment.baseURL}/proyecto`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.API_URL);
  }

  add(proyecto: Proyecto): Observable<String> {
    return this.http.post<String>(`${this.API_URL}/nuevo`, proyecto);
  }

  delete(proyecto: Proyecto): any {
    return this.http.delete(`${this.API_URL}/borrar/${proyecto.id}`);
  }

  update(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.API_URL}/editar/${proyecto.id}`, proyecto);
  }
}