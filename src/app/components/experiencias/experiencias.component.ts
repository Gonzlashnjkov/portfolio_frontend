import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';


@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {

  experiencias: Experiencia[] = [];
  loading: boolean = false;
  error: boolean = false;
  showModal: boolean = false;
  experiencia: Experiencia = new Experiencia();
  constructor(
    private experienciaService: ExperienciaService,
    private toastr: ToastrService,
    
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.error = false;
    this.experienciaService.getAll().subscribe({
      next: (data: Experiencia[]) => {
        this.experiencias = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.toastr.error('Error al obtener las experiencias', 'Error');
      }
    });
  }

  delete(experiencia: Experiencia){
    this.experienciaService.delete(experiencia).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Experiencia eliminada', 'Éxito');
      },
      error: () => {
        this.toastr.error('Error al eliminar la experiencia', 'Error');
      }
    });
  }

  update(experiencia: Experiencia){
    this.experienciaService.update(experiencia).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Experiencia actualizada', 'Éxito');
      },
      error: () => {
        this.toastr.error('Error al actualizar la experiencia', 'Error');
      }
    });
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  add() {
    this.experienciaService.add(this.experiencia).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Experiencia agregada', 'Éxito');
        this.experiencia = new Experiencia();
        this.toggleModal();
      },
      error: () => {
        this.toastr.error('Error al agregar la experiencia', 'Error');
      }
    });
  }

}