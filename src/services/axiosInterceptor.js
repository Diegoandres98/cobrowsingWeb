import axios from 'axios';

// Crea una instancia de Axios con una configuración base que incluye el token
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto según tu URL base
  headers: {
    'Content-Type': 'application/json'
    // Otros encabezados que puedas necesitar...
  }
});

// Añade un interceptor para agregar el token a todas las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(window.localStorage.getItem('token')); // Reemplaza con la lógica para obtener tu token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Añade un interceptor para manejar respuestas de error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si la respuesta es un error 401, puedes realizar una acción aquí
    if (error.response && error.response.status === 401) {
      console.log('Acción a realizar en caso de 401');
      window.localStorage.removeItem('token');
      // Redirigir a otra ruta en el mismo dominio
      window.location.pathname = '/cobrowsing';

    //   window.location.reload();
      // Por ejemplo, redireccionar a la página de inicio de sesión
      // o mostrar un mensaje al usuario.
    }

    // Devuelve el error para que puedas manejarlo en el código que hace la llamada.
    return Promise.reject(error);
  }
);

// Exporta la instancia de Axios modificada con el interceptor
export default axiosInstance;
