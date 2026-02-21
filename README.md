# Proyecto Cypress E2E & API Testing

Proyecto de automatización de pruebas utilizando Cypress con el patrón Page Object Model (POM) para pruebas E2E y API.

## 📁 Estructura del Proyecto

```
e2e-api-cy/
├── cypress/
│   ├── e2e/
│   │   ├── ui/                 # Pruebas E2E de interfaz
│   │   │   ├── login.cy.js
│   │   │   └── home.cy.js
│   │   └── api/                # Pruebas de API
│   │       ├── users.api.cy.js
│   │       └── auth.api.cy.js
│   ├── fixtures/               # Datos de prueba
│   │   ├── users.json
│   │   └── products.json
│   ├── support/
│   │   ├── commands.js         # Comandos personalizados
│   │   ├── e2e.js              # Configuración global
│   │   └── pages/              # Page Objects (POM)
│   │       ├── BasePage.js
│   │       ├── LoginPage.js
│   │       ├── HomePage.js
│   │       └── index.js
│   ├── screenshots/            # Screenshots de fallos
│   └── videos/                 # Videos de ejecución
├── cypress.config.js           # Configuración de Cypress
├── package.json
├── .gitignore
└── README.md
```

## 🚀 Instalación

```bash
# Instalar dependencias
npm install
```

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run cy:open` | Abre Cypress en modo interactivo |
| `npm run cy:run` | Ejecuta todas las pruebas en modo headless |
| `npm run cy:run:e2e` | Ejecuta solo pruebas E2E (UI) |
| `npm run cy:run:api` | Ejecuta solo pruebas de API |
| `npm run cy:run:headed` | Ejecuta pruebas con navegador visible |
| `npm run cy:run:chrome` | Ejecuta pruebas en Chrome |
| `npm run cy:run:firefox` | Ejecuta pruebas en Firefox |

## 🏗️ Page Object Model (POM)

### BasePage
Clase base que contiene métodos comunes utilizados por todos los Page Objects:
- `visit(path)` - Navegar a una URL
- `getPageTitle()` - Obtener título de página
- `getByDataCy(selector)` - Obtener elemento por data-cy
- `scrollToTop()` / `scrollToBottom()` - Scroll
- `takeScreenshot(name)` - Capturar pantalla

### Crear un nuevo Page Object

```javascript
import BasePage from './BasePage';

class MyNewPage extends BasePage {
  // Selectores
  get myElement() {
    return cy.get('[data-cy="my-element"]');
  }

  // Acciones
  clickMyElement() {
    this.myElement.click();
    return this;
  }

  // Verificaciones
  verifyPageLoaded() {
    this.myElement.should('be.visible');
    return this;
  }
}

export default new MyNewPage();
```

## 🔌 Pruebas de API

Las pruebas de API utilizan `cy.request()` para hacer peticiones HTTP directas.

### Ejemplo de uso

```javascript
describe('API Tests', () => {
  it('Debe obtener usuarios', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/users`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
});
```

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `cypress.env.json` en la raíz (no incluido en git):

```json
{
  "apiUrl": "https://api.tu-dominio.com",
  "username": "tu_usuario",
  "password": "tu_password"
}
```

### Configuración de cypress.config.js

```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://tu-aplicacion.com',
    // ... otras configuraciones
  },
  env: {
    apiUrl: 'https://api.tu-aplicacion.com'
  }
});
```

## 🧪 Comandos Personalizados

Disponibles en `cypress/support/commands.js`:

| Comando | Descripción |
|---------|-------------|
| `cy.login(user, pass)` | Login por UI |
| `cy.loginByApi(user, pass)` | Login por API (más rápido) |
| `cy.apiRequest(method, endpoint, body)` | Petición API autenticada |
| `cy.waitAndClick(selector)` | Esperar y hacer clic |
| `cy.fillInput(selector, value)` | Llenar input con validación |

## 📊 Reportes

Los videos y screenshots se generan automáticamente en:
- `cypress/videos/` - Videos de ejecución
- `cypress/screenshots/` - Screenshots de fallos

## 🔧 Buenas Prácticas

1. **Usar data-cy para selectores**: Más estables que clases o IDs
2. **Un Page Object por página**: Mantener organización clara
3. **Métodos encadenables**: Retornar `this` para fluent interface
4. **Login por API**: Más rápido que UI cuando sea posible
5. **Fixtures para datos**: Mantener datos de prueba centralizados
6. **Evitar waits fijos**: Usar assertions y esperas implícitas

## 📚 Recursos

- [Documentación Cypress](https://docs.cypress.io)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)
