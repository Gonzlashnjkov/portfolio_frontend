import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private API_URL = `${environment.baseURL}/persona`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.API_URL);
  }

  fetchImage(imageCode: string): Observable<Blob> {
    let url = `${environment.baseURL}/image/` + imageCode;
    return this.http.get(url, { responseType: 'blob' });
  }

  updateNombre(id: number, nombre: string): Observable<Persona> {
    const params = new HttpParams().set('nombre', nombre)
    return this.http.put<Persona>(`${environment.baseURL}/nombre/editar/${id}`, params);
  }

  updateTitulo(id: number, titulo: string): Observable<Persona> {
    const params = new HttpParams().set('titulo', titulo)
    return this.http.put<Persona>(`${environment.baseURL}/titulo/editar/${id}`, params);
  }

  updateResumen(id: number, resumen: string): Observable<Persona> {
    const params = new HttpParams().set('resumen', resumen)
    return this.http.put<Persona>(`${environment.baseURL}/resumen/editar/${id}`, params);
  }

  updateFoto(id: number, formData: FormData): Observable<Persona> {
    return this.http.put<Persona>(`${environment.baseURL}/foto/editar/${id}`, formData);
  }

  updateBanner(id: number, formData: FormData): Observable<Persona> {
    return this.http.put<Persona>(`${environment.baseURL}/banner/editar/${id}`, formData);
  }

}