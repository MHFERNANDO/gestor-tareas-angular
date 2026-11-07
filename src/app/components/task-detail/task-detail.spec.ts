import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetail } from './task-detail';

describe('TaskDetail', () => {
  let component: TaskDetail;
  let fixture: ComponentFixture<TaskDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar datos de una tarea', async () => {
    fixture.componentRef.setInput('tarea', {
      id:1,
      title:'Estudiar Angular',
      completed:false

    });

    await fixture.whenStable();
    const contenido = fixture.nativeElement.textContent;
    expect(contenido).toContain('Estudiar Angular');
    expect(contenido).toContain('Pendiente');

  });
});
