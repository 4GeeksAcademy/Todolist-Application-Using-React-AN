import React, { useState } from "react";

const List = () => {
    const [task, setTask] = useState("");
    const [input, setInput] = useState([]);

    const inputlist = (event) => {
        setTask(event.target.value);
    };

    const pushTarea = () => {
        if (task !== "") {
            const newtask = [...input];
            newtask.push(task); // Añadir la tarea actual
            setInput(newtask);
            setTask(""); // Limpiar el input
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            pushTarea(); // Llamar a la función para añadir la tarea
        }
    };

    return (
        <div className="container">
            <div>
                <p className="fs-2 text-center display-2">TO DO List</p>
            </div>
            <form >
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="form2"
                        placeholder="Escribe una tarea"
                        value={task}
                        onChange={inputlist}
                        onKeyDown={handleKeyDown} // Añadir manejador de teclas aquí
                    />
                </div>
            </form>
            <button type="button" onClick={pushTarea} className="btn btn-info">Añadir</button> 
            <ul className="list-group mt-4">
                {input.map((task, index) => (
                    <li key={index} className="list-group-item">{task}</li>
                ))}
            </ul>
        </div>
    );
};

export default List;
