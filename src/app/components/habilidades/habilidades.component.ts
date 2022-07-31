import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  habilidades: Habilidad[] = [];
  loading: boolean = false;
  error: boolean = false;
  showModal: boolean = false;
  habilidad: Habilidad = new Habilidad();
  constructor(
    private habilidadService: HabilidadService,
    private toastr: ToastrService,
    
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.loading = true;
    this.error = false;
    this.habilidadService.getAll().subscribe({
      next: (data: Habilidad[]) => {
        this.habilidades = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.toastr.error('Error al obtener las habilidades', 'Error');
      }
    });
  }

  delete(habilidad: Habilidad){
    this.habilidadService.delete(habilidad).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Habilidad eliminada', 'Éxito');
      },
      error: () => {
        this.toastr.error('Error al eliminar la habilidad', 'Error');
      }
    });
  }

  update(habilidad: Habilidad){
    this.habilidadService.update(habilidad).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Habilidad actualizada', 'Éxito');
      },
      error: () => {
        this.toastr.error('Error al actualizar la habilidad', 'Error');
      }
    });
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  add() {
    this.habilidadService.add(this.habilidad).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Habilidad agregada', 'Éxito');
        this.habilidad = new Habilidad();
        this.toggleModal();
      },
      error: () => {
        this.toastr.error('Error al agregar la habilidad', 'Error');
      }
    });
  }

}