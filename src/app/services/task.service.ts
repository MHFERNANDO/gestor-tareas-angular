import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../task.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

  tasks = signal<Task[]>([]);

  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => this.tasks.set(data),
      error: (err) => console.error('Error al cargar tareas:', err)
    });
  }

  addTask(title: string) {
    const newTask = { title, completed: false };
    this.http.post<Task>('https://jsonplaceholder.typicode.com/todos', newTask).subscribe({
      next: (createdTask) => {
        const taskWithId = { ...createdTask, id: Date.now() };
        this.tasks.update(currentTasks => [taskWithId, ...currentTasks]);
      }
    });
  }

  editTask(id: number, newTitle: string) {
    this.tasks.update(currentTasks => 
      currentTasks.map(t => t.id === id ? { ...t, title: newTitle } : t)
    );
  }

  toggleTask(id: number) {
    this.tasks.update(currentTasks =>
      currentTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  deleteTask(id: number) {
    this.tasks.update(currentTasks => currentTasks.filter(t => t.id !== id));
  }
}
