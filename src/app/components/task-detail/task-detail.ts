import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  imports: [RouterLink],
  templateUrl: './task-detail.html',
  styleUrl:'./task-detail.css'
})

export class TaskDetail{

  readonly taskService = inject(TaskService);

  tarea= input<Task | null>(null);

  id = input<string | number | null | undefined>(undefined);

  //obtenemos tarea seleccionada desde el servicio
  tareaMostrada= computed(() => {
    const tareaRecibida = this.tarea();

    if(tareaRecibida){
      return tareaRecibida;
    }

    const idRecibido = this.id();

    if(idRecibido == null || idRecibido === ''){
      return null;
    }

    const idBuscado = Number(idRecibido);

    if(!Number.isSafeInteger(idBuscado) || idBuscado <= 0){
      return null;
    }

    return this.taskService.tasks().find(
      t => t.id === idBuscado
    ) ?? null;

  });

  //carga tareas si el servicio aun está vacio
  ngOnInit(): void {
    if (this.taskService.tasks().length === 0) {
      this.taskService.loadTasks();
    }
  }
}