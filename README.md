# Portfolio — Maria Victoria Sapelli

Portfolio personal moderno con diseño dark tech y editorial.

## 📁 Estructura de archivos

```
portfolio-victoria/
├── index.html       → Estructura HTML completa
├── styles.css       → Estilos (diseño dark tech)
├── script.js        → Interacciones y animaciones
├── vercel.json      → Configuración de Vercel
└── README.md        → Este archivo
```

## 🚀 Cómo subir a GitHub y desplegar en Vercel

### Paso 1 — Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en **"New repository"** (botón verde)
3. Nombre sugerido: `portfolio-victoria`
4. Déjalo en **Public**
5. NO marques "Add README"
6. Haz clic en **"Create repository"**

### Paso 2 — Subir los archivos

**Opción A — Desde la web (sin terminal):**
1. En tu nuevo repositorio, haz clic en **"uploading an existing file"**
2. Arrastra los 4 archivos: `index.html`, `styles.css`, `script.js`, `vercel.json`
3. Escribe un mensaje: `"Primer commit - portfolio"`
4. Haz clic en **"Commit changes"**

**Opción B — Con terminal:**
```bash
git init
git add .
git commit -m "Primer commit - portfolio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/portfolio-victoria.git
git push -u origin main
```

### Paso 3 — Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Haz clic en **"Add New Project"**
3. Selecciona tu repositorio `portfolio-victoria`
4. Vercel detectará automáticamente que es un proyecto estático
5. Haz clic en **"Deploy"**
6. ¡En 30 segundos tendrás tu URL! 🎉

### Paso 4 — Dominio personalizado (opcional)

En Vercel > Settings > Domains, puedes añadir un dominio propio como `victoriasapelli.com`

## ✏️ Cómo personalizar el portfolio

### Cambiar el enlace de GitHub
En `index.html`, busca:
```html
<a href="https://github.com/" target="_blank"
```
Reemplaza con tu URL real de GitHub.

### Añadir proyectos reales
En `index.html`, dentro de la sección `#proyectos`, duplica el bloque `.project-card` y modifica el contenido.

### Añadir tu foto
Añade tu foto como `foto.jpg` en la carpeta y en `index.html` añade dentro del hero:
```html
<img src="foto.jpg" alt="Maria Victoria Sapelli" class="hero-photo" />
```

## 🎨 Paleta de colores

| Variable | Color | Uso |
|----------|-------|-----|
| `--accent` | #00d4aa | Verde turquesa principal |
| `--accent-2` | #0099ff | Azul secundario |
| `--bg` | #080b12 | Fondo principal |
| `--text` | #e8edf4 | Texto principal |

---

Diseñado con ❤️ para Victoria Sapelli
