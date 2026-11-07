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

  filter = signal<'all' | 'pending' | 'completed'>('all');

  searchTerm = signal('');

  //lista calculada según búsqueda y filtro
  filteredTasks = computed(() => {
    const tasks = this.taskService.tasks();
    const currentFilter = this.filter();
    const search = this.searchTerm().toLowerCase().trim();

    return tasks.filter(task => {

      //ver el estado de la tarea
      const matchesStatus =
        currentFilter === 'all' ||
        (currentFilter === 'pending' && !task.completed) ||
        (currentFilter === 'completed' && task.completed);

      const matchesSearch =
        task.title.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  });

  // Cargar tareas cuando inicia el componente
  ngOnInit() {
    this.taskService.loadTasks();
  }

  createTask(title: string) {
    this.taskService.addTask(title);
  }

  changeFilter(status: 'all' | 'pending' | 'completed') {
    this.filter.set(status);
  }
}
