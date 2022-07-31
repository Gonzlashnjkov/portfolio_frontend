import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas: Persona[] = [new Persona()];
  loading: boolean = false;
  loadingFoto: boolean = true;
  loadingBanner: boolean = true;
  error: boolean = false;
  fotoForm: FormGroup = this.formBuilder.group({
    foto: [''],
  });
  bannerForm: FormGroup = this.formBuilder.group({
    banner: [''],
  });

  editResumen: boolean = false;
  editTitulo: boolean = false;
  editNombre: boolean = false;
  editFoto: boolean = false;
  editBanner: boolean = false;
  fotoPath: SafeResourceUrl = "";
  bannerPath: SafeResourceUrl = "";
  persona: any = [];
  constructor(
    private personaService: PersonaService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  createFoto(image: Blob): any {
    if (image && image.size > 0) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.fotoPath = this._sanitizer.bypassSecurityTrustResourceUrl(String(reader.result));
        this.loadingFoto = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      this.loadingFoto = false;
    }
  }

  createBanner(image: Blob): any {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.bannerPath = this._sanitizer.bypassSecurityTrustResourceUrl(String(reader.result));
        this.loadingBanner = false;
      }, false);
      reader.readAsDataURL(image);
    } else {
      this.loadingBanner = false;
    }
  }

  getAll(): any {
    this.loading = true;
    this.error = false;
    this.personaService.getAll().subscribe({
      next: (data: any[]) => {
        this.personas = data;
        this.loading = false;
        
        this.getBanner();
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.toastr.error('Error al obtener los proyectos', 'Error');
        this.loadingFoto = false;
        this.loadingBanner = false;
      }
    });
  }

  getFoto(){
    this.personaService.fetchImage(this.personas[0].foto).subscribe({
      next: (image) => {
        this.createFoto(image);
        this.loadingFoto = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingFoto = false;
      }
    });
  }

  getBanner(){
    this.personaService.fetchImage(this.personas[0].banner).subscribe({
      next: (image) => {
        this.createBanner(image);
        this.loadingBanner = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingBanner = false;
      }
    });
  }

  onFileSelectFoto(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fotoForm.get('foto')!.setValue(file);
    }
  }

  onFileSelectBanner(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bannerForm.get('banner')!.setValue(file);
    }
  }

  toggleEditResumen(){
    this.editResumen = !this.editResumen;
  }

  toggleEditTitulo(){
    this.editTitulo = !this.editTitulo;
  }

  toggleEditNombre(){
    this.editNombre = !this.editNombre;
  }

  toggleEditFoto(){
    this.editFoto = !this.editFoto;
  }

  toggleEditBanner(){
    this.editBanner = !this.editBanner;
  }


  updateResumen(){
    this.personaService.updateResumen(this.personas[0].id, this.personas[0].resumen).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Resumen actualizado', 'Éxito');
        this.toggleEditResumen();
      },
      error: () => {
        this.toastr.error('Error al actualizar el resumen', 'Error');
      }
    });
  }

  updateTitulo(){
    this.personaService.updateTitulo(this.personas[0].id, this.personas[0].titulo).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Titulo actualizado', 'Éxito');
        this.toggleEditTitulo();
      },
      error: () => {
        this.toastr.error('Error al actualizar el titulo', 'Error');
      }
    });
  }

  updateNombre(){
    this.personaService.updateNombre(this.personas[0].id, this.personas[0].nombre).subscribe({
      next: (data: any) => {
        this.getAll();
        this.toastr.success('Nombre actualizado', 'Éxito');
        this.toggleEditNombre();
      },
      error: () => {
        this.toastr.error('Error al actualizar el nombre', 'Error');
      }
    });
  }

  updateFoto() {
    const formData = new FormData();
    const formulario = this.fotoForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.personaService.updateFoto(this.personas[0].id, formData).subscribe({
      next: (data: any) => {
        this.toastr.success('Foto actualizada', 'Éxito');
        this.toggleEditFoto()
        this.fotoForm = this.formBuilder.group({
          foto: [''],
        });
        this.getAll();
      },
      error: (err: any) => {
        this.toastr.error('Error al actualizar la foto', 'Error');
      }
    });
  }

  updateBanner() {
    const formData = new FormData();
    const formulario = this.bannerForm.value;
    Object.keys(formulario).forEach(key => {
      formData.append(key, formulario[key]);
    });

    this.personaService.updateBanner(this.personas[0].id, formData).subscribe({
      next: (data: any) => {
        this.toastr.success('Banner actualizado', 'Éxito');
        this.toggleEditBanner()
        this.bannerForm = this.formBuilder.group({
          banner: [''],
        });
        this.getAll();
      },
      error: (err: any) => {
        this.toastr.error('Error al actualizar el banner', 'Error');
      }
    });
  }

}