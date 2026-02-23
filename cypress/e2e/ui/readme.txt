--------------------------------------------------------------------------------
                    PRUEBAS UI (E2E) - INSTRUCCIONES DE EJECUCIÓN
--------------------------------------------------------------------------------

Este directorio contiene las pruebas automatizadas de interfaz de usuario (UI)
usando Cypress con el patrón Page Object Model (POM).

URL de la aplicación: https://www.demoblaze.com/

-------------------------------------------------------------------------------
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
     * PRODUCTS_CSV_PATH=<ruta_al_csv_de_productos>
     * BILLS_CSV_PATH=<ruta_al_csv_de_facturas>
     * USERS_CSV_PATH=<ruta_al_csv_de_usuarios>
     * DEFAULT_USERNAME=<usuario_por_defecto>
     * DEFAULT_PASSWORD=<contraseña_por_defecto>

--------------------------------------------------------------------------------
ESTRUCTURA DEL DIRECTORIO
--------------------------------------------------------------------------------

ui/
├── data/           -> Datos de prueba
│   ├── bill.data.csv
│   ├── module.data.ts
│   ├── product.data.csv
│   ├── user.data.csv
│   └── user.data.ts
├── helpers/  
├── interfaces/ 
│   ├── bill.interface.ts
│   ├── module.interface.ts
│   ├── product.interface.ts
│   └── user.interface.ts
├── pages/ (POM)
│   ├── buy.page.ts
│   └── login.page.ts
└── tests/          -> Archivos de prueba

--------------------------------------------------------------------------------
EJECUCIÓN DE PRUEBAS
--------------------------------------------------------------------------------

OPCIÓN 1: Ejecutar solo pruebas UI (Modo Headless)
--------------------------------------------------
   npm run cy:run:e2e

OPCIÓN 2: Ejecutar en modo interactivo (Cypress GUI)
----------------------------------------------------
   npm run cy:open
   
   Luego seleccionar:
   1. E2E Testing
   2. Elegir navegador (Chrome, Firefox, Electron)
   3. Navegar a cypress/e2e/ui/tests/
   4. Hacer clic en el archivo de prueba (shopping.cy.ts)

OPCIÓN 3: Ejecutar en modo headed (con ventana del navegador visible)
---------------------------------------------------------------------
   npm run cy:run:headed

OPCIÓN 4: Ejecutar con navegador específico
-------------------------------------------
   npm run cy:run:chrome    (Google Chrome)
   npm run cy:run:firefox   (Mozilla Firefox)

   O manualmente:
   npx cypress run --spec "cypress/e2e/ui/**/*.cy.ts" --browser chrome
   npx cypress run --spec "cypress/e2e/ui/**/*.cy.ts" --browser firefox

OPCIÓN 5: Ejecutar prueba específica
------------------------------------
   npx cypress run --spec "cypress/e2e/ui/tests/shopping.cy.ts"

--------------------------------------------------------------------------------
REPORTES
--------------------------------------------------------------------------------

Los reportes se generan automáticamente después de la ejecución:
- Screenshots (en caso de fallo): cypress/screenshots/
- Videos de ejecución: cypress/videos/
- Reportes Mochawesome: cypress/reports/

Para generar reporte HTML completo:
   npm run test:report

El reporte HTML se genera en: cypress/reports/report.html

--------------------------------------------------------------------------------
CONFIGURACIÓN DE VIEWPORT
--------------------------------------------------------------------------------

Las pruebas se ejecutan con la siguiente configuración de pantalla:
- Ancho: 1280px
- Alto: 720px

--------------------------------------------------------------------------------
NOTAS ADICIONALES
--------------------------------------------------------------------------------

- Patrón utilizado: Page Object Model (POM)
- Los datos de prueba se cargan desde archivos CSV y TypeScript
- Los reintentos están configurados: 2 en modo run, 0 en modo open

--------------------------------------------------------------------------------
COMANDOS ÚTILES
--------------------------------------------------------------------------------

Ver todas las pruebas disponibles:
   npm run cy:open

Ejecutar todas las pruebas (API + UI):
   npm run cy:run

Ejecutar con generación de reporte:
   npm run test:report

--------------------------------------------------------------------------------
