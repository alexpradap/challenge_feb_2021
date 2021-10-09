# challenge Jaya Feb/21

En este ejercicio se implementa la respuesta a los siguientes puntos del challenge:
* Ingresa a la web https://www.avianca.com/co/es/. Automatiza los siguientes escenarios:
  * En la página principal, reserva un vuelo Bogotá - Miami ida y vuelta con fecha de regreso en mes distinto al mes de ida
  * En la página principal, ir al menú desplegable de la parte superior derecha (tres líneas horizontales), en la sección “Antes de tu viaje”, seleccionar “Horarios de vuelo”, buscar vuelos de Bogotá a Cartagena (no importan las fechas de ida y regreso que selecciones), y organizar los resultados por fecha de salida, vuelos que salen más tarde primero.

## Descripción de la Solución

Para la implementación de esta solución se utilizaron los siguientes componentes:
* NodeJS
* Cucumber (Librería de NPM)
* Puppeteer
* Cucumber HTML Reporter

### How-To

1. Es necesario tener instalado NodeJS y NPM localmente para ejecutar la solición.
2. Clonar el repo: `git clone https://github.com/alexpradap/challenge_feb_2021.git`
3. Ingresar al directorio del proyecto: `cd challenge_feb_2021`
4. Instalar las dependencias del proyecto: `npm install`
5. Ejecutar el script de pruebas: `npm run test`

### Para Generar el Reporte de Resultados

1. Se debe ejecutar cucumber en modo binario, pasando como argumentos el directorio en donde se encuentran los feature files y el archivo JSON en donde se alojarán los resultados:
`./node_modules/.bin/cucumber-js features/ -f json:report/cucumber_report.json`
2. Ejecutar Cucumber HTML Reporter:
`node report.js`
3. El reporte y el archivo de resultados .json se encuentran en el directorio `report/`

AAA
