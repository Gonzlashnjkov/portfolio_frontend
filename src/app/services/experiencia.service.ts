import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private API_URL = `${environment.baseURL}/experiencia`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.API_URL);
  }

  add(experiencia: Experiencia): Observable<String> {
    return this.http.post<String>(`${this.API_URL}/nueva`, experiencia);
  }

  delete(experiencia: Experiencia): any {
    return this.http.delete(`${this.API_URL}/borrar/${experiencia.id}`);
  }

  update(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(`${this.API_URL}/editar/${experiencia.id}`, experiencia);
  }
}