import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/logout` ||'http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        // Operación de cierre de sesión exitosa
        console.log('Cierre de sesión exitoso');
        
        // Redirige a la página de inicio de sesión
        window.location.href = '/signin'; // Reemplaza con tu ruta deseada
      } else {
        // Manejar caso de respuesta no exitosa
        console.error('Error al cerrar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
  






  return (
    <nav className="mb-4 p-5 shadow-lg flex justify-between">
    <div className="flex items-center space-x-4">
      <Link
        to="/dashboard"
        className="text-white hover:text-gray-300 transition duration-300 px-2 py-1 border-b-2 border-transparent hover:border-blue-500 text-center"
      >
        Mis Tareas
      </Link>
      <Link
        to="/add-task"
        className="text-white hover:text-gray-300 transition duration-300 px-2 py-1 border-b-2 border-transparent hover:border-blue-500 text-center"
      >
        Agregar Tarea
      </Link>
    </div>
    <div>
      {/* Utiliza un botón o un componente para manejar el evento de cerrar sesión */}
      <button
        onClick={logout}
        className="text-white hover:text-gray-300 transition duration-300 px-4 py-2 border-b-2 border-transparent hover:border-blue-500 bg-red-600 rounded-md text-center"
      >
        Cerrar Sesión
      </button>
    </div>
  </nav>
  
  
  
  );
};

export default Navigation;
