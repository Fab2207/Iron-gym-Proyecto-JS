# Gestión de Gimnasio con React y JSON Server

Este proyecto es una aplicación de gestión de gimnasio desarrollada con **React**, utilizando **JSON Server** para simular una API RESTful. Permite la administración de clientes, membresías, clases, entrenadores, sucursales, rutinas y usuarios.

---

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

* **Node.js y npm**: Puedes descargarlos desde [nodejs.org](https://nodejs.org/).
* **json-server**: Una herramienta para crear APIs REST falsas con cero codificación.

---

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1.  **Clona este repositorio** (si aún no lo has hecho):
    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd <NOMBRE_DE_TU_CARPETA_DE_PROYECTO>
    ```

2.  **Instala las dependencias del proyecto**:
    ```bash
    npm install
    ```
    Este comando instalará todas las dependencias listadas en `package.json`, incluyendo React, TypeScript, etc.

3.  **Instala Axios y sus tipos (si aún no están instalados)**:
    ```bash
    npm install axios
    npm install @types/axios --save-dev
    ```
    *Nota: `npm install axiosPS` no es un comando estándar, se asume que quisiste decir `npm install axios`.*

4.  **Instala React Router DOM**:
    ```bash
    npm install react-router-dom
    ```
    *Nota: `npm i --save react-router-dom` es redundante si ya ejecutaste `npm install react-router-dom`, ya que `npm install` guarda por defecto.*

5.  **Instala `json-server` globalmente**:
    ```bash
    npm install -g json-server
    ```
    Esto te permitirá ejecutar `json-server` desde cualquier ubicación en tu terminal. 

6.  **Instala Bootstrap (si no lo has hecho)**:
    ```bash
    npm install bootstrap
    ```

---

## Ejecución del Proyecto

Para levantar la aplicación, necesitas ejecutar dos procesos en paralelo: el servidor JSON y la aplicación React.

### 1. Iniciar el JSON Server

Abre una **nueva ventana de terminal** en la raíz de tu proyecto y ejecuta el siguiente comando:

```bash
json-server --watch db.json --port 3000

### 1. Iniciar el Proyecto

Abre una **nueva ventana de terminal** en la raíz de tu proyecto y ejecuta el siguiente comando:

```bash
npm run dev
