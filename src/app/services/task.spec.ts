import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe cargar las tareas mediante una petición GET', () => {
    const dummyTasks = [
      { id: 1, title: 'Tarea 1 de prueba', completed: false },
      { id: 2, title: 'Tarea 2 de prueba', completed: true }
    ];

    service.loadTasks();

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos?_limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);

    expect(service.tasks().length).toBe(2);
    expect(service.tasks()[0].title).toBe('Tarea 1 de prueba');
  });

  it('debe cambiar el estado completado de una tarea (toggle)', () => {
    service.tasks.set([
      { id: 1, title: 'Prueba Toggle', completed: false }
    ]);

    service.toggleTask(1);

    // Verificar y responder a la petición PUT
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.completed).toBe(true);
    req.flush({ id: 1, title: 'Prueba Toggle', completed: true });

    expect(service.tasks()[0].completed).toBe(true);
  });

  it('debe eliminar una tarea del listado local', () => {
    service.tasks.set([
      { id: 1, title: 'Mantener', completed: false },
      { id: 2, title: 'Eliminar', completed: false }
    ]);

    service.deleteTask(2);

    // Verificar y responder a la petición DELETE
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/2');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    expect(service.tasks().length).toBe(1);
    expect(service.tasks()[0].id).toBe(1);
  });
});
