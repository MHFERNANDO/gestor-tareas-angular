import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskForm } from '../task-form/task-form';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, TaskForm, TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  taskService = inject(TaskService);

  filtro = signal<'todas' | 'pendientes' | 'completadas'>('todas');
  textoBusqueda = signal('');

  tareasFiltradas = computed(() => {
    const tareas = this.taskService.tasks();
    const estado = this.filtro();
    const busqueda = this.textoBusqueda().toLowerCase().trim();

    return tareas.filter(tarea => {
      const cumpleEstado =
        estado === 'todas' ||
        (estado === 'pendientes' && !tarea.completed) ||
        (estado === 'completadas' && tarea.completed);
      const cumpleBusqueda = tarea.title.toLowerCase().includes(busqueda);
      return cumpleEstado && cumpleBusqueda;
    });
  });

  ngOnInit() {
    this.taskService.loadTasks();
  }

  crearTarea(titulo: string) {
    this.taskService.addTask(titulo);
  }

  cambiarFiltro(estado: 'todas' | 'pendientes' | 'completadas') {
    this.filtro.set(estado);
  }

  manejarEdicion(evento: {id: number, nuevoTitulo: string}) {
    this.taskService.editTask(evento.id, evento.nuevoTitulo);
  }
  
  manejarBorrado(id: number) {
    this.taskService.deleteTask(id);
  }

  manejarToggle(id: number) {
    this.taskService.toggleTask(id);
  }
}