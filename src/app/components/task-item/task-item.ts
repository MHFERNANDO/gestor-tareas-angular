import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule, RouterLink],

  template: `
    <div class="task-item" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; padding: 14px; margin-bottom: 10px; border: 1px solid #e2e8f0; border-radius: 10px;">

      @if (enEdicion()) {
        <!-- Modo edición -->
        <div style="display: flex; flex-wrap: wrap; gap: 8px; width: 100%;">

          <input
            type="text"
            style="flex: 1 1 180px; min-width: 0; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;"
            [(ngModel)]="tituloEditado"
            [attr.aria-label]="'Editar título de la tarea: ' + tarea().title"
            (keyup.enter)="guardar()"
          />

          <button type="button" (click)="guardar()" [disabled]="!tituloEditado.trim()" style="background: #16a34a; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">
            Guardar
          </button>

          <button type="button" (click)="cancelar()" style="background: #ef4444; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">
            Cancelar
          </button>

        </div>
      } @else {
        <!-- Modo lectura -->
        <label class="task-content" style="display: flex; align-items: center; gap: 12px; cursor: pointer;">

          <input
            type="checkbox"
            [checked]="tarea().completed"
            (change)="toggle.emit(tarea().id)"
          />

          <span
            style="overflow-wrap: anywhere;"
            [style.textDecoration]="tarea().completed ? 'line-through' : 'none'"
            [style.color]="tarea().completed ? '#94a3b8' : 'inherit'">
            {{ tarea().title }}
          </span>

        </label>

        <!-- Botones de acción -->
        <div class="task-actions" style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">

          <a [routerLink]="['/tarea', tarea().id]" style="font-size: 14px; text-decoration: none; color: #2e0d57; font-weight: bold;">
            Ver detalle
          </a>

          <button
            type="button"
            [attr.aria-label]="'Editar tarea: ' + tarea().title"
            (click)="iniciarEdicion()"
            style="background: transparent; border: none; cursor: pointer; font-size: 18px; min-width: 40px; min-height: 40px;">
            <span aria-hidden="true">✏️</span>
          </button>

          <button
            type="button"
            [attr.aria-label]="'Eliminar tarea: ' + tarea().title"
            (click)="borrar.emit(tarea().id)"
            style="color: #dc2626; background: transparent; border: none; cursor: pointer; font-size: 22px; font-weight: bold; min-width: 40px; min-height: 40px;">
            <span aria-hidden="true">✕</span>
          </button>

        </div>
      }
    </div>
  `,

  styles: [`
    :host {
      display: block;
    }

    .task-content {
      flex: 1;
      min-width: 0;
    }

    @media (max-width: 600px) {
      .task-content {
        flex-basis: 100%;
      }

      .task-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `]
})
export class TaskItem {
  tarea = input.required<Task>();

  // Eventos para comunicar las acciones al componente padre
  borrar = output<number>();
  toggle = output<number>();
  editar = output<{id: number, nuevoTitulo: string}>();

  // Estado interno de la edición
  enEdicion = signal(false);
  tituloEditado = '';

  iniciarEdicion() {
    this.tituloEditado = this.tarea().title;
    this.enEdicion.set(true);
  }

  guardar() {
    if (this.tituloEditado.trim()) {
      this.editar.emit({
        id: this.tarea().id,
        nuevoTitulo: this.tituloEditado.trim()
      });
    }
    this.enEdicion.set(false);
  }

  cancelar() {
    this.enEdicion.set(false);
  }
}
