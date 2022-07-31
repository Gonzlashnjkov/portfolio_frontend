import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  @Input() proyecto: Proyecto = new Proyecto();

  @Output() onDelete = new EventEmitter<Proyecto>();

  @Output() onUpdate = new EventEmitter<Proyecto>();

  loading: boolean = true;
  showModal: boolean = false;
  proyectoForm: FormGroup = this.formBuilder.group({
    
    titulo: [''],
    descripcion: ['']
  });
 
  constructor(
    private proyectoService:ProyectoService,
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.onDelete.emit(this.proyecto);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  update() {
    const formData = new FormData();
    const formulario = this.proyectoForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.proyectoService.update(this.proyecto).subscribe({
      next: (data: any) => {
        this.toastr.success('Proyecto editado', 'Éxito');
        this.showModal = false;
        this.proyectoForm = this.formBuilder.group({
          
        titulo: [''],
        descripcion: ['']
        });
        this.onUpdate.emit(this.proyecto);
      },
      error: (err: any) => {
        this.toastr.error('Error al editar el proyecto', 'Error');
      }
    });
  }

}