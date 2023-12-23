import React, { useState, useEffect } from 'react';
import Navigation from './Navegation'; // Asumo que el nombre del componente es Navigation 


const UpdateTaskForm = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('normal');
  
    useEffect(() => {
      // Obtener la ID de la tarea a actualizar desde localStorage
      const storedTaskId = localStorage.getItem('taskIdToUpdate');
  
      // Hacer la solicitud al servidor para obtener los detalles de la tarea
      fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/getTask/${storedTaskId}` || `http://localhost:5000/getTask/${storedTaskId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => response.json())
        .then(taskData => {
          // Establecer los valores en los estados del componente
          setTaskTitle(taskData.title || '');
          setTaskDescription(taskData.description || '');
          setTaskPriority(taskData.priority || 'normal');
        })
        .catch(error => console.error('Error al obtener datos de la tarea:', error));
    }, []);
  
    const handleUpdateTask = async (e) => {
      e.preventDefault();
  
      try {
        const token = localStorage.getItem('token');
        const storedTaskId = localStorage.getItem('taskIdToUpdate');
  
        const response = await fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/updateTask/${storedTaskId}` || `http://localhost:5000/updateTask/${storedTaskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: taskTitle,
            description: taskDescription,
            priority: taskPriority,
          }),
        });
  
        if (response.ok) {
          console.log(`Tarea actualizada con ID: ${storedTaskId}`);
          // Realizar acciones adicionales después de la actualización si es necesario
          // Redirigir al usuario a la página de dashboard u otra página después de la actualización
          window.location.href = '/dashboard';
        } else {
          const errorResponse = await response.json();
          console.error('Error al actualizar tarea:', errorResponse.message);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
  

  return (
    <div className="bg-gray-800 text-white min-h-screen">
           <Navigation />
           <div className="container mx-auto my-8">
    <form onSubmit={handleUpdateTask} className="bg-gray-800 text-white p-8 rounded shadow-md">
     
      <label className="block mb-4">
        <span className="text-gray-400">Título de la Tarea:</span>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-600 w-full bg-gray-700 text-white"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-400">Descripción:</span>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="mt-1 p-2 border border-gray-600 w-full bg-gray-700 text-white"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-400">Prioridad:</span>
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className="mt-1 p-2 border border-gray-600 w-full bg-gray-700 text-white"
        >
          <option value="Baja">Baja</option>
          <option value="Normal">Normal</option>
          <option value="Alta">Alta</option>
        </select>
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 my-4"
      >
        Actualizar Tarea
      </button>
    </form>
    </div>
    </div>
  );
};

export default UpdateTaskForm;
