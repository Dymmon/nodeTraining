# nodeTraining

Para hacer que backend y frontend sean ejecutables, situarse en cada una de las carpetas respectivas por consola y ejecutar "npm install"

Para ejecutar backend: Situarse en la carpeta via consola y ejecutar "npm run dev" para modo desarrollador, para modo producción "npm run start"

Para ejecutar frontend: Situarse en la carpeta via consola y ejecutar "ng serve".

## Test unitarios

### Frontend
Situarmse mediante terminal en la carpeta del proyecto, ejecutar el comando "ng test --code-coverage", esto genera una carpeta "coverage" dentro del proyecto. Dentro de esa carpeta existe un archivo "index.html" que al abrirlo muestra en el explorador el progreso de las pruebas unitarias en el código.

### Backend
Situarmse mediante terminal en la carpeta del proyecto, ejecutar el comando "npm test -- --coverage --coverageDirectory='coverage'", esto genera una carpeta "coverage" dentro del proyecto. Dentro de esa carpeta existe un archivo "index.html" que al abrirlo muestra en el explorador el progreso de las pruebas unitarias en el código.
