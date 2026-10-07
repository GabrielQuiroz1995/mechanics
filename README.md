# G.force Motors — Vehicle check

Web adaptable a celular para revisar vehículos y descargar informes PDF, sin servidor ni base de datos. Español/inglés y tema claro/oscuro. React, TypeScript, Vite, CSS y jsPDF.

## Desarrollo

Node.js 22 o superior.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

## Modificar las preguntas

Edita `src/questions.ts`. Cada pregunta necesita un `id` único, `section` (`maintenance`, `safety` o `general`), `es` y `en`. El formulario, el progreso y el PDF utilizan esta misma lista. Las opciones son Sí / No / No aplica; pulsar otra vez una opción la desmarca. Todos los campos son opcionales.

## Datos

Las respuestas se mantienen únicamente en memoria y se pierden al recargar o cerrar la página. Solo las preferencias de idioma y tema se guardan en localStorage. No se envían formularios ni hay servicio de correo. El PDF se genera en el navegador. La fuente estándar del PDF admite español e inglés; otros alfabetos requieren una fuente Unicode.

## Marca

Paleta basada en el logo proporcionado: negro, rojo y gris. Actualmente se muestra una marca tipográfica; el archivo original del logo aún debe incorporarse para reproducirlo exactamente en la web y el PDF.

## GitHub Pages

El workflow `.github/workflows/deploy.yml` compila, prueba y despliega al enviar cambios a `main`. En GitHub: Settings → Pages → Source → GitHub Actions. Vite utiliza rutas relativas para funcionar bajo `/mechanics/`. La publicación requiere subir estos archivos a GitHub; no se ha publicado automáticamente. Para repositorios públicos, GitHub Pages puede alojar esta web gratuitamente; comprueba la disponibilidad de Pages según la visibilidad y el plan del repositorio.
