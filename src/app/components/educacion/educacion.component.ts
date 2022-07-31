import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  @Input() educacion: Educacion = new Educacion()

  @Output() onDelete = new EventEmitter<Educacion>();

  @Output() onUpdate = new EventEmitter<Educacion>();

  loading: boolean = true;
  showModal: boolean = false;
  educacionForm: FormGroup = this.formBuilder.group({
    
    titulo: [''],
    descripcion: [''],
    fecha: ['']
  });

  constructor(
    private educacionService: EducacionService,
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.onDelete.emit(this.educacion);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  update() {
    const formData = new FormData();
    const formulario = this.educacionForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.educacionService.update(this.educacion).subscribe({
      next: (data: any) => {
        this.toastr.success('Educación editada', 'Éxito');
        this.showModal = false;
        this.educacionForm = this.formBuilder.group({
          
        titulo: [''],
        descripcion: [''],
        fecha: ['']
        });
        this.onUpdate.emit(this.educacion);
      },
      error: (err: any) => {
        this.toastr.error('Error al editar la educación', 'Error');
      }
    });
  }

}
