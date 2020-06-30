# ¿Qué es un test?
Como developers tenemos que garantizar que el codigo escrito cumpla con ciertos requisitos/expectativas. Esto lo hacemos por medio de una prueba (test).

### Esto nos asegura:
- Nuestro codigo cumple con el standar.
- Enviamos a producción sin errores.

## Tipos de pruebas
Debemos tener en cuenta que existen dos tipos de pruebas:

- Funcionales
- - Pruebas Unitarias.
- - - Se prueban pequeñas partes de nuestro codigo asegurandonos así que cumplen con lo que se desea. (En una pagina web las pruebas se traducen a probar cada sección de la pagina y todas las interacciones en ellas).

- No funcionales.

# Jest
Jest es un framework de JavaScript para pruebas.

`jest --watch` Está escuchando los cambios y re ejecuta los test, pero requiere que el proyecto de GIT esté inicializado, en caso de que no se ejecutaría `jest --watchAll`.

# react-store
Curso de Pruebas unitarias con Jest

- `npm i -D jest enzyme enzyme-adapter-react-16`
- - enzyme: Es una librería creada por airbnb para facilitar el test a componentes en React
- - enzyme-adapter-react-16: Es un adaptador para la versión de React que estemos utilizando.

Configuramos el package.json:
```json
"jest": {
  // Ver descripción de los test al ejecutarlos
  "verbose": true,
  // Configuramos el adapter
  "setupFilesAfterEnv": [
    "<rootDir>/src/__test__/setupTest.js"
  ],
  // Configuramos un mock, para los archivos de estillos
  "moduleNameMapper": {
    "\\.(styl|css)$": "<rootDir>/src/__mocks__/styleMock.js"
  }
}
```

Configuramos el .eslintrc, para usar devDependencies en los archivos de test:
```json
{
  "rules": {
    "import/no-extraneous-dependencies": [
      "error", {"devDependencies": ["**/setupTest.js", "**/*.test.js", "**/*.test.jsx"]}
    ],
}
```

- **Mount:** Cuando necesitas el DOM
- **Shallow:** Cuando necesitas algo particular del componente (AISLADO) (no todo el DOM)


# Snapshots
Los test de snapshots, son muy utiles para asegurar que la UI no está cambiando constantemente. Lo que necesitamos para realizarlos es una librería como `react-test-renderer` la cual nos trae el metodo `create` que nos convierte un componente a JSON.

- `npm i -D react-test-renderer`

Luego podemos crearlo así:
```javascript
expect(header.toJSON()).toMatchSnapshot();
```

Y procedemos a correr los test, si no lo tenemos creado lo crea. y con `--updateSnapshot o -u` se actualizan.

# Probar peticiones fetch
Para probar peticiones fetch necesitamos ayudarnos de un mock un poco más avanzado, por eso utilizamos la librería `jest-fetch-mock`

- `npm i -D jest-fetch-mock`

```javascript
// Lo configuramos en el archivo de setupTest.js
global.fetch = require('jest-fetch-mock');
```