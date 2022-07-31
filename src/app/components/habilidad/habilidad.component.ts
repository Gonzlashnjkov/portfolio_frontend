import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';


@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit {

  @Input() habilidad: Habilidad = new Habilidad();

  @Output() onDelete = new EventEmitter<Habilidad>();

  @Output() onUpdate = new EventEmitter<Habilidad>();

  loading: boolean = true;
  showModal: boolean = false;
  habilidadForm: FormGroup = this.formBuilder.group({
    
    titulo: [''],
    porcentaje: ['']
  });

  constructor(
    private habilidadService: HabilidadService,
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.onDelete.emit(this.habilidad);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  update() {
    const formData = new FormData();
    const formulario = this.habilidadForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.habilidadService.update(this.habilidad).subscribe({
      next: (data: any) => {
        this.toastr.success('Habilidad editada', 'Éxito');
        this.showModal = false;
        this.habilidadForm = this.formBuilder.group({
          
          titulo: [''],
          porcentaje: ['']
        });
        this.onUpdate.emit(this.habilidad);
      },
      error: (err: any) => {
        this.toastr.error('Error al editar la habilidad', 'Error');
      }
    });
  }

}