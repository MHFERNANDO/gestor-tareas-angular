import { Component, input } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.html',
  styleUrl:'./task-detail.css'
})


export class TaskDetail{
  tarea= input<Task | null>(null);
}