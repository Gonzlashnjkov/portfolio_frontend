import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];
  loading: boolean = false;
  error: boolean = false;
  showModal: boolean = false;
  proyecto: Proyecto = new Proyecto();
  constructor(
    private proyectoService: ProyectoService,
    private toastr: ToastrService,
    
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.error = false;
    this.proyectoService.getAll().subscribe({
      next: (data: Proyecto[]) => {
        this.proyectos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.toastr.error('Error al obtener los proyectos', 'Error');
      }
    });
  }

  delete(proyecto: Proyecto){
    this.proyectoService.delete(proyecto).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Proyecto eliminado', 'Éxito');
      },
      error: () => {
        this.toastr.error('Error al eliminar el proyecto', 'Error');
      }
    });
  }

  update(proyecto: Proyecto){
    this.proyectoService.update(proyecto).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Proyecto actualizado', 'Éxito');
      },
      error: () => {
        this.toastr.error('Error al actualizar el proyecto', 'Error');
      }
    });
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  add() {
    this.proyectoService.add(this.proyecto).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Proyecto agregado', 'Éxito');
        this.proyecto = new Proyecto();
        this.toggleModal();
      },
      error: () => {
        this.toastr.error('Error al agregar el proyecto', 'Error');
      }
    });
  }

}