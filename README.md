# Gestor de Tareas del Curso — Angular

**Práctica:** Desarrollo interactivo de aplicaciones web (Parte 1)  
**Asignatura:** Programación y Plataformas Web  
**Universidad:** Universidad Politécnica Salesiana  
**Framework seleccionado:** Angular  
**Integrantes:** Victoria Andrade, Isabel Ullauri, Mateo Molina, Fernando Martinez 
**Repositorio GitHub:** https://github.com/Fernando/gestor-tareas-angular  
**Aplicación desplegada:** https://gestor-tareas-ups.netlify.app  

---

## Introducción

El presente proyecto tiene como finalidad investigar y aplicar los fundamentos del framework Angular mediante el desarrollo de una aplicación web para la gestión de tareas académicas. La práctica comprende el estudio de su arquitectura, instalación, componentes, reactividad, enrutamiento, consumo de servicios REST, pruebas y despliegue.

Como resultado, se desarrolla un gestor que permite consultar, crear, editar, completar y eliminar tareas. Asimismo, se incorporan herramientas de búsqueda y filtrado para facilitar la organización de las actividades.

El desarrollo se complementa con una investigación basada en documentación oficial, pruebas funcionales y mediciones técnicas que permiten evaluar las características del framework.

---

# Bloque 1. Panorama del framework Angular

## 1.1. Definición y propósito

Angular es un framework de código abierto para el desarrollo de aplicaciones web interactivas, mantenido por Google y una comunidad de desarrolladores. Proporciona una estructura organizada y herramientas integradas para gestionar componentes, formularios, navegación y comunicación con servicios externos.

Su principal propósito es facilitar la construcción de aplicaciones escalables y mantenibles, promoviendo la reutilización del código y la separación de responsabilidades.

**Fuente:** [Angular — Overview](https://angular.dev/overview).

## 1.2. Origen y evolución

Angular tiene sus antecedentes en AngularJS, cuya versión 1.0 fue presentada por Google el 14 de junio de 2012. Este proyecto, en el que participó Miško Hevery, buscaba simplificar el desarrollo web mediante la extensión de HTML y la sincronización automática entre los datos y la interfaz.

El 22 de septiembre de 2016 se lanzó Angular 2, una renovación de la plataforma que introdujo una arquitectura moderna basada en componentes y mejoras de rendimiento.

Desde entonces, el framework ha evolucionado mediante actualizaciones periódicas. En noviembre de 2026, **Angular 18.2** (versión utilizada en este proyecto) es una de las versiones activas más modernas, integrando control de flujo nativo y Signals.

**Fuentes:**
- [Google Developers Blog — AngularJS 1.0](https://developers.googleblog.com/en/better-web-templating-with-angularjs-10/)
- [Google Open Source Blog — Angular 2](https://opensource.googleblog.com/2016/09/)
- [Angular — Versioning and releases](https://angular.dev/reference/releases)

## 1.3. Filosofía y principios

Angular adopta la filosofía de un *framework completo*, puesto que integra herramientas oficiales para resolver las principales necesidades del desarrollo web.

Su arquitectura se fundamenta en componentes reutilizables, mecanismos de reactividad y servicios que permiten compartir funcionalidades entre distintas partes de la aplicación.

Asimismo, promueve la estabilidad y el mantenimiento del software mediante versionado semántico y políticas de compatibilidad.

**Fuente:** [Angular — Overview](https://angular.dev/overview) y [Versioning and releases](https://angular.dev/reference/releases).

## 1.4. Licencia

Angular utiliza la **licencia MIT**, una licencia de software libre permisiva que permite utilizar, modificar y distribuir el código, incluso con fines comerciales.

Su condición principal es conservar los avisos de derechos de autor y de licencia en las copias o partes sustanciales del software. El programa se proporciona sin garantías.

**Fuente:** [Angular — MIT License](https://angular.dev/license).

## 1.5. Aplicación práctica

Los principios de Angular se aplican en el desarrollo del Gestor de Tareas del Curso, cuya estructura utiliza componentes independientes y un servicio compartido.

Por ejemplo, `TaskListComponent` administra la visualización de tareas, `TaskForm` permite registrar actividades y `TaskService` centraliza las operaciones relacionadas con los datos.

Esta organización demuestra cómo Angular facilita la separación entre la interfaz y la lógica de la aplicación.

**Evidencia:** Revisión de la arquitectura en los archivos `task-list.ts`, `task-form.ts` y `task.service.ts`.

## 1.6. Error y solución

**Error documentado (fundamentos):** Inflación de líneas de código y duplicación de plantillas.

- **Causa:** Angular CLI genera por defecto un archivo `app.html` con código de bienvenida (logos, CSS y enlaces). Al configurar `app.ts` con una plantilla en línea (`template: '<main><router-outlet></router-outlet></main>'`), el archivo HTML original quedó huérfano, aumentando inútilmente las líneas de código (LOC).
- **Solución:** Se eliminó el archivo físico `app.html` y se conservó únicamente el componente raíz estructurado con el enrutador en `app.ts`.

![Texto alternativo](images/image.png)
---

# Bloque 2. Instalación y configuración

## 2.1. Herramientas utilizadas

- **Node.js:** Entorno de ejecución para JavaScript en el servidor, necesario para compilar el framework.
- **npm:** Gestor de paquetes de Node.js, utilizado para descargar las librerías de Angular.
- **Angular CLI:** Interfaz de línea de comandos oficial para crear proyectos y generar componentes.
- **Visual Studio Code:** Editor de código fuente.
- **Git:** Sistema de control de versiones para el trabajo colaborativo.

## 2.2. Creación y ejecución del proyecto

El proyecto se creó ejecutando los comandos de Angular CLI en la terminal.

**Comandos principales:**

```bash
ng new gestor-tareas-angular
npm install
ng serve
```

- `ng new gestor-tareas-angular`: crea el proyecto base.
- `npm install`: instala las dependencias declaradas en `package.json`.
- `ng serve` (o `npm start`): inicia el servidor de desarrollo local en `http://localhost:4200/`.

**Tiempo de instalación medido:** 2 minutos.

**Evidencia:**

![Captura del proceso de instalación en terminal](./images/Captura%20de%20pantalla%202026-11-08%20164529.png)

## 2.3. Estructura del proyecto

- `src/app/components/`: contiene la lógica y las vistas de los componentes individuales (`task-list`, `task-form`, `task-item`).
- `src/app/services/`: alberga el servicio central (`task.service.ts`) para el manejo del estado y la API.
- `src/app/app.routes.ts`: define las rutas de navegación de la SPA.
- `src/main.ts`: archivo de arranque principal de la aplicación.
- `package.json`: manifiesto del proyecto con metadatos y dependencias.

## 2.4. Ejemplo práctico y dificultades

### Hola Mundo explicado

En Angular, el punto de entrada es el componente raíz:

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<main><router-outlet></router-outlet></main>`
})
export class App { }
```

- `@Component`: decorador que le indica a Angular que la clase es un componente.
- `selector`: etiqueta HTML (`<app-root>`) donde se inyectará la aplicación.
- `RouterOutlet`: directiva que renderiza los componentes según la URL activa.

**Fuente:** [Angular CLI](https://angular.dev/tools/cli).

---

# Bloque 3. Componentes y plantillas

## 3.1. Fundamentos

- **Componentes:** clases de TypeScript decoradas con `@Component` que controlan una porción de la pantalla.
- **Plantillas HTML:** definen la estructura visual utilizando la sintaxis propia de Angular.
- **Inputs/Outputs:** mecanismos para pasar datos de un componente padre a un hijo (`input()`) y emitir eventos del hijo al padre (`output()`).
- **Renderizado condicional y listas:** directivas modernas de control de flujo como `@if` para mostrar u ocultar elementos y `@for` para iterar colecciones.
- **Ciclo de vida:** eventos como `ngOnInit()` que se disparan en momentos clave, por ejemplo, al inicializar el componente.

## 3.2. Implementación en el proyecto

La aplicación utiliza componentes para separar las funcionalidades del gestor:

- **TaskListComponent:** listado, búsqueda y filtros.
- **TaskForm:** formulario para registrar tareas.
- **TaskItem:** componente reutilizable para representar tareas y sus acciones.
- **TaskDetail:** consulta de información individual de una tarea.

## 3.3. Ejemplo práctico

El componente `TaskItem` se reutiliza mediante la estructura `@for`, recibiendo diferentes tareas a través de `[tarea]="tarea"`.

```html
@for (tarea of tareasFiltradas(); track tarea.id) {
  <app-task-item
    [tarea]="tarea"
    (borrar)="manejarBorrado($event)"
    (toggle)="manejarToggle($event)"
    (editar)="manejarEdicion($event)">
  </app-task-item>
}
```

**Evidencia:** Captura o revisión del componente `TaskItem` en el proyecto.

## 3.4. Error y solución

**Error:** `Cannot find name 'signal'. ts(2304)` en el archivo `task-item.ts`.

- **Causa:** Se intentó utilizar la API de Signals para manejar el estado de edición local (`enEdicion = signal(false)`), pero no se había importado la función desde la librería principal.
- **Solución:** Se corrigió la importación en la cabecera del archivo:

```typescript
import { Component, input, output, signal } from '@angular/core';
```

**Fuente:** [Angular — Components](https://angular.dev/guide/components).

---

# Bloque 4. Estado y reactividad

## 4.1. Fundamentos

Angular maneja la reactividad moderna a través de **Signals**. Un signal es un envoltorio alrededor de un valor que notifica a la interfaz cuando este cambia, optimizando el rendimiento.

- `signal()`: crea un estado reactivo modificable.
- `computed()`: crea un estado derivado de solo lectura que se recalcula automáticamente cuando cambian sus dependencias.
- **Servicios (Services):** clases inyectables (`@Injectable`) que centralizan el estado para que múltiples componentes puedan acceder a los mismos datos.

## 4.2. Implementación en el proyecto

El proyecto utiliza `TaskService` para administrar las tareas mediante un estado compartido. Los componentes consultan ese estado para presentar información actualizada.

La búsqueda y los filtros utilizan valores reactivos, permitiendo actualizar el listado automáticamente.

## 4.3. Ejemplo práctico

### Uso de `signal` en el servicio (`task.service.ts`)

```typescript
tasks = signal<Task[]>([]);
loading = signal<boolean>(false);
```

### Consumo y uso de `computed` en el componente (`task-list.ts`)

```typescript
filtro = signal<'todas' | 'pendientes' | 'completadas'>('todas');

tareasFiltradas = computed(() => {
  const tareas = this.taskService.tasks();
  const estado = this.filtro();

  // Lógica de filtrado reactivo
});
```

## 4.4. Error y solución

**Error:** Desincronización entre la interfaz y la API en las operaciones CRUD (PUT/DELETE).

- **Causa:** Inicialmente, al editar o eliminar una tarea, el código solo modificaba el signal local para que se viera en pantalla, pero no realizaba la petición HTTP correspondiente a la API, incumpliendo el bloque de consumo de API.
- **Solución:** Se reestructuró el servicio para que, además de actualizar el signal mediante `.update()`, invocara los métodos `this.http.put()` y `this.http.delete()` hacia JSONPlaceholder.

**Fuente:** [Angular — Signals](https://angular.dev/guide/signals).

---

# Bloque 5. Enrutamiento y API REST

## 5.1. Enrutamiento

Angular Router permite crear **Single Page Applications (SPAs)**. La navegación ocurre del lado del cliente, destruyendo e instanciando componentes sin recargar la página completa.

El proyecto contempla dos rutas principales:

| Ruta | Funcionalidad |
|---|---|
| `/` | Listado de tareas (`TaskListComponent`). |
| `/tarea/:id` | Detalle de una tarea específica (`TaskDetailComponent`). |

## 5.2. Consumo de API REST

La aplicación utiliza `HttpClient` para comunicarse con JSONPlaceholder, una API pública de pruebas.

Se implementan operaciones HTTP para consultar, crear, actualizar y eliminar tareas mediante los métodos **GET, POST, PUT y DELETE**.

> **Limitación:** JSONPlaceholder es una API simulada (*mock API*). Simula las operaciones de escritura y devuelve una respuesta, pero no almacena permanentemente los cambios. Al recargar la aplicación, el estado vuelve a los 10 registros originales consultados mediante GET.

## 5.3. Manejo de errores y estados de carga

Se integraron dos Signals adicionales en el servicio (`loading` y `error`). Cuando se ejecuta `loadTasks()`, `loading` pasa a `true`, mostrando un texto de “Cargando tareas...”.

Si la suscripción de RxJS cae en el bloque `error`, se activa el signal de error y se renderiza una alerta roja en la interfaz.

## 5.4. Ejemplo práctico y dificultades

Configuración de rutas en `app.routes.ts`:

```typescript
export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'tarea/:id', component: TaskDetail }
];
```

**Evidencias:** Capturas de las rutas o navegación en la aplicación.

**Fuente:** [Angular — Routing](https://angular.dev/guide/routing) y [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

---

# Bloque 6. Pruebas unitarias

## 6.1. Herramientas de pruebas

Las pruebas unitarias aíslan una pieza de código para verificar su correcto funcionamiento. Angular integra Jasmine (framework de aserciones) y Karma (test runner) por defecto.

Además, utiliza la clase utilitaria `TestBed` para simular y configurar la inyección de dependencias de los módulos y componentes de Angular.

## 6.2. Pruebas implementadas

El repositorio contiene archivos `.spec.ts` destinados a verificar el funcionamiento de componentes y servicios.

Para ejecutar las pruebas se utilizó el comando:

```bash
npx ng test --watch=false
```

**Resultado:** 11 pruebas aprobadas, 0 fallidas.

## 6.3. Ejemplo práctico

Las siguientes pruebas en `task.spec.ts` verifican el comportamiento:

- `it('debe ser creado')`: verifica que la instancia del servicio se inyecte correctamente.
- `it('debe agregar una tarea')`: verifica que el método POST funcione y que el signal aumente su longitud.
- `it('debe eliminar una tarea')`: verifica que el método DELETE descuente un elemento del arreglo local.

**Evidencia:** Captura de la ejecución de las pruebas.

## 6.4. Error y solución

**Error:** `Cannot configure the test module when the test module has already been instantiated`.
x
- **Causa:** En el archivo `task.spec.ts`, se estaba utilizando la función `inject()` de forma global antes de haber configurado adecuadamente el módulo de pruebas en el bloque `TestBed.configureTestingModule()`.
- **Solución:** Se trasladó la inyección de dependencias (`TestBed.inject(TaskService)` y `HttpTestingController`) dentro del bloque `beforeEach`, ejecutándose después de configurar el módulo con `HttpClientTestingModule`.

**Fuente:** [Angular — Testing](https://angular.dev/guide/testing).

---

# Bloque 7. Ecosistema y despliegue

## 7.1. Herramientas del ecosistema

- **Angular CLI:** gestor principal de construcción.
- **CSS nativo:** la aplicación maneja el estilo a nivel de componente (`styleUrl`), aislando las clases.

## 7.2. Compilación de producción

El proyecto utiliza el comando `ng build` para compilar. Este proceso transpila TypeScript a JavaScript, aplica *Tree Shaking* (elimina código muerto) y minifica los recursos, depositándolos en la carpeta `dist/gestor-tareas-angular/browser`.

```bash
ng build
```

## 7.3. Despliegue

**Plataforma utilizada:** Netlify (vía Netlify Drop).

**URL pública:** https://gestor-tareas-ups.netlify.app

El despliegue consistió en arrastrar la carpeta estática `browser/` compilada directamente a Netlify, lo que la alojó automáticamente con un certificado SSL. Ambas rutas funcionan correctamente.

## 7.4. Error y solución

**Error:** Al desplegar en Netlify, si se recargaba manualmente la página en una ruta como `/tarea/2`, el servidor devolvía un error 404 “Page Not Found”.

- **Causa:** Al ser una Single Page Application (SPA), el servidor de Netlify busca una carpeta física llamada `tarea` que no existe, ignorando el enrutador virtual de Angular.
- **Solución:** Se creó un archivo llamado `_redirects` en la carpeta `public/` de Angular con la instrucción:

```text
/* /index.html 200
```

Esto fuerza al servidor a redirigir el tráfico al `index.html` para que el enrutador de Angular asuma el control.

![Imagen error de despliegue](images/Captura%20de%20pantalla%202026-11-08%20163936.png)

**Fuentes:** [Angular CLI](https://angular.dev/tools/cli) y documentación de despliegue.

---

# 8. Mediciones técnicas

Las siguientes mediciones permiten evaluar el proceso de desarrollo y el comportamiento de la aplicación utilizando criterios comunes.

| Métrica | Resultado | Método |
|---|---:|---|
| Configuración inicial | 2 min | Tiempo desde la instalación hasta la primera ejecución. |
| Líneas de código (LOC) | 742 | Comando `npx cloc src`. |
| Tamaño del build | 248 KB | Tamaño de `dist` después de compilar. |
| Rendimiento Lighthouse | 98 / 100 | Chrome DevTools, modo móvil. |
| Horas totales del grupo | ~12 h | Suma de horas de los integrantes. |
| Dificultad percibida | 3 / 5 | Promedio de los cuatro integrantes. |

---

# 9. Uso responsable de inteligencia artificial

Durante la investigación y el desarrollo se utilizaron herramientas de inteligencia artificial como apoyo para comprender conceptos, analizar errores y revisar implementaciones.

- **NotebookLM:** se utilizó para consultar documentación oficial de Angular, investigar su origen y evolución, y recuperar información relacionada con su arquitectura.
- **Gemini AI:** se utilizó como apoyo al líder técnico para revisión de código, refactorización de Signals y depuración de pruebas.

### Ejemplos de consultas utilizadas (prompts reales)

> “Necesito crear la función editar, ayúdame a modificar el servicio task.service.ts y el componente usando Signals”.

> “En Netlify a mis compañeros no les abre (da error 404), ¿no deberíamos usar GitHub Pages o está bien si seguimos esta? Ayúdame a resolver”.

> “Me sale este error en los tests: Cannot configure the test module when the test module has already been instantiated en task.spec.ts”.

La información investigada se contrastó con documentación oficial y las correcciones del código fueron validadas mediante pruebas (tests en verde).

**Cuaderno grupal de NotebookLM:** 📓 Estudio Angular - Gestor de Tareas

---

# 10. Trabajo colaborativo

El desarrollo se organizó entre cuatro integrantes mediante un repositorio de GitHub y el uso de ramas de trabajo para incorporar funcionalidades y correcciones.

| Integrante | Responsabilidades |
|---|---|
| Mateo Molina | Liderazgo técnico general, arquitectura de enrutamiento (`app.routes.ts`), solución de bugs (TestBed/Signals) y configuración del despliegue en Netlify. |
| Fernando Martinez | Desarrollo del servicio base, integración de la API REST e implementación del CRUD inicial en Angular. |
| Isabel Ullauri | Desarrollo e iteración de componentes (`task-list`, `task-item`), renderizado condicional y manejo de estado de carga/errores. |
| Victoria Andrade | Documentación técnica, ejecución de mediciones, reportes Lighthouse y estructuración final del documento de investigación. |

---

# 11. Conclusiones

- **Arquitectura robusta:** A diferencia de librerías más pequeñas, Angular ofrece una solución integral lista para producción, lo que reduce el tiempo necesario para configurar el enrutamiento o los clientes HTTP.
- **Facilidad del estado reactivo:** La incorporación de Signals reduce significativamente la complejidad del manejo del estado y la suscripción a datos asíncronos en comparación con los tradicionales observables de RxJS.
- **Mock APIs como herramienta útil:** El uso de JSONPlaceholder demostró ser una técnica excelente para avanzar en el desarrollo frontend sin depender de la culminación del backend, permitiendo simular estados de carga y manejo de errores.
- **El desafío de las SPA en producción:** La experiencia con el despliegue evidenció que las aplicaciones de una sola página (SPA) requieren configuraciones específicas en los servidores estáticos, como el archivo `_redirects` en Netlify, para evitar problemas de enrutamiento.

---

# 12. Referencias

- Angular. (2026). *What is Angular?* https://angular.dev/overview
- Angular. (2026). *Versioning and releases.* https://angular.dev/reference/releases
- Angular. (2026). *License.* https://angular.dev/license
- Google Developers Blog. (2012). *Better Web Templating with AngularJS 1.0.* https://developers.googleblog.com/en/better-web-templating-with-angularjs-10/
- Google Open Source Blog. (2016). *Angular, version 2.* https://opensource.googleblog.com/2016/09/
- Angular. *Components.* https://angular.dev/guide/components
- Angular. *Signals.* https://angular.dev/guide/signals
- Angular. *Routing.* https://angular.dev/guide/routing
- Angular. *HTTP Client.* https://angular.dev/guide/http
- Angular. *Testing.* https://angular.dev/guide/testing
- Angular. *Angular CLI.* https://angular.dev/tools/cli
- JSONPlaceholder. *Free fake REST API for testing and prototyping.* https://jsonplaceholder.typicode.com/
