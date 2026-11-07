import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {

  //guarda el texto del usuario
  title = '';

  //envia el titulo al componente padre
  taskCreated = output<string>();

  
  createTask() {
    const cleanTitle = this.title.trim();

    //no tareas vacia
    if (!cleanTitle) {
      return;
    }

    this.taskCreated.emit(cleanTitle);

    //limpia
    this.title = '';
  }
}
