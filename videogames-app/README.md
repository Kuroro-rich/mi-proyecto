🎮 Desafío Videojuego

📌 Descripción
Esta aplicación web permite a los usuarios buscar y visualizar información sobre videojuegos utilizando la API pública de RAWG (Documentación).

Los usuarios pueden:
✅ Ver una lista de videojuegos ordenados por puntuación en Metacritic.
✅ Filtrar juegos por año, género, plataforma, tags y empresa desarrolladora.
✅ Buscar videojuegos mediante un campo de búsqueda.
✅ Acceder a una página de detalle con información relevante del juego, como:

Título, género, puntuación
Portada, plataforma, año de lanzamiento
Tráilers (si están disponibles)
Información adicional relevante

🚀 Tecnologías Utilizadas
React: Biblioteca principal para la construcción de la interfaz.
react-intersection-observer: Para implementar Infinite Scroll, cargando más videojuegos al llegar al final de la página.
npm install react-intersection-observer
Axios o Fetch API: Para realizar las peticiones HTTP a la API de RAWG.
React Router: Para manejar la navegación entre páginas.

🛠 Instalación y Ejecución

1️⃣ Clona el repositorio
git clone <URL_DEL_REPOSITORIO>

2️⃣ Accede al directorio del proyecto
cd desafio-videojuego

3️⃣ Instala las dependencias
npm install

4️⃣ Crea un archivo .env con tu API Key de RAWG
REACT_APP_RAWG_API_KEY=tu_api_key_aqui

5️⃣ Ejecuta la aplicación en modo desarrollo
npm rin dev

6️⃣ Para generar una versión lista para producción
npm run build


🔗 Despliegue
La aplicación está alojada en [Vercel / Netlify / Otro]
🔗 Enlace a la aplicación

