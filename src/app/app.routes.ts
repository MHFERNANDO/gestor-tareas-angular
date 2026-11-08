import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskDetail } from './components/task-detail/task-detail';

export const routes: Routes = [
  // Ruta por defecto: muestra la lista de tareas
  { 
    path: '', 
    component: TaskListComponent, 
    title: 'Lista de Tareas' 
  },
  
  // Ruta dinámica: muestra el detalle según el ID de la tarea
  { 
    path: 'tarea/:id', 
    component: TaskDetail, 
    title: 'Detalle de Tarea' 
  },
  
  // Ruta comodín: redirige al inicio si el usuario escribe una URL que no existe
  { 
    path: '**', 
    redirectTo: '' 
  }
];