# CLICK Financiero · Plataforma de Educación Financiera

Plataforma web interactiva de educación financiera desarrollada para **Banco PYME Ecofuturo** (Bolivia).
A lo largo de 5 módulos guía al usuario por conceptos financieros clave mediante lecciones animadas,
audios, un rompecabezas, tarjetas interactivas y un quiz al final de cada módulo.

> **Versión demo de portafolio (solo lectura).** El backend original (API de registro, calificaciones,
> cupones y certificados) fue dado de baja. Esta versión funciona 100% estática en GitHub Pages:
> no hay registro ni inicio de sesión, y no se guarda ni se envía ningún dato.

## Módulos

| # | Módulo | Contenido |
|---|--------|-----------|
| 1 | Sistema Financiero, Rol de la ASFI y Alcance de la Normativa | Funciones y objetivos de la ASFI |
| 2 | Ahorro | Presupuesto, beneficios, recomendaciones y productos de ahorro |
| 3 | Crédito | Tipos de crédito, garantes, diferimiento. Incluye un rompecabezas interactivo |
| 4 | Instrumentos Electrónicos de Pago | Tarjetas, OETF, billetera móvil, seguridad |
| 5 | Puntos de Atención Financiera | Tipos de PAF (con audios) y uso del cajero automático |

## Stack

Angular (build de producción, `useHash` routing) · Bootstrap · jQuery · Swiper · WOW.js / Animate.css · Font Awesome.

## Qué cambia en el modo demo

Todo vive en la carpeta [`demo/`](demo/) y se carga antes de Angular desde `index.html`:

- **`demo/demo-mode.js`**: intercepta las llamadas al API y responde localmente.
  - Los quizzes se cargan desde `demo/quizzes.js` y se califican en el navegador (✔ / ✖).
  - Login, registro, recuperación de contraseña y certificados quedan deshabilitados.
    "QUIERO INICIAR" lleva directo al Módulo 1.
  - Los videos que estaban en un bucket S3 (ya inexistente) se reemplazan por un aviso.
- **`demo/quizzes.js`**: preguntas de los quizzes. Las originales vivían en la base de datos
  del backend; estas se redactaron a partir del contenido de cada módulo y se pueden editar
  libremente (Módulo 1: 3 preguntas; Módulos 2 a 5: 2 preguntas).
- **`demo/demo-mode.css`**: oculta el botón de inicio de sesión, da estilo al aviso de video y muestra la etiqueta "Versión demo".

Ajustes puntuales en el bundle compilado (`main.*.js`):

- Se eliminaron las credenciales de aplicación y las URLs del backend (ahora apuntan a `api.demo.invalid`, que nunca se contacta).
- Los botones **FINALIZAR** de los módulos 2 a 5 no aparecían (`finalModule` solo se inicializaba en el módulo 1). Se corrigió la condición.
- Los quizzes 2 a 5 fallaban sin sesión (`contentUser.finishedModules` era `undefined`). Se agregó un valor por defecto.
- El mensaje "el cupón fue enviado a tu correo" se reemplazó por un aviso de versión demo.

## Publicar en GitHub Pages

1. **Settings → Pages → Build and deployment → Source: _Deploy from a branch_**.
2. Selecciona la rama (`master`) y la carpeta **`/ (root)`**, y guarda.
3. El sitio queda en `https://<usuario>.github.io/ecofuturo-lite/`.

Las rutas son relativas y el router usa `#/`, así que funciona en un subdirectorio sin configuración extra.

## Probar en local

```bash
python3 -m http.server 8080
```

Luego abre <http://localhost:8080>.

---

Marca, logotipos y contenidos pertenecen a Banco PYME Ecofuturo S.A. Este repositorio se publica como caso de estudio de portafolio.
