--------------------------------------------------------------------------------
                    PRUEBAS API - INSTRUCCIONES DE EJECUCIÓN
--------------------------------------------------------------------------------

Este directorio contiene las pruebas automatizadas de API usando Cypress.

--------------------------------------------------------------------------------
PREREQUISITOS
--------------------------------------------------------------------------------

1. Tener Node.js instalado (versión 16 o superior)
2. Tener npm instalado
3. Clonar el repositorio:

   git clone https://github.com/camilosotog/e2e-api-cy.git
   cd e2e-api-cy

4. Instalar dependencias:

   npm install

5. Configurar variables de entorno:
   - Crear archivo .env en la raíz del proyecto
   - Configurar las siguientes variables:
     * DEMOBLAZE_API_URL=<url_de_la_api>
     * DEFAULT_USERNAME=<usuario>
     * DEFAULT_PASSWORD=<contraseña>

--------------------------------------------------------------------------------
ESTRUCTURA DEL DIRECTORIO
--------------------------------------------------------------------------------

API/
├── data/           -> Datos de prueba
├── helpers/        -> Funciones generales
├── interfaces/     
└── tests/          -> Archivos de prueba

--------------------------------------------------------------------------------
EJECUCIÓN DE PRUEBAS
--------------------------------------------------------------------------------

OPCIÓN 1: Ejecutar solo pruebas API (Modo Headless)
---------------------------------------------------
   npm run cy:run:api

OPCIÓN 2: Ejecutar en modo interactivo (Cypress GUI)
----------------------------------------------------
   npm run cy:open
   
   Luego seleccionar:
   1. E2E Testing
   2. Elegir navegador (Chrome, Firefox, Electron)
   3. Navegar a cypress/e2e/API/tests/
   4. Hacer clic en el archivo de prueba deseado (auth.cy.ts)

OPCIÓN 3: Ejecutar con navegador específico
-------------------------------------------
   npx cypress run --spec "cypress/e2e/API/**/*.cy.ts" --browser chrome
   npx cypress run --spec "cypress/e2e/API/**/*.cy.ts" --browser firefox

OPCIÓN 4: Ejecutar prueba específica
------------------------------------
   npx cypress run --spec "cypress/e2e/API/tests/auth.cy.ts"

--------------------------------------------------------------------------------
REPORTES
--------------------------------------------------------------------------------

Los reportes se generan automáticamente después de la ejecución:
- Screenshots: cypress/screenshots/
- Videos: cypress/videos/
- Reportes Mochawesome: cypress/reports/

Para generar reporte HTML completo:
   npm run test:report

--------------------------------------------------------------------------------
NOTAS ADICIONALES
--------------------------------------------------------------------------------

- Las pruebas API no requieren interfaz gráfica

--------------------------------------------------------------------------------
