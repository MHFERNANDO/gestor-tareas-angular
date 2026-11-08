
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetail } from './task-detail';
import { TaskService } from '../../services/task.service';
import { Task } from '../../task.model';

describe('TaskDetail', () => {

  let fixture: ComponentFixture<TaskDetail>;
  let tareasPrueba = signal<Task[]>([]);

  beforeEach(async () => {

    tareasPrueba = signal<Task[]>([]);

    await TestBed.configureTestingModule({
      imports: [TaskDetail],
      providers: [
        {
          provide: TaskService,
          useValue: { tasks: tareasPrueba }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetail);
    await fixture.whenStable();
  });

  it('debe crear el componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar una tarea recibida directamente', async () => {

    fixture.componentRef.setInput('tarea', {
      id: 1,
      title: 'Estudiar Angular',
      completed: false
    });

    await fixture.whenStable();

    const contenido = fixture.nativeElement.textContent;

    expect(contenido).toContain('Estudiar Angular');
    expect(contenido).toContain('Pendiente');
  });

  it('debe buscar una tarea del servicio por su ID', async () => {

    tareasPrueba.set([
      { id: 1, title: 'Estudiar Angular', completed: false },
      { id: 2, title: 'Preparar informe', completed: true }
    ]);

    fixture.componentRef.setInput('id', '2');

    await fixture.whenStable();

    const contenido = fixture.nativeElement.textContent;

    expect(contenido).toContain('Preparar informe');
    expect(contenido).toContain('Completada');
  });

  it('debe actualizar el estado mostrado cuando cambia el Signal', async () => {

    tareasPrueba.set([
      { id: 3, title: 'Realizar práctica', completed: false }
    ]);

    fixture.componentRef.setInput('id', '3');

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Pendiente');

    tareasPrueba.set([
      { id: 3, title: 'Realizar práctica', completed: true }
    ]);

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Completada');
  });

});
