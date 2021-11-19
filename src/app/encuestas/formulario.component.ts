import { Component, OnInit } from '@angular/core';
import { Encuesta } from './encuesta';
import { MarcaPC } from './marca-pc';
import { MarcaPCService } from './marca-pc.service';
import { EncuestaService } from './encuesta.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public encuesta: Encuesta = new Encuesta();
  public marcasPC: MarcaPC[];

  constructor(private marcasPCService: MarcaPCService,
  private encuestaService: EncuestaService,
  private router: Router) { }

  ngOnInit(): void {
    this.cargarMarcasPC();
  }

  cargarMarcasPC(): void {
    this.marcasPCService.getMarcasPC().subscribe(
      marcasPC => this.marcasPC = marcasPC);
  }

  enviar(): void {
    this.encuestaService.crearEncuesta(this.encuesta).subscribe(
      encuesta => {
        this.router.navigate(['/encuestas']);
        swal.fire('Encuesta enviada!', 'La encuesta ha sido respondida y enviada exitosamente', 'success')
      });
  }

}
