import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <li class="task-item" style="display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px; margin-bottom: 10px; border: 1px solid #e2e8f0; border-radius: 10px;">
      
      @if (enEdicion()) {
        <!-- Modo edición -->
        <div style="display: flex; gap: 8px; width: 100%;">
          <input
            type="text"
            style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;"
            [(ngModel)]="tituloEditado"
            (keyup.enter)="guardar()"
          />
          <button type="button" (click)="guardar()" style="background: #16a34a; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Guardar</button>
          <button type="button" (click)="cancelar()" style="background: #ef4444; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Cancelar</button>
        </div>
      } @else {
        <!-- Modo lectura -->
        <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; flex: 1;">
          <input type="checkbox" [checked]="tarea().completed" (change)="toggle.emit(tarea().id)"/>
          <span [style.textDecoration]="tarea().completed ? 'line-through' : 'none'" [style.color]="tarea().completed ? '#94a3b8' : 'inherit'">
            {{ tarea().title }}
          </span>
        </label>

        <!-- Botones de acción -->
        <div style="display: flex; gap: 10px; align-items: center;">
          <a [routerLink]="['/tarea', tarea().id]" style="font-size: 14px; text-decoration: none; color: #2e0d57; font-weight: bold;">Ver detalle</a>
          <button type="button" (click)="iniciarEdicion()" style="background: transparent; border: none; cursor: pointer; font-size: 18px;">✏️</button>
          <button type="button" (click)="borrar.emit(tarea().id)" style="color: #dc2626; background: transparent; border: none; cursor: pointer; font-size: 22px; font-weight: bold;">✕</button>
        </div>
      }
    </li>
  `
})
export class TaskItem {
  tarea = input.required<Task>();
  
  // Eventos para avisarle al componente padre (task-list)
  borrar = output<number>();
  toggle = output<number>();
  editar = output<{id: number, nuevoTitulo: string}>();

  // Estado interno del componente
  enEdicion = signal(false);
  tituloEditado = '';

  iniciarEdicion() {
    this.tituloEditado = this.tarea().title;
    this.enEdicion.set(true);
  }

  guardar() {
    if (this.tituloEditado.trim()) {
      this.editar.emit({ id: this.tarea().id, nuevoTitulo: this.tituloEditado.trim() });
    }
    this.enEdicion.set(false);
  }

  cancelar() {
    this.enEdicion.set(false);
  }
}