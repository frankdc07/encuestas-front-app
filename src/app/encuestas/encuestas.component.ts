import { Component, OnInit } from '@angular/core';
import { Encuesta } from './encuesta';
import { EncuestaService } from './encuesta.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  encuestas: Encuesta[];

  constructor(private encService: EncuestaService) { }

  ngOnInit(): void {
    this.encService.getEncuestas().subscribe(
      encuestas => this.encuestas = encuestas);
  }

  descartar(encuesta: Encuesta): void {
    const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: 'Seguro que deseas descartar esta respuesta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, descartar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.encService.descartar(encuesta.id).subscribe(
            response => {
              this.encuestas = this.encuestas.filter(enc => enc != encuesta);
              swal.fire('Encuesta descartada', `Las respuestas han sido eliminadas con éxito!`, 'success')
            }
          );
        }
      })
  }

}
