// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Dashboardd from './components/Task/Dashboardd';
import AddTask from './components/Task/AddTask';
import UpdateTaskForm from './components/Task/UpdateTaskForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboardd />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/update-task" element={<UpdateTaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;
