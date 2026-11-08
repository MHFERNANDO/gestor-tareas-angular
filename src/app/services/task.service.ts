import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  tasks = signal<Task[]>([]);
  
  // Nuevos estados
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  loadTasks() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Task[]>(`${this.apiUrl}?_limit=10`).subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las tareas. Intente más tarde.');
        this.loading.set(false);
      }
    });
  }

  addTask(title: string) {
    const newTask = { title, completed: false };
    this.http.post<Task>(this.apiUrl, newTask).subscribe({
      next: (createdTask) => {
        const taskWithId = { ...createdTask, id: Date.now() }; // ID simulado
        this.tasks.update(currentTasks => [taskWithId, ...currentTasks]);
      }
    });
  }

  editTask(id: number, newTitle: string) {
    const tarea = this.tasks().find(t => t.id === id);
    if (!tarea) return;

    // Actualizamos localmente para fluidez
    this.tasks.update(currentTasks => 
      currentTasks.map(t => t.id === id ? { ...t, title: newTitle } : t)
    );

    // Y enviamos a la API simulada
    this.http.put(`${this.apiUrl}/${id}`, { ...tarea, title: newTitle }).subscribe({
      error: () => console.warn(`Simulación: Falló PUT en API mock para ID ${id}`)
    });
  }

  toggleTask(id: number) {
    const tarea = this.tasks().find(t => t.id === id);
    if (!tarea) return;

    this.tasks.update(currentTasks =>
      currentTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );

    this.http.put(`${this.apiUrl}/${id}`, { ...tarea, completed: !tarea.completed }).subscribe({
      error: () => console.warn(`Simulación: Falló PUT en API mock para ID ${id}`)
    });
  }

  deleteTask(id: number) {
    this.tasks.update(currentTasks => currentTasks.filter(t => t.id !== id));
    
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      error: () => console.warn(`Simulación: Falló DELETE en API mock para ID ${id}`)
    });
  }
}