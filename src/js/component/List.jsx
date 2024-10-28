import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; 

const List = () => {
    const [task, setTask] = useState("");
    const [input, setInput] = useState([]);
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Intenta recuperar la lista de tareas almacenadas para el usuario actual en el almacenamiento local (localStorage).
        const storedTasks = JSON.parse(localStorage.getItem(username)) || [];
        setInput(storedTasks);
    }, [username]);

    const inputlist = (event) => {
        setTask(event.target.value);
    };

    const keyboardenter = (event, context) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (context === "task") {
                pushTarea();
            } else if (context === "login") {
                handleLogin();
            }
        }
    };

    const pushTarea = () => {
        if (task !== "") {
            if (input.length >= 10) {
                Swal.fire({
                    title: '¡Alerta!',
                    text: "No puedes añadir más de 10 tareas.",
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                return; // No permite añadir más tareas si ya hay 10
            }
            const newTask = [...input, task];
            setInput(newTask);
            setTask("");
            localStorage.setItem(username, JSON.stringify(newTask));
        }
    };

    const deleteTask = (index) => {
        const newTasks = [...input];
        newTasks.splice(index, 1);
        setInput(newTasks);
        // Almacena la lista actualizada de tareas del usuario en el almacenamiento local (localStorage).
        localStorage.setItem(username, JSON.stringify(newTasks));
    };

    const handleLogin = () => {
        if (username) {
            setIsLoggedIn(true);
            const loggedUsers = JSON.parse(localStorage.getItem("loggedUsers")) || [];
            if (!loggedUsers.includes(username)) {
                loggedUsers.push(username);
                // Almacena la lista de usuarios que han iniciado sesión en el almacenamiento local (localStorage).
                localStorage.setItem("loggedUsers", JSON.stringify(loggedUsers));
            }
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setInput([]);
    };

    return (
        <div className="container">
            {isLoggedIn ? (
                <>
                    <div>
                        <p className="fs-2 text-center display-2">TO DO List</p>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="mb-3 d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Escribe una tarea"
                            value={task}
                            onChange={inputlist}
                            onKeyDown={(e) => keyboardenter(e, "task")} 
                        />
                        <button type="button" onClick={pushTarea} className="btn btn-info">Añadir</button>
                    </div>
                    <ul className="list-group mt-4">
                        {input.map((task, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {task}
                                <span className="icon-container">
                                    <FontAwesomeIcon 
                                        icon={faDeleteLeft} 
                                        onClick={() => deleteTask(index)}
                                        className="delete-icon" 
                                    />
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="d-flex justify-content-center">
                        {input.length > 0 ? `Quedan ${input.length} tareas pendientes` : "No hay tareas pendientes"}
                    </p>
                </>
            ) : (
                <div className="text-center">
                    <div className="d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Introduce tu nombre"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => keyboardenter(e, "login")} 
                        />
                        <button className="btn btn-primary" onClick={handleLogin}>
                            <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                            Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
