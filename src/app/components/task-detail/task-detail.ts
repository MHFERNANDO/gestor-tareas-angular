import { Component, computed, inject, input } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.html',
  styleUrl:'./task-detail.css'
})


export class TaskDetail{

  private taskService = inject(TaskService);

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
}