import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  @Input() experiencia: Experiencia = new Experiencia();

  @Output() onDelete = new EventEmitter<Experiencia>();

  @Output() onUpdate = new EventEmitter<Experiencia>();

  loading: boolean = true;
  showModal: boolean = false;
  experienciaForm: FormGroup = this.formBuilder.group({
    
    titulo: [''],
    descripcion: [''],
    fecha: ['']
  });

  constructor(
    private experienciaService: ExperienciaService,
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.onDelete.emit(this.experiencia);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  update() {
    const formData = new FormData();
    const formulario = this.experienciaForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.experienciaService.update(this.experiencia).subscribe({
      next: (data: any) => {
        this.toastr.success('Experiencia editada', 'Éxito');
        this.showModal = false;
        this.experienciaForm = this.formBuilder.group({
          
        titulo: [''],
        descripcion: [''],
        fecha: ['']
        });
        this.onUpdate.emit(this.experiencia);
      },
      error: (err: any) => {
        this.toastr.error('Error al editar la experiencia', 'Error');
      }
    });
  }

}
