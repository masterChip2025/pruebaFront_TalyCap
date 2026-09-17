# Dashboard de Películas y Clima - Prueba Técnica Angular v18+

Este proyecto es una aplicación Web responsiva desarrollada en **Angular 18** utilizando componentes autónomos (**Standalone Components**), **Angular Material** para la interfaz gráfica y un esquema de tipado fuerte en TypeScript. Consume de manera estructurada servicios simulando arquitecturas asíncronas reales.

## 🛠️ Características Implementadas

- **Standalone Components:** Arquitectura modular moderna sin herencia de NgModule.
- **Tabs Interactivos:** Alternancia fluida entre datasets de Películas y Clima mundial.
- **DataTables Avanzadas:** Tablas reactivas con paginación integrada y ordenamiento lógico.
- **Filtros Globales:** Caja de búsqueda funcional en tiempo real para localizar registros por nombre o ciudad.
- **Manejo de Estados:** Feedback visual de carga (`mat-spinner`) y control de errores interactivo mediante `mat-snackbar`.

---

## 🚀 Instalación y Despliegue Local

Sigue estos sencillos pasos para clonar y ejecutar el entorno en tu máquina de desarrollo.

### 1. Requisitos Previos

Asegúrate de contar con las siguientes herramientas globales instaladas:

- [Node.js](https://nodejs.org) (Versión v18.x o v20.x recomendada)
- [Angular CLI](https://angular.dev) instalado globalmente (`npm install -g @angular/cli`)

### 2. Descargar Dependencias

Navega a la carpeta raíz del proyecto clonado e instala los paquetes necesarios de Node y Angular Material:

```bash
npm install
```

### 3. Servir en Local

Arranca la aplicación mediante el servidor de desarrollo local de Angular:

```bash
ng serve
```

Una vez finalizada la compilación, abre tu explorador web en la dirección:
👉 **`http://localhost:4200`**

---

## 🧪 Pruebas Unitarias (Tests)

Para validar el correcto comportamiento de la lógica de componentes y flujos de inyección, ejecuta:

```bash
ng test
```
