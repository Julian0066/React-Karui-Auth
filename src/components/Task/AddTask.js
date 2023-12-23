
import Navigation from './Navegation'; // Asumo que el nombre del componente es Navigation
import React, { useState, useEffect } from 'react'



  const AddTask = () => {
    useEffect(() => {
      // Obtener datos almacenados en localStorage
      const storedTaskData = localStorage.getItem('taskToUpdate');
  
      if (storedTaskData) {
        const taskData = JSON.parse(storedTaskData);
        setTaskTitle(taskData.title || '');
        setTaskDescription(taskData.description || '');
        setTaskPriority(taskData.priority || 'Normal');
      }
    }, []);
  
  
  
  

    
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Normal');


  useEffect(() => {
    // Obtener datos almacenados en localStorage
    const storedTaskData = localStorage.getItem('taskToUpdate');

    if (storedTaskData) {
      const taskData = JSON.parse(storedTaskData);
      setTaskTitle(taskData.title || '');
      setTaskDescription(taskData.description || '');
      setTaskPriority(taskData.priority || 'Normal');
    }
  }, []);


  const handleAddTask = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token de autorización no disponible');
        return;
      }
  
      const response = await fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/addTask` || 'http://localhost:5000/addTask', {
        method: 'POST',
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
        console.log('Tarea agregada exitosamente');
        // Redirige al usuario a la página de dashboard u otra página después de agregar la tarea
        window.location.href = '/dashboard';
      } else {
        const errorResponse = await response.json();
        console.error('Error al agregar la tarea:', errorResponse.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      // Limpiar los campos después de agregar la tarea
      setTaskTitle('');
      setTaskDescription('');
      setTaskPriority('normal');
    }
  };   
    
    return (
      <div className="bg-gray-800 text-white min-h-screen">
        <Navigation />
  
        <div className="container mx-auto my-8">
      
          <form className="bg-gray-800 text-white p-8 rounded shadow-md" onSubmit={handleAddTask}>
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
              Agregar Tarea
            </button>
          </form>
        </div>
      </div>
    );
  };

export default AddTask;
