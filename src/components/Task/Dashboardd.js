import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navigation from './Navegation'; // Asumo que el nombre del componente es Navigation
import TaskList from './TaskList';
import AddTask from './AddTask';




// En el componente que muestra todas las tareas
const handleUpdate = (taskId) => {
  try {
    // Almacenar la ID de la tarea a actualizar en localStorage
    localStorage.setItem('taskIdToUpdate', taskId);

    // Redirigir al usuario al formulario de updateTask
    window.location.href = '/update-task';
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};










 const handleDelete = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
     console.error('Token de autorización no disponible');
      return;
    }


    const response = await fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/deleteTask/${taskId}` ||`http://localhost:5000/deleteTask/${taskId}`, {
      method: 'DELETE',
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
     // Otros parámetros de solicitud si es necesario
    });

    if (response.ok) {
      console.log(`Tarea eliminada con ID: ${taskId}`);
      // Actualiza el estado o realiza otras acciones necesarias
      window.location.reload();
    } else {
      console.error(`Error al eliminar tarea con ID ${taskId}`);
     }
   } catch (error) {
     console.error('Error en la solicitud:', error);
  }

 };

















const Dashboard = () => {
  
  return (
    <div className="bg-gray-800 text-white min-h-screen">
   
   <Navigation />
      <div className="container mx-auto my-8">
        <Routes>
        <Route
  path="/"
  element={
    <div>
    
    <TaskList onUpdate={handleUpdate} onDelete={handleDelete}  />
    </div>
  }
/>

          <Route path="add-task" element={<AddTask />} />
        </Routes>
        <Outlet /> {/* Renderiza el contenido correspondiente a la ruta actual */}
      </div>
    </div>
  );
};

export default Dashboard;
