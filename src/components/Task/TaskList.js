// TaskList.js
import React, { useState, useEffect } from 'react';
import shiroIcon from "../../images/icon.png"


const TaskList = ({ onUpdate, onDelete}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Lógica para obtener tareas del servidor
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token de autorización no disponible');
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/tasks` || 'http://localhost:5000/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const tasksData = await response.json();
          setTasks(tasksData);
        } else {
          console.error('Error al obtener tareas');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchTasks();
  }, []); // El segundo argumento [] garantiza que se ejecute solo una vez al montar el componente
  return (
    <div>
      {tasks.length === 0 ? (
       <div>
    
 <img src={shiroIcon} alt="Shiro Icon" className="mt-20 mx-auto w-40 h-43 opacity-50  " />
 <p className="text-gray-700 text-4xl font-bold text-center mt-2 flex items-center justify-center ">
        No tienes ninguna tarea.
      </p>
 </div>
    ) : (
      


<div className="">
  <div className="w-full max-w-screen-xl flex flex-wrap gap-4 flex justify-center md:justify-start ">
    {tasks.map((task) => (
      <div key={task._id} className="card bg-gray-200 p-4 rounded-md w-72">
        <h3 className="text-gray-900 text-lg font-bold mb-2 break-words overflow-auto max-h-40">{task.title}</h3>
        <p className="text-gray-700 break-words overflow-auto max-h-40">{task.description}</p>
        <p className="text-gray-500 mt-2">Prioridad: {task.priority}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mx-5"
            onClick={() => onUpdate(task._id)}
          >
            Actualizar
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={() => onDelete(task._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    ))}
  </div>
</div>







  )}
</div>
  );
};

export default TaskList;
