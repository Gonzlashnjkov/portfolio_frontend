import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidad } from '../models/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  private API_URL = `${environment.baseURL}/habilidad`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Habilidad[]> {
    return this.http.get<Habilidad[]>(this.API_URL);
  }

  add(habilidad: Habilidad): Observable<String> {
    return this.http.post<String>(`${this.API_URL}/nueva`, habilidad);
  }

  delete(habilidad: Habilidad): any {
    return this.http.delete(`${this.API_URL}/borrar/${habilidad.id}`);
  }

  update(habilidad: Habilidad): Observable<Habilidad> {
    return this.http.put<Habilidad>(`${this.API_URL}/editar/${habilidad.id}`, habilidad);
  }
}