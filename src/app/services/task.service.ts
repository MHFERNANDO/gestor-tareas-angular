
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private tareasCargadas = false;
  private idsLocales = new Set<number>();

  //titulos academicos en esp
  private titulosEnEspanol: Record<string, string> = {
    'delectus aut autem': 'Estudiar para el examen de Bases de Datos',
    'quis ut nam facilis et officia qui': 'Completar la práctica de Angular',
    'fugiat veniam minus': 'Preparar la exposición de Programación Web',
    'et porro tempora': 'Entregar el informe de Redes',
    'laboriosam mollitia et enim quasi adipisci quia provident illum': 'Realizar los ejercicios de PL/SQL',
    'qui ullam ratione quibusdam voluptatem quia omnis': 'Repasar los componentes de Angular',
    'illo expedita consequatur quia in': 'Revisar el repositorio de GitHub',
    'quo adipisci enim quam ut ab': 'Organizar las actividades de la semana',
    'molestiae perspiciatis ipsa': 'Estudiar para la evaluación de Sistemas Digitales',
    'illo est ratione doloremque quia maiores aut': 'Revisar las pruebas unitarias del proyecto'
  };

  //estado compartido de las tareas
  tasks = signal<Task[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  //carga tareas una vez o permite reestablecerlas
  loadTasks(forzarRecarga = false) {
    if (this.loading() || (this.tareasCargadas && !forzarRecarga)) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.http.get<Task[]>(`${this.apiUrl}?_limit=10`).subscribe({
      next: (data) => {
        const tareasEspanol = data.map(tarea => ({
          ...tarea,
          title: this.titulosEnEspanol[tarea.title] ?? tarea.title
        }));

        this.tasks.set(tareasEspanol);
        this.idsLocales.clear();
        this.tareasCargadas = true;
        this.loading.set(false);
      },
      error: () => {
        this.error.set(
          'No se pudieron cargar las tareas. Comprueba tu conexión e inténtalo de nuevo.'
        );
        this.loading.set(false);
      }
    });
  }

  //crear una tarea POST
  addTask(title: string) {
    const titulo = title.trim();
    if (!titulo) return;

    this.error.set(null);

    this.http.post<Task>(this.apiUrl, {
      title: titulo,
      completed: false
    }).subscribe({
      next: () => {
        let id = Date.now();

        while (this.tasks().some(tarea => tarea.id === id)) {
          id++;
        }

        const nuevaTarea: Task = {
          id,
          title: titulo,
          completed: false
        };

        this.idsLocales.add(id);
        this.tasks.update(actuales => [nuevaTarea, ...actuales]);
      },
      error: () => {
        this.error.set(
          'No se pudo crear la tarea. Inténtalo de nuevo.'
        );
      }
    });
  }

  //editar el titulo con PUT
  editTask(id: number, newTitle: string) {
    const tarea = this.tasks().find(t => t.id === id);
    const titulo = newTitle.trim();

    if (!tarea || !titulo || tarea.title === titulo) return;

    this.error.set(null);

    this.tasks.update(actuales =>
      actuales.map(t =>
        t.id === id ? { ...t, title: titulo } : t
      )
    );

    //tareas nuevas no existen en la api simulada
    if (this.idsLocales.has(id)) return;

    this.http.put(`${this.apiUrl}/${id}`, {
      ...tarea,
      title: titulo
    }).subscribe({
      error: () => {
        this.tasks.update(actuales =>
          actuales.map(t =>
            t.id === id && t.title === titulo
              ? { ...t, title: tarea.title }
              : t
          )
        );

        this.error.set(
          'No se pudo editar la tarea. Se restauró su título anterior.'
        );
      }
    });
  }

  //marcar una tarea como completada o pendiente
  toggleTask(id: number) {
    const tarea = this.tasks().find(t => t.id === id);
    if (!tarea) return;

    this.error.set(null);

    const nuevoEstado = !tarea.completed;

    this.tasks.update(actuales =>
      actuales.map(t =>
        t.id === id ? { ...t, completed: nuevoEstado } : t
      )
    );

    if (this.idsLocales.has(id)) return;

    this.http.put(`${this.apiUrl}/${id}`, {
      ...tarea,
      completed: nuevoEstado
    }).subscribe({
      error: () => {
        this.tasks.update(actuales =>
          actuales.map(t =>
            t.id === id && t.completed === nuevoEstado
              ? { ...t, completed: tarea.completed }
              : t
          )
        );

        this.error.set(
          'No se pudo cambiar el estado de la tarea. Se restauró el estado anterior.'
        );
      }
    });
  }

  //eliminar una tarea mediante DELETE
  deleteTask(id: number) {
    const indice = this.tasks().findIndex(t => t.id === id);
    if (indice === -1) return;

    const tarea = this.tasks()[indice];

    this.error.set(null);

    this.tasks.update(actuales =>
      actuales.filter(t => t.id !== id)
    );

    if (this.idsLocales.has(id)) {
      this.idsLocales.delete(id);
      return;
    }

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      error: () => {
        this.tasks.update(actuales => {
          if (actuales.some(t => t.id === id)) return actuales;

          const restauradas = [...actuales];
          restauradas.splice(
            Math.min(indice, restauradas.length),
            0,
            tarea
          );

          return restauradas;
        });

        this.error.set(
          'No se pudo eliminar la tarea. Se restauró en el listado.'
        );
      }
    });
  }
}
