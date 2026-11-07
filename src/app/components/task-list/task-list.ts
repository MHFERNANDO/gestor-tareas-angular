
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, TaskForm],
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

      const cumpleBusqueda =
        tarea.title.toLowerCase().includes(busqueda);

      return cumpleEstado && cumpleBusqueda;

    });

  });

  // Cargar las tareas al abrir el componente
  ngOnInit() {
    this.taskService.loadTasks();
  }

  // Agregar una tarea desde el formulario
  crearTarea(titulo: string) {
    this.taskService.addTask(titulo);
  }

  // Cambiar el filtro de las tareas
  cambiarFiltro(estado: 'todas' | 'pendientes' | 'completadas') {
    this.filtro.set(estado);
  }

}
