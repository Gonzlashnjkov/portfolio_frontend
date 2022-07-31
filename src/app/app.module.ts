import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { EducacionesComponent } from './components/educaciones/educaciones.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { ExperienciasComponent } from './components/experiencias/experiencias.component';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { PersonaComponent } from './components/persona/persona.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { PersonaService } from './services/persona.service';
import { EducacionService } from './services/educacion.service';
import { HabilidadService } from './services/habilidad.service';
import { ExperienciaService } from './services/experiencia.service';
import { ProyectoService } from './services/proyecto.service';



@NgModule({
  declarations: [
    AppComponent,
    EducacionComponent,
    EducacionesComponent,
    ExperienciaComponent,
    ExperienciasComponent,
    HabilidadComponent,
    HabilidadesComponent,
    HeaderComponent,
    PersonaComponent,
    ProyectoComponent,
    ProyectosComponent
    
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'}),
    
      RouterModule.forRoot([
      { path: '', component: AppComponent}
    ])
  ],
  providers: [
    EducacionService,
    EducacionService,
    ExperienciaService,
    HabilidadService,
    PersonaService,
    ProyectoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

