import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent],
  template: `
    <main>
      <app-task-list></app-task-list>
    </main>
  `
})
export class App {
  title = 'gestor-tareas-angular';
}
